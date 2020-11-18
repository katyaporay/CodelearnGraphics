import Point from "./Point";

export default class Vector
{
    constructor(beginPoint, endPoint) {
        this.point = new Point(
            endPoint.x - beginPoint.x,
            endPoint.y - beginPoint.y,
        );
    }

    vectorProduct(vector)
    {
        let vectorProduct = this.point.x * vector.point.y - vector.point.x * this.point.y;
        if (vectorProduct < 0)
            return -1;
        if (vectorProduct > 0)
            return 1;
        return 0;
    }

    scalarProduct(vector)
    {
        let scalarProduct = this.point.x * vector.point.x + this.point.y * vector.point.y;
        if (scalarProduct < 0)
            return -1;
        if (scalarProduct > 0)
            return 1;
        return 0;
    }

    multiply(k)
    {
        return new Vector(
            new Point(0, 0),
            new Point(this.point.x * k, this.point.y * k),
        )
    }
}
