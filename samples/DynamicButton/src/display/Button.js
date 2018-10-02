/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function Button(text)
{
    PIXI.Container.call(this);
    //public
    this.hitArea             = new PIXI.Rectangle();
    this.interactiveChildren = false;
    this.interactive         = true;
    this.buttonMode          = true;
    //protected private
    this.textureUpLeft       = null;
    this.textureUpMiddle     = null;
    this.textureUpRight      = null;
    this.textureDownLeft     = null;
    this.textureDownMiddle   = null;
    this.textureDownRight    = null;
    this.left                = null;
    this.middle              = null;
    this.right               = null;
    this.label               = null;
    
    var originUp   = TextureUtil.fromFrame('button/up');
    var originDown = TextureUtil.fromFrame('button/down');
    
    this.textureUpLeft   = new PIXI.Texture(originUp, new PIXI.Rectangle(originUp.frame.x,
                                                                                  originUp.frame.y,
                                                                                  10,
                                                                                  originUp.frame.height));
    this.textureUpMiddle = new PIXI.Texture(originUp, new PIXI.Rectangle(originUp.frame.x + 10,
                                                                                  originUp.frame.y,
                                                                                  originUp.frame.width - 20,
                                                                                  originUp.frame.height));
    this.textureUpRight  = new PIXI.Texture(originUp, new PIXI.Rectangle(originUp.frame.x + originUp.frame.width - 10,
                                                                                  originUp.frame.y,
                                                                                  10,
                                                                                  originUp.frame.height));
    
    this.textureDownLeft   = new PIXI.Texture(originDown, new PIXI.Rectangle(originDown.frame.x,
                                                                                      originDown.frame.y,
                                                                                      10,
                                                                                      originDown.frame.height));
    this.textureDownMiddle = new PIXI.Texture(originDown, new PIXI.Rectangle(originDown.frame.x + 10,
                                                                                      originDown.frame.y,
                                                                                      originDown.frame.width - 20,
                                                                                      originDown.frame.height));
    this.textureDownRight  = new PIXI.Texture(originDown, new PIXI.Rectangle(originDown.frame.x + originDown.frame.width - 10,
                                                                                      originDown.frame.y,
                                                                                      10,
                                                                                      originDown.frame.height));
    
    var left = this.left = new PIXI.Sprite(this.textureUpLeft);
    this.addChild(left);
    var middle = this.middle = new PIXI.Sprite(this.textureUpMiddle);
    this.addChild(middle);
    var right = this.right = new PIXI.Sprite(this.textureUpRight);
    this.addChild(right);
    
    var label = this.label = new PIXI.extras.BitmapText(text, {font:'50px Arial50'});
    this.addChild(label);
    label.tint = 0x1A4354;
    this.updateLabel(text);
    
    this.mousedown      = this.touchstart      = this.onDown.bind(this);
    this.mouseup        = this.touchend        =
    this.mouseupoutside = this.touchendoutside = this.onUp.bind(this);
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;

Object.defineProperties(Button.prototype, {
    width: {
        set: function(value) {
            this._width = value;
            
            this.hitArea.width = this._width;
        },
        get: function() {
            return this._width;
        }
    },
    height: {
        set: function(value) {
            this._height = value;
            
            this.hitArea.height = this._height;
        },
        get: function() {
            return this._height;
        }
    }
});

/**
 * @private
 */
Button.prototype.onDown = function()
{
    this.left.texture   = this.textureDownLeft;
    this.middle.texture = this.textureDownMiddle;
    this.right.texture  = this.textureDownRight;
};

/**
 * @private
 */
Button.prototype.onUp = function()
{
    this.left.texture   = this.textureUpLeft;
    this.middle.texture = this.textureUpMiddle;
    this.right.texture  = this.textureUpRight;
};

Button.prototype.updateLabel = function(text)
{
    this.label.text = text;
    this.label.updateText();
    
    this.middle.width = Math.min(500, this.label.textWidth + 250);
    this.middle.position.x = this.left.width;
    this.right.position.x  = this.middle.position.x + this.middle.width;
    
    this.width  = this.right.position.x + this.right.width;
    this.height = this.right.position.y + this.right.height;
    
    this.label.position.x = this.width  * 0.5 - this.label.textWidth  * 0.5 + 0.5 | 0;
    this.label.position.y = this.height * 0.5 - this.label.textHeight * 0.5 + 1.0 | 0;
};
