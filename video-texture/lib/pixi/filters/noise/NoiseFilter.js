var core = require('../../core/index');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

/**
 * @author Vico @vicocotea
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
 */

/**
 * A Noise effect filter.
 *
 * @class
 * @extends AbstractFilter
 * @memberof PIXI.filters
 */
function NoiseFilter()
{
    core.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        fs.readFileSync(__dirname + '/noise.frag', 'utf8'),
        // custom uniforms
        {
            noise: { type: '1f', value: 0.5 }
        }
    );
}

NoiseFilter.prototype = Object.create(core.AbstractFilter.prototype);
NoiseFilter.prototype.constructor = NoiseFilter;
module.exports = NoiseFilter;

Object.defineProperties(NoiseFilter.prototype, {
    /**
     * The amount of noise to apply.
     *
     * @member {number}
     * @memberof NoiseFilter#
     * @default 0.5
     */
    noise: {
        get: function ()
        {
            return this.uniforms.noise.value;
        },
        set: function (value)
        {
            this.uniforms.noise.value = value;
        }
    }
});
