/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Star()
{
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("star"));
    //public
    this.velocity = new PIXI.Point();
    this.gravity  = 0;
    this.fade     = 0;
    
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}

Star.prototype = Object.create(PIXI.Sprite.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function()
{
    this.alpha += this.fade;
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
};
