/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Main()
{
    //protected private
    this.stage     = null;
    this.renderer  = null;
    this.scaleView = null;
    this.stats     = null;
    
    try {
        window.devicePixelRatio = window["devicePixelRatio"] || 1;
    } catch(event) { }
    
    var screenWidth  = Math.max(screen.width, screen.height);
    var screenHeight = Math.min(screen.width, screen.height);
    var innerWidth   = Math.max(window.innerWidth, window.innerHeight);
    var innerHeight  = Math.min(window.innerWidth, window.innerHeight);
    var width  = screenWidth  / window.devicePixelRatio >= innerWidth ?
                 screenWidth  / window.devicePixelRatio : screenWidth;
    var height = screenHeight / window.devicePixelRatio >= innerHeight ?
                 screenHeight / window.devicePixelRatio : screenHeight;
    Main.scaleView  = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                           height * window.devicePixelRatio / 640);
    Main.scaleAsset = DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 0.5, 2) :
                                                 MathUtil.clamp(Math.round(Main.scaleView          * 2) / 2, 0.5, 2);
    
    window.onload = this.onLoad.bind(this);
}

Main.prototype.constructor = Main;

/**
 * @private
 */
Main.prototype.onLoad = function()
{
    var stats = this.stats = new Stats();
    document.body.appendChild(stats.domElement);
    stats.domElement.style.position = "absolute";
    
    var stage = this.stage = new PIXI.Stage(0x000000);
    stage.worldTransform.a = Main.scaleView;
    stage.worldTransform.d = Main.scaleView;
    var renderer = this.renderer = PIXI.autoDetectRenderer();
    document.body.appendChild(renderer.view);
    
    var loader = new PIXI.AssetLoader([
        "assets/graphics/{0}x/particle.png".replace("{0}", MathUtil.clamp(Main.scaleAsset, 1, 2))
    ], false);
    loader.onComplete = this.onLoadAssets.bind(this);
    loader.load();
    
    window.addEventListener("resize", this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
};

/**
 * @private
 */
Main.prototype.onLoadAssets = function()
{
    PIXI.Texture.addTextureToCache(
        PIXI.Texture.removeTextureFromCache("assets/graphics/{0}x/particle.png".replace("{0}",
            MathUtil.clamp(Main.scaleAsset, 1, 2))), "particle");
    PIXI.Texture.fromFrame("particle").setScale(1 / MathUtil.clamp(Main.scaleAsset, 1, 2));
    
    var container = new PIXI.SpriteBatch();
    this.stage.addChild(container);
    
    var particles = [];
    
    var self = this;
    (function update()
    {
        requestAnimationFrame(update, null);
        
        if (particles.length < 2000)
        {
            var particle = new Particle();
            container.addChild(particle);
            particle.gravity = 0.05;
            particle.scale.x = particle.scale.y = MathUtil.rndRange(0.5, 1);
            particle.velocity.x = MathUtil.rndRange(0, 5) * (Math.random() >= 0.5 ? -1 : 1);
            particle.velocity.y = MathUtil.rndRange(0, 5) * (Math.random() >= 0.5 ? -1 : 1);
            particle.position.x = window.innerWidth  * window.devicePixelRatio / Main.scaleView * 0.5;
            particle.position.y = window.innerHeight * window.devicePixelRatio / Main.scaleView * 0.5;
            
            particles.push(particle);
        }
        
        for (var i = particles.length - 1; i >= 0; --i)
        {
            particle = particles[i]; 
            if (particle.position.x < 0 || particle.position.x > window.innerWidth  * window.devicePixelRatio / Main.scaleView ||
                particle.position.y < 0 || particle.position.y > window.innerHeight * window.devicePixelRatio / Main.scaleView)
            {
                particle.scale.x = particle.scale.y = MathUtil.rndRange(0.5, 1);
                particle.velocity.x = MathUtil.rndRange(0, 5) * (Math.random() >= 0.5 ? -1 : 1);
                particle.velocity.y = MathUtil.rndRange(0, 5) * (Math.random() >= 0.5 ? -1 : 1);
                particle.position.x = window.innerWidth  * window.devicePixelRatio / Main.scaleView * 0.5;
                particle.position.y = window.innerHeight * window.devicePixelRatio / Main.scaleView * 0.5;
            }
            particle.update();
        }
        
        self.stats.update();
        self.renderer.render(self.stage);
    })();
};

/**
 * @private
 */
Main.prototype.onResize = function()
{
    this.renderer.view.style.width  = window.innerWidth  + "px";
    this.renderer.view.style.height = window.innerHeight + "px";
    this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                         window.innerHeight * window.devicePixelRatio);
    this.renderer.render(this.stage);
    window.scrollTo(0, 0);
};

Main.instance = new Main();
