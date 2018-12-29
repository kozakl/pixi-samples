/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function Main()
{
    //protected private
    this.particles = [];
    this.stage     = null;
    this.renderer  = null;
    this.mouse     = null;
    
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
    stats.domElement.style.position = 'absolute';
    
    var stage = this.stage = new PIXI.Container();
    stage.on('touchmove', function(event) { self.mouse = event.data.global; }, null);
	stage.on('mousemove', function(event) { self.mouse = event.data.global; }, null);
    stage.scale.x = Main.scaleView;
    stage.scale.y = Main.scaleView;
    var renderer = this.renderer = PIXI.autoDetectRenderer(0, 0);
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = 0x222222;
    
    var loader = PIXI.loader;
    loader.add('assets/graphics/@{0}x/particle1.png'.replace('{0}', Main.scaleAsset));
    loader.add('assets/graphics/@{0}x/particle2.png'.replace('{0}', Main.scaleAsset));
    loader.load(this.onLoadAssets.bind(this));
    
    window.addEventListener('resize', this.onResize.bind(this));
    setTimeout(this.onResize.bind(this), 0);
    
    var self = this;
    (function update()
    {
        requestAnimationFrame(update);
        
        if (self.particles.length > 0)
        {
            if(self.mouse.x == 0 && self.mouse.y == 0)
            {
                self.mouse.x = window.innerWidth * 0.5;
                self.mouse.y = window.innerHeight * 0.5;
            }
            
            var rx = self.mouse.x,
                ry = self.mouse.y;
            for(var i = 0; i < self.particles.length; i++)
            {
                var p = self.particles[i];
                p.position.x += (p.tx - p.position.x) * (p.speed * 2);
                p.position.y += (p.ty - p.position.y) * (p.speed * 2);
                rx = self.mouse.x - p.position.x < 200 ? self.mouse.x : p.position.x;
                ry = self.mouse.x - p.position.x < 200 ? self.mouse.y : p.position.y;
                p.tx = rx + Math.cos(p.a) * p.radius;
                p.ty = ry + Math.sin(p.a) * p.radius;
                
                p.a += p.speed;
            }
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
    TextureUtil.rename('assets/graphics/@{0}x/particle1.png'.replace('{0}', Main.scaleAsset), 'particle1');
    TextureUtil.rename('assets/graphics/@{0}x/particle2.png'.replace('{0}', Main.scaleAsset), 'particle2');
    
    this.mouse = this.renderer.plugins.interaction.mouse.global;
    
    var textures = [
        PIXI.Texture.fromFrame('particle1'),
        PIXI.Texture.fromFrame('particle2')
    ];
    
    for (var i = 0; i < 5000; i++) 
    {
        var particle = new PIXI.Sprite(textures[Math.floor(Math.random() * textures.length)]);
        this.stage.addChild(particle);
        particle.anchor.x = 0.5;
        particle.anchor.y = 0.5;
        particle.radius = Math.random() * 50 + 25;
        particle.a      = Math.random() * (Math.PI * 2);
        particle.speed  = (Math.random() + 0.4) / (particle.radius * 0.6);
        particle.scale.x =
        particle.scale.y = particle.speed * 20;
        particle.tx = this.renderer.width  * 0.5;
        particle.ty = this.renderer.height * 0.5;
        particle.position.x = particle.tx;
        particle.position.y = particle.ty;
        
        this.particles.push(particle);
    }
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
