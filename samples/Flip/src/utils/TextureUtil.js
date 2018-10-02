/**
 * @author kozakluke@gmail.com
 * @constructor
 */
function TextureUtil() { }

TextureUtil.copyFrames = function(frames, n, path)
{
    frames = frames || [];
    for (var i = 1; i <= n; ++i)
        frames[frames.length] = PIXI.Texture.fromFrame(path + '/frame' + i + '.png');
    
    return frames;
};

TextureUtil.rename = function(path, name)
{
    PIXI.Texture.addTextureToCache(
        PIXI.Texture.removeTextureFromCache(path), name);
};
