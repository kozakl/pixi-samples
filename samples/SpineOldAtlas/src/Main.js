/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function Main()
{
    //protected private
    this.stage    = null;
    this.renderer = null;
    
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
    Main.scaleView  = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                           height * window.devicePixelRatio / 640);
    Main.scaleAsset = DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 0.5, 1.75) :
                                                 MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 0.5, 1.75);
    
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
    
    var loader = new PIXI.loaders.Loader();
    loader.add('assets/graphics/@{0}x/atlas.json'.replace('{0}', Main.scaleAsset));
    loader.load(this.onLoadAssets.bind(this));
    
    window.addEventListener('resize', this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var last = 0;
    (function update(now)
    {
        requestAnimationFrame(update);
        var delta = now - last;
        var interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        
        stats.update();
        renderer.render(stage);
    })(0);
};

/**
 * @private
 */
Main.prototype.onLoadAssets = function()
{
    var spineParser = new PIXI.spine.SkeletonJson();
    spineParser.scale = 1 / 1.75;
    PIXI.AnimCache['owlSpine'] = spineParser.readSkeletonData(SpineData.owlSpine);
    
    var owl = new PIXI.Spine('owlSpine');
    this.stage.addChild(owl);
    owl.state.setAnimationByName('animation', true);
    owl.position.x = 500;
    owl.position.y = 250;
};

/**
 * @private
 */
Main.prototype.onResize = function()
{
    this.renderer.view.style.width  = window.innerWidth  + 'px';
    this.renderer.view.style.height = window.innerHeight + 'px';
    this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                         window.innerHeight * window.devicePixelRatio);
    this.renderer.render(this.stage);
    window.scrollTo(0, 0);
};

Main.instance = new Main();
