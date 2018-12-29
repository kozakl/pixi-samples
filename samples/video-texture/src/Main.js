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
    Main.scaleView = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                          height * window.devicePixelRatio / 640);
    
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
    
    
    //var video = document.createElement('video');
    //video.preload = 'auto';
    //video.loop = true;              // enable looping
    //video.src = 'assets/video.mp4';
    //video.oncanplay = addToPIXI;
    
    
    /*var texture = PIXI.Texture.fromVideo('assets/animation.mp4');
        var videoSprite = new PIXI.Sprite(texture);
    stage.addChild(videoSprite);
        videoSprite.width = renderer.width;
        videoSprite.height = renderer.height;
    
    
    
// the `video` var is an HTML video element. You can do whatever you want with it.
//video.loop = true;
    */
    
    
    
    
    
    var texture = PIXI.Texture.fromVideo('assets/animation.mp4');

// create a new Sprite using the video texture (yes it's that easy)
var videoSprite = new PIXI.Sprite(texture);

videoSprite.width = renderer.width;
videoSprite.height = renderer.height;

stage.addChild(videoSprite);
    
    var video = texture.baseTexture.source;

    video.addEventListener('ended', function () {
                video.currentTime = 0.75;
                video.play();
            });
    
    function addToPIXI() {
          
        
    }
    //setTimeout(function(){texture.baseTexture.source.pause();}, 1000);
    //setTimeout(function(){texture.baseTexture.source.play();}, 2000);
    
    
    window.addEventListener('touchstart', function() {
        texture.baseTexture.source.play()
    });
    window.addEventListener('resize', this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var last = 0;
    (function update(now)
    {
        requestAnimationFrame(update);
        
        stats.update();
        renderer.render(stage);
    })(0);
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
