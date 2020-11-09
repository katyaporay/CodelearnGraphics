import Vector from "./Vector";

export default class Segment
{
    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    hasOverlap(segment)
    {
        let vector1 = new Vector(segment.pointA, this.pointA);
        let vector2 = new Vector(segment.pointA, this.pointB);
        let vector = new Vector(segment.pointA, segment.pointB);
        if (vector.vectorProduct(vector1) * vector.vectorProduct(vector2) > 0)
            return 0;
        vector1 = new Vector(this.pointA, segment.pointA);
        vector2 = new Vector(this.pointA, segment.pointB);
        vector = new Vector(this.pointA, this.pointB);
        if (vector.vectorProduct(vector1) * vector.vectorProduct(vector2) > 0)
            return 0;
        /*if (vector.vectorProduct(vector1) === 0 && vector.vectorProduct(vector2) === 0)
            return 2;*/
        return 1;
        /*return ((this.cMin <= segment2.cMin && this.cMax >= segment2.cMin) ||
            (this.cMin <= segment2.cMax && this.cMax >= segment2.cMax) ||
            (segment2.cMin <= this.cMin && segment2.cMax >= this.cMin))*/
    }
}
