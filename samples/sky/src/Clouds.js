/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function Clouds(texture)
{
    PIXI.Container.call(this, texture);
    //public
    this.bg = new PIXI.Sprite.fromImage("assets/img/skyBG.jpg"),
            this.addChild(this.bg),
            this.mini3d = new Mini3d(), this.addChild(this.mini3d.view),
        this.speed = -15, this.range = 3e3, this.clouds = [], this.images = ["skyCloud1.png", "skyCloud2.png"];
        for (var e = 0; 50 > e; e++) {
            var i = new Cloud(PIXI.Texture.fromImage("assets/img/" + this.images[e % 2]));
            this.mini3d.addChild(i), this.clouds.push(i), i.position3d.z = -(this.range / 50) * e
        }
        this.count = 0
    
    
}

Clouds.prototype = Object.create(PIXI.Container.prototype);
Clouds.prototype.constructor = Clouds;

Clouds.prototype.onShow = function () {
    }, Clouds.prototype.onShown = function () {
    }, Clouds.prototype.update = function () {
        for (var t = 0; t < this.clouds.length; t++) {
            var e = this.clouds[t];
            e.position3d.z += this.speed, e.position3d.z < 300 ? e.alpha = e.position3d.z / 300 :
                e.alpha += .01 * (1 - e.alpha),
            e.position3d.z < 0 && (e.scaleRatio = 5,
                e.position3d.z += this.range,
                e.position3d.x = RD.random(-4500, 4500),
                e.position3d.y = 1200 - Math.abs(.2 * e.position3d.x) +
                RD.random(0, 200),
                e.rotation = e.position3d.x * -2e-4, e.alpha = 0,
                e.scaleOffset.x = RD.random(.6, 1.4),
                e.scaleOffset.y = RD.random(.9, 1.1),
            Math.random() < .5 && (e.scaleOffset.x *= -1))
        }
        this.mini3d.update(), this.count++, this.mini3d.view.rotation = .08 * Math.cos(.02 * this.count),
            this.mini3d.position3d.y = 200 * Math.sin(.03 * this.count),
            this.mini3d.position3d.y -= 50, this.mini3d.rotation3d.y = .2 * Math.sin(.02 * this.count * .5)
    }, Clouds.prototype.resize = function (t, e) {
        this.mini3d.view.x = t / 2, this.mini3d.view.y = e / 2
    };



var RD = {};
    RD.random = function (t, e) {
        return t = t || 0, e = void 0 === e ? 1 : e, t + Math.random() * (e - t)
    }, RD.randomInt = function (t, e) {
        return t + Math.random() * (e - t) | 0
    }, RD.randomSeed = function (t, e, i) {
        min = t, max = e, i = i || 1, i = (9301 * i + 49297) % 233280;
        var r = i / 233280;
        return min + r * (max - min)
    }, RD.randomChance = function (t, e) {
        return r.randomSeed(0, 1, e) > t
    };