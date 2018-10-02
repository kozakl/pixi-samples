/**
 * @author kozakluke@gmail.com
 */
window.emulateBind = function(f, context)
{
    return function () {
        f.apply(context, arguments);
    }
};
