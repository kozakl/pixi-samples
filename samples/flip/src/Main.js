/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function Main()
{
    //protected private
    this.stage     = null;
    this.renderer  = null;
    this.container = null;
    
    try {
        window.devicePixelRatio = window['devicePixelRatio'] || 1;
    } catch(event) { }
    
    var screenWidth  = Math.max(screen.width, screen.height);
    var screenHeight = Math.min(screen.width, screen.height);
    var innerWidth   = Math.max(window.innerWidth, window.innerHeight);
    var innerHeight  = Math.min(window.innerWidth, window.innerHeight);
    var width  = screenWidth  / window.devicePixelRatio >= innerWidth ?
                 screenWidth  / window.devicePixelRatio : screenWidth;
    var height = screenHeight / window.devicePixelRatio >= innerHeight ?
                 screenHeight / window.devicePixelRatio : screenHeight;
    Main.scaleView = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                          height * window.devicePixelRatio / 640);
    Main.scaleAsset = DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 0.5, 1.75) :
                                                 MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 0.5, 1.75);
    Main.viewWidth  = window.innerWidth  * window.devicePixelRatio / Main.scaleView;
    Main.viewHeight = window.innerHeight * window.devicePixelRatio / Main.scaleView;
    
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
    stats.domElement.style.position = 'absolute';
    
    var stage = this.stage = new PIXI.Container();
    stage.scale.x = Main.scaleView;
    stage.scale.y = Main.scaleView;
    var renderer = this.renderer = PIXI.autoDetectRenderer(0, 0);
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = 0x333333;
    
    var loader = PIXI.loader;
    loader.once('complete', this.onLoadAssets.bind(this));
    loader.add([
        'assets/graphics/@{0}x/logo.png'.replace('{0}', Main.scaleAsset)
    ]);
    loader.load();
    
    var shape = new PIXI.Graphics();
    stage.addChild(shape);
    shape.beginFill(0xFFFF00, 1);
    shape.drawRect(0, 0, 250, 250);
    shape.endFill();
    
    window.addEventListener('resize', this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var self = this,
        last = 0;
    (function update(now)
    {
        requestAnimationFrame(update);
        var delta = now - last;
        var interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        
        if (self.container) {
            self.container.rotation.x += 0.01;
            self.container.rotation.y += 0.01;
        }
        stats.update();
        renderer.render(stage);
    })(0);
};

/**
 * @private
 */
Main.prototype.onLoadAssets = function()
{
    TextureUtil.rename('assets/graphics/@{0}x/logo.png'.replace('{0}', Main.scaleAsset), 'logo');
    
    var container = this.container = new Container3D();
    this.stage.addChild(container);
    
    for (var i = 0; i < 2000; ++i)
    {
        var logo = new Sprite3D(PIXI.Texture.fromFrame('logo'));
        container.addChild(logo);
        logo.anchor.x = 0.5;
        logo.anchor.y = 0.5;
        logo.scale.x = 0.15;
        logo.scale.y = 0.15;
        logo.rotation.x = MathUtil.rndRange(-90, 90) * MathUtil.RADIANS;
        logo.rotation.y = MathUtil.rndRange(-90, 90) * MathUtil.RADIANS;
        logo.rotation.z = MathUtil.rndRange(-90, 90) * MathUtil.RADIANS;
        logo.position.x = MathUtil.rndRange(-200, 200);
        logo.position.y = MathUtil.rndRange(-200, 200);
        logo.position.z = MathUtil.rndRange(-200, 200);
    }
    
    this.onResize();
};

/**
 * @private
 */
Main.prototype.onResize = function()
{
    Main.viewWidth  = window.innerWidth  * window.devicePixelRatio / Main.scaleView;
    Main.viewHeight = window.innerHeight * window.devicePixelRatio / Main.scaleView;
    
    if (this.container) {
        this.container.position.x = Main.viewWidth  * 0.5;
        this.container.position.y = Main.viewHeight * 0.5;
    }
    this.renderer.view.style.width  = window.innerWidth  + 'px';
    this.renderer.view.style.height = window.innerHeight + 'px';
    this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                         window.innerHeight * window.devicePixelRatio);
    this.renderer.render(this.stage);
    window.scrollTo(0, 0);
};

Main.instance = new Main();
