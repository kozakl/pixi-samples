/**
 * @author kozakluke@gmail.com
 */
TweenManager.delaysPool  = [];
TweenManager.delays2Pool = [];
TweenManager.tweens      = [];

/**
 * @constructor
 */
function TweenManager() { }

TweenManager.prototype.constructor = TweenManager;

TweenManager.add = function(tween)
{
    if (TweenManager.tweens.indexOf(tween) == -1) 
        TweenManager.tweens.push(tween);
};

TweenManager.remove = function(tween)
{
    var i = TweenManager.tweens.indexOf(tween);
    if (i != -1)
        TweenManager.tweens[i] = null;
};

TweenManager.setMotionSpeed = function(value)
{
    for (var i = TweenManager.tweens.length - 1; i >= 0; --i)
        if (TweenManager.tweens[i])
            TweenManager.tweens[i].motionSpeed = value;
};

TweenManager.delayCall = function(duration, complete,
                                            completeArg)
{
    var delay = TweenManager.delaysPool.pop() || new TweenManager.Delay();
    delay.to(duration,
        function(delay) {
            TweenManager.remove(delay);
            TweenManager.delaysPool.push(delay);
            complete(completeArg);
        }, delay
    );
    TweenManager.add(delay);
};

TweenManager.delay2Call = function(duration, complete,
                                             completeArg)
{
    var delay = TweenManager.delays2Pool.pop() || new TweenManager.Delay2();
    delay.to(duration,
        function(delay) {
            TweenManager.remove(delay);
            TweenManager.delays2Pool.push(delay);
            
            if (Object.prototype.toString.call(completeArg) === '[object Array]')
                complete.apply(null, completeArg);
            else
                complete(completeArg);
        }, delay
    );
    TweenManager.add(delay);
};

TweenManager.prototype.update = function(delta)
{
    var n = TweenManager.tweens.length,
        c = 0;
    if (n == 0)
        return;
    for (var i = 0; i < n; ++i)
    {
        var tween = TweenManager.tweens[i];
        if (tween)
        {
            if (c != i) {
                TweenManager.tweens[c] = tween;
                TweenManager.tweens[i] = null;
            }
            tween.update(delta);
            ++c;
        }
    }
    
    if (c != i)
    {
        n = TweenManager.tweens.length;
        while (i < n)
            TweenManager.tweens[c++] = TweenManager.tweens[i++];
        
        TweenManager.tweens.length = c;
    }
};

/**
 * @constructor
 * @extends {TweenCore}
 */
TweenManager.Delay = function()
{
    TweenCore.call(this);
    //protected private
    this.frame = null;
};

TweenManager.Delay.prototype = Object.create(TweenCore.prototype);
TweenManager.Delay.prototype.constructor = TweenManager.Delay;

TweenManager.Delay.prototype.to = function(duration, complete,
                                                     completeArg)
{
    this.duration    = duration;
    this.complete    = complete;
    this.completeArg = completeArg;
    this.frame       = 0;
};

TweenManager.Delay.prototype.update = function()
{
    ++this.frame;
    if (this.frame == this.duration)
    {
        var tComplete = this.complete;
        if (this.completeArg)
            tComplete(this.completeArg);
        else
            tComplete();
        tComplete = null;
    }
};

/**
 * @constructor
 * @extends {TweenCore}
 */
TweenManager.Delay2 = function()
{
    TweenCore.call(this);
    //protected private
    this.delay = null;
};

TweenManager.Delay2.prototype = Object.create(TweenCore.prototype);
TweenManager.Delay2.prototype.constructor = TweenManager.Delay2;

TweenManager.Delay2.prototype.to = function(duration, complete,
                                                      completeArg)
{
    this.duration    = duration;
    this.complete    = complete;
    this.completeArg = completeArg;
    this.time        = 0;
    this.percent     = 0;
};

TweenManager.Delay2.prototype.update = function(delta)
{
    if (this.delay)
    {
        this.time += delta * this.motionSpeed;
        if (this.time < this.delay)
            return;
        this.time  = 0;
        this.delay = null;
    }
    this.tweenCoreUpdate(delta);
    
    if (this.percent >= 1)
    {
        var tComplete = this.complete;
        this.complete = null;
        if (tComplete)
        {
            if (this.completeArg)
                tComplete(this.completeArg);
            else
                tComplete();
            tComplete = null;
        }
    }
};
