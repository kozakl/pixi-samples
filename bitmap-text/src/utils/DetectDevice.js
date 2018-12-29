/**
 * @author kozakluke@gmail.com
 */
DetectDevice.smartphones = [
    /Mobile/i,
    /Android/i,
    /iPhone/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Windows Mobile/i,
    /Maemo/i,
    /PalmSource/i,
    /SymbianOS/i,
    /SymbOS/i,
    /Nokia/i,
    /MOT-/i,
    /JDME/i,
    /Series 60/i,
    /S60/i,
    /SonyEricsson/i
];
DetectDevice.tablets = [
    /Android 3/i,
    /iPad/i
];
DetectDevice.device = null;

/**
 * @constructor
 */
function DetectDevice() { }

DetectDevice.detect = function()
{
    if (DetectDevice.device)
        return DetectDevice.device;
    
    var n = DetectDevice.tablets.length;
    for (var i = 0; i < n; i++)
        if (navigator.userAgent.match(DetectDevice.tablets[i]))
            return DetectDevice.device = 'tablet';
    
    n = DetectDevice.smartphones.length;
    for (i = 0; i < n; i++)
        if (navigator.userAgent.match(DetectDevice.smartphones[i]))
            return DetectDevice.device = 'smartphone';
    
    return DetectDevice.device = 'desktop';
};

DetectDevice.isDesktop = function()
{
    return DetectDevice.detect() == 'desktop';  
};

DetectDevice.isMobile = function()
{
    return DetectDevice.detect() != 'desktop';
};
