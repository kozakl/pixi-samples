/**
 * @author kozakluke@gmail.com
 */
PIXI.Texture.prototype.scale = 1;

PIXI.Texture.prototype.setScale = function(value)
{
    this.scale = value;
    
    this.width        = (this.width        * this.scale) + 0.5 | 0;
    this.height       = (this.height       * this.scale) + 0.5 | 0;
    this.frame.width  = (this.frame.width  * this.scale) + 0.5 | 0;
    this.frame.height = (this.frame.height * this.scale) + 0.5 | 0;
    if (this.trim) {
        this.trim.width  = (this.trim.width  * this.scale) + 0.5 | 0;
        this.trim.height = (this.trim.height * this.scale) + 0.5 | 0;
        this.trim.x *= this.scale;
        this.trim.y *= this.scale;
    }
    if (PIXI.defaultRenderer.type == PIXI.WEBGL_RENDERER)
    {
        this.crop.width  = (this.crop.width  * this.scale) + 0.5 | 0;
        this.crop.height = (this.crop.height * this.scale) + 0.5 | 0;
        this.crop.x *= this.scale;
        this.crop.y *= this.scale;
        
        this._updateUvs();
    }
};

/**
 * Updates the internal WebGL UV cache.
 *
 * @method _updateUvs
 * @private
 */
PIXI.Texture.prototype._updateUvs = function()
{
    if(!this._uvs)this._uvs = new PIXI.TextureUvs();

    var frame = this.crop;
    var tw = this.baseTexture.width  * this.scale;
    var th = this.baseTexture.height * this.scale;
    
    this._uvs.x0 = frame.x / tw;
    this._uvs.y0 = frame.y / th;
    
    this._uvs.x1 = (frame.x + frame.width) / tw;
    this._uvs.y1 = frame.y / th;
    
    this._uvs.x2 = (frame.x + frame.width) / tw;
    this._uvs.y2 = (frame.y + frame.height) / th;
    
    this._uvs.x3 = frame.x / tw;
    this._uvs.y3 = (frame.y + frame.height) / th;
};

/**
* Renders the object using the Canvas renderer
*
* @method _renderCanvas
* @param renderSession {RenderSession} 
* @private
*/
PIXI.Sprite.prototype._renderCanvas = function(renderSession)
{
    // If the sprite is not visible or the alpha is 0 then no need to render this element
    if (this.visible === false || this.alpha === 0 || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;
    
    if (this.blendMode !== renderSession.currentBlendMode)
    {
        renderSession.currentBlendMode = this.blendMode;
        renderSession.context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
    }

    if (this._mask)
    {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    //  Ignore null sources
    if (this.texture.valid)
    {
        var resolution = this.texture.baseTexture.resolution / renderSession.resolution;

        renderSession.context.globalAlpha = this.worldAlpha;

        //  Allow for pixel rounding
        if (renderSession.roundPixels)
        {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                (this.worldTransform.tx* renderSession.resolution) | 0,
                (this.worldTransform.ty* renderSession.resolution) | 0);
        }
        else
        {
            renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                this.worldTransform.tx * renderSession.resolution,
                this.worldTransform.ty * renderSession.resolution);
        }

        //  If smoothingEnabled is supported and we need to change the smoothing property for this texture
        if (renderSession.smoothProperty && renderSession.scaleMode !== this.texture.baseTexture.scaleMode)
        {
            renderSession.scaleMode = this.texture.baseTexture.scaleMode;
            renderSession.context[renderSession.smoothProperty] = (renderSession.scaleMode === PIXI.scaleModes.LINEAR);
        }

        //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
        var dx = (this.texture.trim) ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;
        var dy = (this.texture.trim) ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;

        if (this.tint !== 0xFFFFFF)
        {
            if (this.cachedTint !== this.tint)
            {
                this.cachedTint = this.tint;
                
                //  TODO clean up caching - how to clean up the caches?
                this.tintedTexture = PIXI.CanvasTinter.getTintedTexture(this, this.tint);
            }

            renderSession.context.drawImage(
                                this.tintedTexture,
                                0,
                                0,
                                this.texture.crop.width,
                                this.texture.crop.height,
                                dx / resolution,
                                dy / resolution,
                                this.texture.crop.width / resolution  * this.texture.scale,
                                this.texture.crop.height / resolution * this.texture.scale);
        }
        else
        {
            renderSession.context.drawImage(
                                this.texture.baseTexture.source,
                                this.texture.crop.x,
                                this.texture.crop.y,
                                this.texture.crop.width,
                                this.texture.crop.height,
                                dx / resolution,
                                dy / resolution,
                                this.texture.crop.width / resolution  * this.texture.scale,
                                this.texture.crop.height / resolution * this.texture.scale);
        }
    }

    // OVERWRITE
    for (var i = 0, j = this.children.length; i < j; i++)
    {
        this.children[i]._renderCanvas(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};
