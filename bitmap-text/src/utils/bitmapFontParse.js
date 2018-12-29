/**
 * @author kozakluke@gmail.com
 */
function bitmapFontParse(resource, texture)
{
    var data = {};
    var info = resource.data.getElementsByTagName('info')[0];
    var common = resource.data.getElementsByTagName('common')[0];
    var kernings = resource.data.getElementsByTagName('kerning');
    var resolution = texture.baseTexture.resolution;
    
    data.font = info.getAttribute('face');
    data.size = parseInt(info.getAttribute('size'), 10) / resolution;
    data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10) / resolution;
    data.chars = {};

    //parse letters
    var letters = resource.data.getElementsByTagName('char');

    for (var i = 0; i < letters.length; i++)
    {
        var charCode = parseInt(letters[i].getAttribute('id'), 10);

        var textureRect = new PIXI.Rectangle(
            parseInt(letters[i].getAttribute('x'), 10) / resolution + texture.frame.x - texture.trim.x,
            parseInt(letters[i].getAttribute('y'), 10) / resolution + texture.frame.y - texture.trim.y,
            parseInt(letters[i].getAttribute('width'), 10) / resolution,
            parseInt(letters[i].getAttribute('height'), 10) / resolution
        );
        
        data.chars[charCode] = {
            xOffset: parseInt(letters[i].getAttribute('xoffset'), 10) / resolution,
            yOffset: parseInt(letters[i].getAttribute('yoffset'), 10) / resolution,
            xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10) / resolution,
            kerning: {},
            texture: new PIXI.Texture(texture.baseTexture, textureRect)
        };
    }
    
    //parse kernings
    var n = kernings.length;
    for (i = 0; i < n; i++)
    {
        var first  = parseInt(kernings[i].getAttribute('first'),  10) / resolution;
        var second = parseInt(kernings[i].getAttribute('second'), 10) / resolution;
        var amount = parseInt(kernings[i].getAttribute('amount'), 10) / resolution;
        if (data.chars[second])
            data.chars[second].kerning[first] = amount;
    }
    
    PIXI.extras.BitmapText.fonts[data.font] = data;
}
