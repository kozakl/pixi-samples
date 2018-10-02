/**
 * @author kozakluke@gmail.com
 */
"use strict";
function StarsEmitter()
{
    PIXI.SpriteBatch.call(this);
    //protected private
    this.stars1 = [];
    this.stars2 = [];
    this.stars3 = [];
}

StarsEmitter.prototype = Object.create(PIXI.SpriteBatch.prototype);
StarsEmitter.prototype.constructor = StarsEmitter;

/**
 * @private
 */
StarsEmitter.prototype.makeStar = function(scale, x, y)
{
    var star = new Star();
    this.addChild(star);
    star.gravity = 0.05;
    star.fade    =-0.03;
    star.scale.x =
    star.scale.y = scale;
    star.velocity.x =-MathUtil.rndRange( 1, 5);
    star.velocity.y = MathUtil.rndRange(-2, 2.5);
    star.position.x = x;
    star.position.y = y;
    
    return star;
};

/**
 * @private
 */
StarsEmitter.prototype.resetStar = function(star, x, y)
{
    star.alpha = 1;
    star.velocity.x =-MathUtil.rndRange( 1, 5);
    star.velocity.y = MathUtil.rndRange(-2, 2.5);
    star.position.x = x;
    star.position.y = y;
};

StarsEmitter.prototype.update = function(p1x, p1y,
                                         p2x, p2y,
                                         p3x, p3y)
{
    if (this.stars1.length < 50)
        this.stars1.push(this.makeStar(0.6, p1x, p1y));
    if (this.stars2.length < 50)
        this.stars2.push(this.makeStar(0.8, p2x, p2y));
    if (this.stars3.length < 50)
        this.stars3.push(this.makeStar(1, p3x, p3y));
    
    for (var i = this.stars1.length - 1; i >= 0; --i)
    {
        var star = this.stars1[i];
        star.update();
        if (star.alpha <= 0)
            this.resetStar(star, p1x, p1y);
    }
    
    for (i = this.stars2.length - 1; i >= 0; --i)
    {
        star = this.stars2[i];
        star.update();
        if (star.alpha <= 0)
            this.resetStar(star, p2x, p2y);
    }
    
    for (i = this.stars3.length - 1; i >= 0; --i)
    {
        star = this.stars3[i];
        star.update();
        if (star.alpha <= 0)
            this.resetStar(star, p3x, p3y);
    }
};
