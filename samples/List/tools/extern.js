/**
 * @constructor
 */
function P() //PIXI
{
    this.interactive     = null;
    this.mask            = null;
    this.worldVisible    = null;
    this.graphics        = null;
    this.sprite          = null;
    //mouse callbacks
    this.mouseover       = null;
    this.mouseout        = null;
    this.mousedown       = null;
    this.mouseup         = null;
    this.mouseupoutside  = null;
    this.click           = null;
    this.rightdown       = null;
    this.rightup         = null;
    this.rightupoutside  = null;
    this.rightclick      = null;
    //touch callbacks
    this.touchstart      = null;
    this.touchend        = null;
    this.touchendoutside = null;
    this.tap             = null;
    
    this.shader = {
        alpha:             {type: null, value: null},
        projectionMatrix:  {type: null, value: null},
        sampler2D:         {type: null, value: null},
        tint:              {type: null, value: null},
        translationMatrix: {type: null, value: null},
        //uniforms
        uAlpha:            {type: null, value: null},
        uSampler:          {type: null, value: null},
        //attributes
        aColor:            null,
        aTextureCoord:     null,
        aPositionCoord:    null,
        aRotation:         null,
        aVertexPosition:   null
    };
}

/**
 * @constructor
 */
function BasicAtlas()
{
    this.frames = {
        frame:{x: null, y: null,
               w: null, h: null},
        rotated: null,
        trimmed: null,
        spriteSourceSize:{x: null, y: null,
                          w: null, h: null},
        sourceSize:{w: null, h: null}
    };
    
    this.meta = {
        app    : null,
        version: null,
        image  : null,
        format : null,
        size   : {w: null, h: null}
    };
}
