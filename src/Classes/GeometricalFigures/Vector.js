import Point from "./Point";
import Constants from "../../Models/Constants";

export default class Vector
{
    constructor(beginPoint, endPoint) {
        this.point = new Point(
            endPoint.x - beginPoint.x,
            endPoint.y - beginPoint.y,
        );
    }

    realVectorProduct(vector)
    {
        return this.point.x * vector.point.y - vector.point.x * this.point.y;
    }

    vectorProduct(vector)
    {
        let vectorProduct = this.realVectorProduct(vector);
        if (Math.abs(vectorProduct) < Constants.eps)
            return 0;
        if (vectorProduct < 0)
            return -1;
        return 1;
    }

    scalarProduct(vector)
    {
        let scalarProduct = this.point.x * vector.point.x + this.point.y * vector.point.y;
        if (Math.abs(scalarProduct) < Constants.eps)
            return 0;
        if (scalarProduct < 0)
            return -1;
        return 1;
    }

    multiply(k)
    {
        return new Vector(
            new Point(0, 0),
            new Point(this.point.x * k, this.point.y * k),
        )
    }
}
