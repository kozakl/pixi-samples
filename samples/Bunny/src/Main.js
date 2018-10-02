/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Main()
{
    //protected private
    this.stage    = null;
    this.renderer = null;
    this.bunnys   = [];
    this.width = 480;
    this.height = 320;
    
    this.wabbitTexture = null;
    this.pirateTexture = null;
    
    this.bunnys = [];
    this.gravity = 0.75//1.5 ;
    
    this.maxX = this.width;
    this.minX = 0;
    this.maxY = this.height;
    this.minY = 0;
    
    this.startBunnyCount =2// 10;
    this.isAdding = false;
    this.count = 0;
    this.container;
    
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
    Main.scaleAsset = DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 1, 1) :
                                                 MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 1, 1);
    
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
    
    this.amount = (renderer instanceof PIXI.WebGLRenderer) ? 50 : 5;
    this.container = new PIXI.SpriteBatch();
	stage.addChild(this.container);
    
    var loader = new PIXI.AssetLoader([
        "assets/graphics/{0}x/bunny.png".replace("{0}", Main.scaleAsset)
    ], false);
    loader.onComplete = this.onLoadAssets.bind(this);
    loader.load();
    
    window.addEventListener("resize", this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var counter = document.createElement("div");
	document.body.appendChild( counter);
    counter.style.position = "absolute";
    counter.style.top = "50px";
    counter.style.color = "yellowgreen";
    var last = Date.now();
    var self = this;
    (function update()
    {
        requestAnimationFrame(update, null);
        
        if (self.isAdding)
        {
            for (var i = 0; i < self.amount; i++) 
            {
                var bunny = new PIXI.Sprite(self.wabbitTexture);
                bunny.speedX = Math.random() * 10;
                bunny.speedY = (Math.random() * 10) - 5;
                bunny.anchor.y = 1;
                self.bunnys.push(bunny);
                
                self.container.addChild(bunny);
                self.count++;
            }
            
            counter.innerHTML = self.count + " BUNNIES";
	    }
        
        for (i = 0; i < self.bunnys.length; i++) 
        {
            bunny = self.bunnys[i];
            bunny.position.x += bunny.speedX;
            bunny.position.y += bunny.speedY;
            bunny.speedY     += self.gravity;
            
            if (bunny.position.x > self.maxX) {
                bunny.speedX    *= -1;
                bunny.position.x = self.maxX;
            }
            else if (bunny.position.x < self.minX) {
                bunny.speedX    *= -1;
                bunny.position.x = self.minX;
            }
            if (bunny.position.y > self.maxY)
            {
                bunny.speedY *= -0.85;
                bunny.position.y = self.maxY;
                bunny.spin = (Math.random() - 0.5) * 0.2;
                if (Math.random() > 0.5)
                    bunny.speedY -= Math.random() * 6;
            }
            else if (bunny.position.y < self.minY) {
                bunny.speedY = 0;
                bunny.position.y = self.minY;
            }
        }
        
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
        PIXI.Texture.removeTextureFromCache("assets/graphics/{0}x/bunny.png".replace("{0}", Main.scaleAsset)), "bunny");
    PIXI.Texture.fromFrame("bunny").setScale(1 / Main.scaleAsset);
    
    this.wabbitTexture = PIXI.Texture.fromFrame("bunny");
    
    var self = this;
    window.addEventListener("touchstart", function() {
        self.isAdding = true;
    });
    window.addEventListener("touchend", function() {
        self.isAdding = false;
    });
    window.addEventListener("mousedown", function() {
        self.isAdding = true;
    });
    window.addEventListener("mouseup", function() {
        self.isAdding = false;
    });
};

/**
 * @private
 */
Main.prototype.onResize = function()
{
    this.width  = window.innerWidth  * window.devicePixelRatio / Main.scaleView;
    this.height = window.innerHeight * window.devicePixelRatio / Main.scaleView;
    this.maxX = this.width;
    this.minX = 0;
    this.maxY = this.height;
    this.minY = 0;
    
    this.renderer.view.style.width  = window.innerWidth  + "px";
    this.renderer.view.style.height = window.innerHeight + "px";
    this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                         window.innerHeight * window.devicePixelRatio);
    this.renderer.render(this.stage);
    window.scrollTo(0, 0);
};

Main.instance = new Main();
