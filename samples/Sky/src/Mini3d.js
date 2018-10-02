/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function Mini3d()
{
    //public
    this.view = new PIXI.Container, this.children = [], this.focalLength = 400, this.position3d = {
            x: 0,
            y: 0,
            z: 0
        }, this.rotation3d = {x: 0, y: 0, z: 0};
    
}

Mini3d.prototype.constructor = Mini3d;

Mini3d.prototype.addChild = function (t) {
        t.position3d || (t.position3d = {
            x: 0,
            y: 0,
            z: 0
        }), t.anchor.set(.5), this.view.addChild(t), this.children.push(t)
    };

    Mini3d.prototype.update = function () {
        for (var t, e, i, n, o, s, a, h, l, u,
                 c = Math.sin(this.rotation3d.x),
                 d = Math.cos(this.rotation3d.x),
                 p = Math.sin(this.rotation3d.y),
                 f = Math.cos(this.rotation3d.y),
                 m = Math.sin(this.rotation3d.z),
                 v = Math.cos(this.rotation3d.z),
                 g = 0; g < this.children.length; g++) {
            var y = this.children[g];
            t = y.position3d.x - this.position3d.x, e = y.position3d.y - this.position3d.y,
                i = y.position3d.z - this.position3d.z,
                n = d * e - c * i,
                o = c * e + d * i,
                a = f * o - p * t,
                s = p * o + f * t,
                h = v * s - m * n,
                l = m * s + v * n,
                u = this.focalLength / (this.focalLength + a),
                t = h * u, e = l * u, i = a,
                y.scale.x = y.scale.y = u * y.scaleRatio,
                y.scale.x *= y.scaleOffset.x,
                y.scale.y *= y.scaleOffset.y,
                y.depth = -y.position3d.z,
                y.position.x = t, y.position.y = e
        }
        function r(t, e) {
        return t.depth - e.depth
    }
        this.view.children.sort(r)
    };
