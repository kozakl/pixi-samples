/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Main()
{
    //protected private
    this.stage    = null;
    this.renderer = null;
    
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
    
    var loader = new PIXI.AssetLoader([
        "assets/graphics/{0}x/tree.png".replace("{0}", Main.scaleAsset)
    ], false);
    loader.onComplete = this.onLoadAssets.bind(this);
    loader.load();
    
    window.addEventListener("resize", this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var last = Date.now();
    (function update()
    {
        requestAnimationFrame(update, null);
        var now = Date.now();
        var delta = now - last;
        var interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        
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
        PIXI.Texture.removeTextureFromCache("assets/graphics/{0}x/tree.png".replace("{0}", Main.scaleAsset)), "tree");
    PIXI.Texture.fromFrame("tree").setScale(1 / Main.scaleAsset);
    
    var logo = new SkewSprite(PIXI.Texture.fromFrame("tree"));
    this.stage.addChild(logo);
    logo.anchor.x = 0.5;
    logo.anchor.y = 1;
    logo.position.x = 400;
    logo.position.y = 600;
    //logo.scale.x = 0.5;
    //logo.scale.y = 0.5;
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

/**
 * @constructor
 */
function SkewSprite(texture)
{
    PIXI.Sprite.call(this, texture);
    this.n = 0;
    this.b = true;
}

SkewSprite.prototype = Object.create(PIXI.Sprite.prototype);
SkewSprite.prototype.constructor = SkewSprite;

SkewSprite.prototype.updateTransform = function()
{
    
    this.rotationCache = this.rotation;
				this._sr =  Math.sin(this.rotation);
				this._cr =  Math.cos(this.rotation);
    
	var parentTransform = this.parent.worldTransform;//.toArray();
		var worldTransform = this.worldTransform;//.toArray();

		var px = this.pivot.x;
		var py = this.pivot.y;

		var a00 = this._cr * this.scale.x,
			a01 = -this._sr * this.scale.y,//Math.tan(0) * this.scale.y,//-this._sr * this.scale.y,
			a10 = Math.tan(Math.sin(this.n) / 12) * this.scale.x,//this._sr * this.scale.x,
			a11 = this._cr * this.scale.y,
			a02 = this.position.x - a00 * px - py * a01,
			a12 = this.position.y - a11 * py - px * a10,
			b00 = parentTransform.a, b01 = parentTransform.b,
			b10 = parentTransform.c, b11 = parentTransform.d;

		worldTransform.a = b00 * a00 + b01 * a10;
		worldTransform.b = b00 * a01 + b01 * a11;
		worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

		worldTransform.c = b10 * a00 + b11 * a10;
		worldTransform.d = b10 * a01 + b11 * a11;
		worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;
    
    
    /*if (this.b)
    {
        this.n -= 0.01;
        if (this.n < -0.2)
        {
            this.b = false;
        }
    }
    if (!this.b)
    {
        this.n += 0.01;
        if (this.n > 0.2)
        {
            this.b = true;
        }
    }*/
    this.n += 0.07;
    
};

Main.instance = new Main();
