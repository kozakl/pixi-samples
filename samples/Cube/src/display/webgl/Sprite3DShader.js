/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function Sprite3DShader(shaderManager)
{
    this.uniforms = {
        uSampler: {type: 'sampler2D', value: 0},
        projectionMatrix3d: {
            type: 'mat4',
            value: new Float32Array([1, 0, 0, 0,
                                     0, 1, 0, 0,
                                     0, 0, 1, 0,
                                     0, 0, 0, 1])
        }
    };
    this.attributes = {
        aVertexPosition: 0,
        aTextureCoord: 0,
        aColor: 0
    };
    
    this.vertexSrc = [
        'precision lowp float;',
        
        'attribute vec3 aVertexPosition;',
        'attribute vec2 aTextureCoord;',
        'uniform mat4 projectionMatrix3d;',
        'varying vec2 vTextureCoord;',
        
        'void main(void) {',
        '   vTextureCoord = aTextureCoord;',
        '   gl_Position = projectionMatrix3d * vec4(aVertexPosition, 1.0);',
        '}'
    ].join('\n');
    
    this.fragmentSrc = [
        'precision lowp float;',
        
        'varying vec2 vTextureCoord;',
        'uniform sampler2D uSampler;',
        
        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   if (gl_FragColor.a < 0.5)',
        '       discard;',
        '}'
    ].join('\n');
    
    PIXI.Shader.call(this, shaderManager, this.vertexSrc,
                                          this.fragmentSrc,
                                          this.uniforms,
                                          this.attributes);
}

Sprite3DShader.prototype = Object.create(PIXI.Shader.prototype);
Sprite3DShader.prototype.constructor = Sprite3DShader;
