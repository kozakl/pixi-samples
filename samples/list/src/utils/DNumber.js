/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function DNumber()
{
    //public
    this.begin = null;
    this.end   = null;
}

DNumber.prototype = Object.create(Object.prototype);
DNumber.prototype.constructor = DNumber;

DNumber.prototype.set = function(begin, end)
{
    this.begin = begin;
    this.end   = end;
};
