/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function Cloud(texture)
{
    PIXI.Sprite.call(this, texture);
    //public
    this.position3d = {
            x: 0,
            y: 0,
            z: 0
        }, this.scaleRatio = 2, this.scaleOffset = new PIXI.Point(1, 1);
    
    
}

Cloud.prototype = Object.create(PIXI.Sprite.prototype);
Cloud.prototype.constructor = Cloud;
