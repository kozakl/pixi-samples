/**
 * @author kozakluke@gmail.com
 */
function Main()
{
    this.stage         = null;
    this.renderer      = null;
    this.stats         = null;
    this.stars    = [];
    
    if (!window.requestAnimationFrame)
    {
        window.requestAnimationFrame = (function() {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }
    
    UserData.STAGE_WIDTH    = 800;
    UserData.STAGE_HEIGHT   = 600;
    UserData.H_STAGE_WIDTH  = UserData.STAGE_WIDTH  >> 1;
    UserData.H_STAGE_HEIGHT = UserData.STAGE_HEIGHT >> 1;
    
    window.onload = emulateBind(this.onLoad, this);
}

/**
 * @private
 */
Main.prototype.onLoad = function()
{
    const container = document.createElement("div");
    document.body.appendChild(container);
    
    const stats = this.stats = new Stats();
    container.appendChild(stats.domElement);
    stats.domElement.style.position = "absolute";
    
    const stage = this.stage = new PIXI.Stage(0x000000, true);
    const renderer = this.renderer = PIXI.autoDetectRenderer(UserData.STAGE_WIDTH,
                                                             UserData.STAGE_HEIGHT,
                                                             undefined, false);
    document.body.appendChild(renderer.view);
    
    const loader = new PIXI.AssetLoader(["assets/graphics/poko1.png",
                                         "assets/graphics/poko5.png"]);
    loader.onComplete = emulateBind(this.onLoadAssets, this);
    loader.load();
    
    var last = Date.now();
    var self = this;
    (function update()
    {
        requestAnimationFrame(update);
        const now = Date.now();
        const delta = now - last;
        const interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        
        renderer.render(stage);
        stats.update();
        
        var FOCAL_LENGTH = 5000;
        if (self.stars.length > 0)
        {
            var n = self.stars.length;
            for (var i = 0; i < n; ++i)
            {
                var s = self.stars[i];
                s.z -= s.speed;
                s.rota();
                if (s.z <= -FOCAL_LENGTH)
                {
                    s.setPosition(s.x, s.y, 16000);
                    s.speed = Math.floor(Math.random() * 50 + 100);
                }
                else {
                    var scale = FOCAL_LENGTH / (FOCAL_LENGTH + s.z);
                    s.scale.x = s.scale.y = scale * 1.1;
                    s.position.x = (UserData.STAGE_WIDTH * 0.5)  + s.x * scale;
                    s.position.y = (UserData.STAGE_HEIGHT * 0.5) + s.y * scale;
                }
            }
        }
    })();
};

/**
 * @private
 */
Main.prototype.onLoadAssets = function()
{
    for (var i = 0; i < 160; ++i)
    {
        var star = new Star();
        this.stage.addChild(star);
        star.setPosition(Math.floor(Math.random() * 1000 - Math.random() * 1500),
                         Math.floor(Math.random() * 1000 - Math.random() * 500),
                         Math.floor(Math.random() * 8000 - Math.random() * 16000));
        star.speed = Math.floor(Math.random() * 50 + 100);
        
        this.stars[this.stars.length] = star;
    }
};

Main.instance = new Main();

Main.getInstance = function()
{
    return Main.instance;
};

function Star()
{
    PIXI.DisplayObjectContainer.call(this);
    
    this.shape  = null;
    this.speed  = 0;
    this.radian = 0;
    this.x      = 0;
    this.y      = 0;
    this.z      = 0;
    
    const shape = this.shape = new PIXI.Graphics();
    this.addChild(shape);
    shape.beginFill(0xFF0000, 1);
    shape.drawCircle(0, 0, 1.5);
    
    const s = PIXI.Sprite.fromImage("assets/graphics/poko1.png");
    this.addChild(s);
    s.anchor.x = s.anchor.y = 0.5;
    s.scale.x = s.scale.y = 0.3;
}

Star.constructor = Star;
Star.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Star.prototype.setPosition = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.radian = Math.atan2(x, y);
};

Star.prototype.rota = function()
{
    var leng = Math.sqrt(this.x * this.x + this.y * this.y);
    this.radian += this.speed / 15000;
    this.x = Math.sin(this.radian) * leng;
    this.y = Math.cos(this.radian) * leng;
};
