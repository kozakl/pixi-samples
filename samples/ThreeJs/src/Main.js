/**
 * @author kozakluke@gmail.com
 */
class Main
{
    constructor()
    {
        //protected private
        this.stage    = null;
        this.renderer = null;
        
        try {
            window.devicePixelRatio = window['devicePixelRatio'] || 1;
        } catch(event) { }
        
        const screenWidth  = Math.max(screen.width, screen.height);
        const screenHeight = Math.min(screen.width, screen.height);
        const innerWidth   = Math.max(window.innerWidth, window.innerHeight);
        const innerHeight  = Math.min(window.innerWidth, window.innerHeight);
        const width  = screenWidth  / window.devicePixelRatio >= innerWidth ?
                       screenWidth  / window.devicePixelRatio : screenWidth;
        const height = screenHeight / window.devicePixelRatio >= innerHeight ?
                       screenHeight / window.devicePixelRatio : screenHeight;
        Main.scaleView   = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                                height * window.devicePixelRatio / 640);
        Main.scaleAsset  = DetectDevice.isDesktop() ? MathUtil.clamp(Math.round(window.devicePixelRatio * 2) / 2, 0.5, 1.75) :
                                                      MathUtil.clamp(Math.round(Main.scaleView          * 4) / 4, 0.5, 1.75);
        Main.animationId = null;
        Main.last        = 0;
        Main.delta       = 0;
        
        window.onload = this.onLoad.bind(this);
    }
    
    /**
     * @private
     */
    onLoad()
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
        
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        
        var geometry = new THREE.BoxGeometry(200, 200, 200, 5, 5, 5);
        var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        var renderer3D = new THREE.WebGLRenderer({canvas: renderer.view});
        renderer3D.setSize( window.innerWidth, window.innerHeight );
        renderer3D.autoClear = false;
        
        document.addEventListener('visibilitychange', this.onVisibility.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(this.onResize.bind(this), 0);
        
        var delta = 0;
        (this.updateHandler = function update(now)
        {
            Main.animationId = requestAnimationFrame(update);
            delta      = now - Main.last;
            Main.last  = now;
            Main.delta = delta * 0.06;
            
            stats.update();
            
            renderer3D.clear();
            
            renderer.render(stage);
            
            renderer3D.resetGLState();
            renderer3D.render( scene, camera );
            
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            
        })(performance.now());
    }
    
    /**
     * @private
     */
    onLoadAssets()
    {
        var logo = new PIXI.Sprite(TextureUtil.fromFrame('logo'));
        this.stage.addChild(logo);
        logo.position.x = 225;
        logo.position.y = 225;
    }
    
    /**
     * @private
     */
    onVisibility()
    {
        if (document['visibilityState'] == 'hidden')
            cancelAnimationFrame(Main.animationId);
        else if (document['visibilityState'] == 'visible')
            this.updateHandler(Main.last = performance.now());
    }
    
    /**
     * @private
     */
    onResize()
    {
        this.renderer.view.style.width  = window.innerWidth  + 'px';
        this.renderer.view.style.height = window.innerHeight + 'px';
        this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio);
        this.renderer.render(this.stage);
        window.scrollTo(0, 0);
    }
}

Main.instance = new Main();
