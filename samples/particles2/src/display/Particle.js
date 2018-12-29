/**
 * @author kozakluke@gmail.com
 */
"use strict";
function Particle()
{
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame("particle"));
    //public
    this.velocity = new PIXI.Point();
    this.gravity  = 0;
    
    this.anchor.set(0.5, 0.5);
}

Particle.prototype = Object.create(PIXI.Sprite.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.update = function()
{
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
};
