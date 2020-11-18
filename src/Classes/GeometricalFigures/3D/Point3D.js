import Point from "../Point";

export default class Point3D
{
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getPoint2D()
    {
        return new Point(this.x, this.z);
    }
}
