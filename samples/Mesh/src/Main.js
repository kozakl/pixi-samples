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
    Main.scaleAsset = 1.5//DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 0.5, 1.75) :
                          //                       MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 0.5, 1.75);
    
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
    loader.add('assets/graphics/@{0}x/atlas.json'.replace('{0}', Main.scaleAsset));
    loader.load(this.onLoadAssets.bind(this));
    
    var shape = new PIXI.Graphics();
    stage.addChild(shape);
    shape.beginFill(0xFFFF00, 1);
    shape.drawRect(0, 0, 250, 250);
    shape.endFill();
    
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
    TextureUtil.rename('logo.png', 'logo');
    
    var uv = PIXI.Texture.fromFrame('logo')._uvs;
    var tx = PIXI.Texture.fromFrame('logo');
    console.log(PIXI.Texture.fromFrame('logo').baseTexture.resolution)
    
    var vertices =  new Float32Array([0, 0,
                                      tx.width-70, 0,
                                      tx.width, tx.height,
                                      0, tx.height]);
    var uvs = new Float32Array([/*0, 0,
                                1, 0,
                                1, 1,
                                0, 1*/ uv.x0, uv.y0,
                                       uv.x1, uv.y1,
                                       uv.x2, uv.y2,
                                       uv.x3, uv.y3
                                        ]);
    
    var indices = new Uint16Array([0, 1, 2,
                                   0, 2, 3]);
    
    
    var logo = new PIXI.mesh.Mesh(PIXI.Texture.fromFrame('logo'), vertices, uvs, indices, PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
    this.stage.addChild(logo);
    logo.position.x = 225;
    logo.position.y = 225;
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
