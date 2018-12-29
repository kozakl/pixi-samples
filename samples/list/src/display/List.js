/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function List(itemsData)
{
    PIXI.Container.call(this);
    //public
    this.speed     = 10;
    //protected private
    this.items     = [];
    this.bg        = null;
    this.content   = null;
    this.headLeft  = null;
    this.headRight = null;
    this.lastDir   = 0;
    this.moveDir   = 0;
    
    var bg = this.bg = new PIXI.Graphics();
    this.addChild(bg);
    
    var content = this.content = new PIXI.Container();
    this.addChild(content);
    
    var n = itemsData.length;
    for (var i = 0; i < n; ++i)
    {
        var item = new PIXI.Sprite(itemsData[i]);
        content.addChild(item);
        item.position.x = i * 250;
        
        this.items.push(item);
    }
    
    for (i = 0; i < n; ++i)
    {
        item = this.items[i];
        if (i == 0)
            item.next = this.items[this.items.length - 1];
        else
            item.next = this.items[i - 1];
        
        if (i == this.items.length - 1)
            item.prev = this.items[0];
        else
            item.prev = this.items[i + 1];
    }
    
    this.headLeft  = this.items[0];
    this.headRight = this.items[this.items.length - 1];
}

List.prototype = Object.create(PIXI.Container.prototype);
List.prototype.constructor = List;

Object.defineProperties(List.prototype, {
    width: {
        set: function(value) {
            this._width = value;
            
            this.bg.clear();
            this.bg.beginFill(0xFF0000);
            this.bg.drawRect(0, 0, this._width, this._height);
            this.bg.endFill();
    
        },
        get: function() {
            return this._width;
        }
    },
    height: {
        set: function(value) {
            this._height = value;
            
            this.bg.clear();
            this.bg.beginFill(0xFF0000);
            this.bg.drawRect(0, 0, this._width, this._height);
            this.bg.endFill();
        },
        get: function() {
            return this._height;
        }
    }
});

/**
 * @private
 */
List.prototype.updateTransform = function()
{
    if (this.lastDir != this.content.position.x)
        this.moveDir = this.lastDir > this.content.position.x ? -1 : 1;
    this.lastDir = this.content.position.x;
    
    if (this.moveDir == -1)
    {
        if (this.content.position.x + this.headLeft.position.x < -this.headLeft.width) {
            this.headLeft.position.x = this.headLeft.next.position.x + this.headLeft.width;
            
            this.headRight = this.headLeft;
            this.headLeft  = this.headLeft.prev;
        }
    }
    else if (this.moveDir == 1)
    {
        if (this.content.position.x + this.headRight.position.x > this._width) {
            this.headRight.position.x = this.headRight.prev.position.x - this.headRight.width;
            
            this.headLeft  = this.headRight;
            this.headRight = this.headLeft.next;
        }
    }
    
    this.content.position.x += this.speed;
    this.containerUpdateTransform();
};
