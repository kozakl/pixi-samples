/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function TweenCore()
{
    //public
    this.motionSpeed = 1;
    //protected private
    this.time        = 0;
    this.percent     = 0;
    this.duration    = null;
    this.ease        = null;
    this.complete    = null;
    this.completeArg = null;
}

TweenCore.prototype = Object.create(Object.prototype);
TweenCore.prototype.constructor = TweenCore;

TweenCore.prototype.update = function(delta)
{
    this.time   += delta * this.motionSpeed;
	this.percent = this.time / this.duration;
    if (this.percent > 1)
    {
        this.time    = this.duration;
        this.percent = 1;
    }
};

TweenCore.prototype.tweenCoreUpdate = TweenCore.prototype.update;

TweenCore.prototype.destroy = function()
{
    this.target      = null;
    this.complete    = null;
    this.completeArg = null;
};
