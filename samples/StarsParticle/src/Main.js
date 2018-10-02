/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Main()
{
    //protected private
    this.stage    = null;
    this.renderer = null;
    this.stars    = null;
    
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
                                                 MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 0.5, 2);
    
    window.onload = this.onLoad.bind(this);
}

Main.prototype.constructor = Main;

/**
 * @private
 */
Main.prototype.onLoad = function()
{
    var stats = new Stats();
    document.body.appendChild(stats.domElement);
    stats.domElement.style.position = "absolute";
    
    var stage = this.stage = new PIXI.Stage(0x333333);
    stage.worldTransform.a = Main.scaleView;
    stage.worldTransform.d = Main.scaleView;
    var renderer = this.renderer = PIXI.autoDetectRenderer();
    document.body.appendChild(renderer.view);
    
    var loader = new PIXI.AssetLoader([
        "assets/graphics/{0}x/star.png".replace("{0}", Main.scaleAsset)
    ], false);
    loader.onComplete = this.onLoadAssets.bind(this);
    loader.load();
    
    var shape = new PIXI.Graphics();
    stage.addChild(shape);
    shape.beginFill(0xFF0000, 1);
    shape.drawRect(0, 0, 250, 250);
    shape.endFill();
    
    window.addEventListener("resize", this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var last = Date.now();
    var self = this;
    (function update()
    {
        requestAnimationFrame(update, null);
        var now = Date.now();
        var delta = now - last;
        var interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        if (self.stars)
            self.stars.update(100, 100,
                              150, 150,
                              200, 200);
        
        stats.update();
        renderer.render(stage);
    })();
};

/**
 * @private
 */
Main.prototype.onLoadAssets = function()
{
    PIXI.Texture.addTextureToCache(
        PIXI.Texture.removeTextureFromCache("assets/graphics/{0}x/star.png".replace("{0}", Main.scaleAsset)), "star");
    PIXI.Texture.fromFrame("star").setScale(1 / Main.scaleAsset);
    
    var stars = this.stars = new StarsEmitter();
    this.stage.addChild(stars);
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

