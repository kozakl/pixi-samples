/**
 * @author kozakluke@gmail.com
 * @extends {Container}
 * @constructor
 */
function Container3D()
{
    PIXI.Container.call(this);
    //public
    this.worldTransform3d = mat4.create();
    this.scale            = new Point3D(1, 1, 1);
    this.rotation         = new Point3D(0, 0, 0);
    this.position         = new Point3D(0, 0, 0);
    //protected private
    this.mat4             = mat4.create();
    this.vec3             = vec3.create();
    this.quat             = quat.create();
}

Container3D.prototype = Object.create(PIXI.Container.prototype);
Container3D.prototype.constructor = Container3D;

/**
 * @private
 */
Container3D.prototype.updateTransform = function()
{
    var rx = this.rotation.x,
        ry = this.rotation.y,
        rz = this.rotation.z,
        cx = Math.cos(rx * 0.5),
        cy = Math.cos(ry * 0.5),
        cz = Math.cos(rz * 0.5),
        sx = Math.sin(rx * 0.5),
        sy = Math.sin(ry * 0.5),
        sz = Math.sin(rz * 0.5);
    
    this.quat[0] = sx * cy * cz + cx * sy * sz;
    this.quat[1] = cx * sy * cz - sx * cy * sz;
    this.quat[2] = cx * cy * sz + sx * sy * cz;
    this.quat[3] = cx * cy * cz - sx * sy * sz;
    this.vec3[0] = this.position.x;
    this.vec3[1] = this.position.y;
    this.vec3[2] = this.position.z;
    mat4.fromRotationTranslation(this.worldTransform3d, this.quat, this.vec3);
    
    this.vec3[0] = this.scale.x;
    this.vec3[1] = this.scale.y;
    this.vec3[2] = this.scale.z;
    mat4.scale(this.worldTransform3d, this.worldTransform3d, this.vec3);
    
    if (this.parent.worldTransform3d)
        mat4.multiply(this.worldTransform3d, this.parent.worldTransform3d, this.worldTransform3d);
    else
    {
        this.vec3[0] = this.parent.worldTransform.a;
        this.vec3[1] = this.parent.worldTransform.d;
        this.vec3[2] = 1;
        mat4.scale(this.worldTransform3d, this.worldTransform3d, this.vec3);
        
        this.vec3[0] = this.parent.worldTransform.tx;
        this.vec3[1] = this.parent.worldTransform.ty;
        this.vec3[2] = 0;
        mat4.identity(this.mat4);
        mat4.translate(this.mat4, this.mat4, this.vec3);
        mat4.multiply(this.worldTransform3d, this.mat4, this.worldTransform3d);
    }
    
    this.containerUpdateTransform();
};
