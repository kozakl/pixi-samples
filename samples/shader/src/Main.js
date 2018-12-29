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
        "assets/graphics/face.png"
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
    
    var last = 0;
    var self = this;
    (function update(now)
    {
        requestAnimationFrame(update, null);
        var delta = now - last;
        var interval = 1000 / 30;
        if (delta < interval)
            return;
        last = now - (delta % interval);
        
        if (self.shader)
        {
            var time = now / 1000;
            self.shader.uniforms.time.value = time;
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
    PIXI.Texture.addTextureToCache(
        PIXI.Texture.removeTextureFromCache("assets/graphics/face.png"), "logo");
    
    var logo = new PIXI.Sprite(PIXI.Texture.fromFrame("logo"));
    this.stage.addChild(logo);
    logo.position.x = 195;
    logo.position.y = 195;
    
    var shader = this.shader = new Shader();
    console.log(shader)
    shader.uniforms.lineHeight.value = 1 / logo.height;
    //shader.uniforms.time.value = .4;
    logo.shader = shader;
    
    
    TweenLite.to(shader.uniforms.distortion, 0.5, {delay:1, value:0.05});
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
Shader = function()
{
    PIXI.AbstractFilter.call( this );
    
    this.passes = [this];
    
    // set the uniforms
    this.uniforms = {
        gray:{type:"1f", value:1},
        time:{type:"1f", value:0},
        distortion:{type:"1f", value:0},
        verticalSync:{type:"1f", value:0.1},
        lineSync:{type:"1f", value:0.2},
        lineHeight:{type:"1f", value:1},
        scanlines:{type:"1f", value:0.3},
        frameShape:{type:"1f", value:0.27},
        frameLimit:{type:"1f", value:0.34},
        frameSharpness:{type:"1f", value:8.4},
        frameColor: {type: '4fv', value:new PIXI.Float32Array([0, 0, 0, 1])}
    };
    
    this.fragmentSrc =
    [
        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "uniform sampler2D uSampler;",
        "uniform float gray;",
        
        
        '#define HardLight(top, bottom)  (1.0 - 2.0 * (1.0 - top) * (1.0 - bottom))',

        'varying vec2 vTexCoord;',

        'uniform sampler2D source;',
        'uniform sampler2D particles;',
        'uniform float time;',
        'uniform float scanlines;',
        'uniform float lineSync;',
        'uniform float lineHeight;', //for scanlines and distortion
        'uniform float distortion;',
        'uniform float vsync;',
        'uniform float bars;',
        'uniform float frameSharpness;',
        'uniform float frameShape;',
        'uniform float frameLimit;',
        'uniform vec4 frameColor;',
        
        Shader.noiseHelpers +
		Shader.snoise2d +
        
        "void main(void) {",
            
        
        
        
            '	vec2 texCoord = vTextureCoord;',

                //distortion
            '	float drandom = snoise(vec2(time * 50.0, texCoord.y /lineHeight));',
            '	float distortAmount = distortion * (drandom - 0.25) * 0.5;',
            
            '	texCoord.x -= distortAmount;',
            '	texCoord.x = mod(texCoord.x, 1.0);',

            
            '	vec4 pixel = texture2D(uSampler, texCoord);',

            

            '	if (mod(texCoord.y / lineHeight, 2.0) < 1.0 ) {',
            '		pixel.rgb *= (1.0 - scanlines);',
            '	}',

            '	float f = (1.0 - gl_FragCoord.x * gl_FragCoord.x) * (1.0 - gl_FragCoord.y * gl_FragCoord.y);',
            '	float frame = clamp( frameSharpness * (pow(f, frameShape) - frameLimit), 0.0, 1.0);',

            '	gl_FragColor = mix(frameColor, pixel, frame);',
            //'	gl_FragColor = pixel;',
            //'	gl_FragColor.rgb *= time;',
        
        
        "}"
    ];
};

Shader.prototype = Object.create(PIXI.AbstractFilter.prototype);
Shader.prototype.constructor = Shader;

Shader.noiseHelpers = '#ifndef NOISE_HELPERS\n' +
    '#define NOISE_HELPERS\n' +
    'vec2 mod289(vec2 x) {\n' +
    '	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
    '}\n' +
    'vec3 mod289(vec3 x) {\n' +
    '	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
    '}\n' +
    'vec4 mod289(vec4 x) {\n' +
    '	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
    '}\n' +
    'vec3 permute(vec3 x) {\n' +
    '	return mod289(((x*34.0)+1.0)*x);\n' +
    '}\n' +
    'vec4 permute(vec4 x) {\n' +
    '	return mod289(((x*34.0)+1.0)*x);\n' +
    '}\n' +
    'vec4 taylorInvSqrt(vec4 r) {\n' +
    '	return 1.79284291400159 - 0.85373472095314 * r;\n' +
    '}\n' +
    'float taylorInvSqrt(float r) {\n' +
    '	return 1.79284291400159 - 0.85373472095314 * r;\n' +
    '}\n' +
    '#endif\n';

Shader.snoise2d = '#ifndef NOISE2D\n' +
    '#define NOISE2D\n' +
    'float snoise(vec2 v) {\n' +
    '	const vec4 C = vec4(0.211324865405187, // (3.0-sqrt(3.0))/6.0\n' +
    '		0.366025403784439, // 0.5*(sqrt(3.0)-1.0)\n' +
    '		-0.577350269189626, // -1.0 + 2.0 * C.x\n' +
    '		0.024390243902439); // 1.0 / 41.0\n' +
    '	vec2 i = floor(v + dot(v, C.yy));\n' +
    '	vec2 x0 = v - i + dot(i, C.xx);\n' +
    '	vec2 i1;\n' +
    '	//i1.x = step(x0.y, x0.x); // x0.x > x0.y ? 1.0 : 0.0\n' +
    '	//i1.y = 1.0 - i1.x;\n' +
    '	i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n' +
    '	// x0 = x0 - 0.0 + 0.0 * C.xx ;\n' +
    '	// x1 = x0 - i1 + 1.0 * C.xx ;\n' +
    '	// x2 = x0 - 1.0 + 2.0 * C.xx ;\n' +
    '	vec4 x12 = x0.xyxy + C.xxzz;\n' +
    '	x12.xy -= i1;\n' +
    '	i = mod289(i); // Avoid truncation effects in permutation\n' +
    '	vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));\n' +
    '	vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);\n' +
    '	m = m*m ;\n' +
    '	m = m*m ;\n' +
    '	vec3 x = 2.0 * fract(p * C.www) - 1.0;\n' +
    '	vec3 h = abs(x) - 0.5;\n' +
    '	vec3 ox = floor(x + 0.5);\n' +
    '	vec3 a0 = x - ox;\n' +
    '	m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\n' +
    '	vec3 g;\n' +
    '	g.x = a0.x * x0.x + h.x * x0.y;\n' +
    '	g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n' +
    '	return 130.0 * dot(m, g);\n' +
    '}\n' +
    '#endif\n';

Main.instance = new Main();
