import Vector from "./Vector";
import Line from "./Line";
import Point from "./Point";
import Constants from "../../Models/Constants";

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
        const p1 = vector.vectorProduct(vector1), p2 = vector.vectorProduct(vector2);

        vector1 = new Vector(this.pointA, segment.pointA);
        vector2 = new Vector(this.pointA, segment.pointB);
        vector = new Vector(this.pointA, this.pointB);
        const q1 = vector.vectorProduct(vector1), q2 = vector.vectorProduct(vector2);

        if (p1 * p2 < 0 && q1 * q2 < 0)
        {
            return 1;
        }
        if (this.hasPoint(segment.pointA) || this.hasPoint(segment.pointB) ||
            segment.hasPoint(this.pointA) || segment.hasPoint(this.pointB))
        {
            if (p1 === 0 && p2 === 0 && q1 === 0 && q2 === 0)
            {
                return 2;
            }
            return 1;
        }
        return 0;
        /*return ((this.cMin <= segment2.cMin && this.cMax >= segment2.cMin) ||
            (this.cMin <= segment2.cMax && this.cMax >= segment2.cMax) ||
            (segment2.cMin <= this.cMin && segment2.cMax >= this.cMin))*/
    }

    hasPoint(point)
    {
        let vector1 = new Vector(this.pointA, this.pointB);
        let vector2 = new Vector(this.pointA, point);
        if (Math.abs(vector1.vectorProduct(vector2)) > Constants.eps) return false;

        vector1 = new Vector(point, this.pointA);
        vector2 = new Vector(point, this.pointB);
        return (vector1.scalarProduct(vector2) <= 0);
    }

    getIntersection(segment)
    {
        const line1 = this.getLine();
        const line2 = segment.getLine();
        const intersection = line1.getIntersection(line2);
        if (intersection) return intersection;
        return new Point(
            Math.max(Math.min(this.pointA.x, this.pointB.x),
                Math.min(segment.pointA.x, segment.pointB.x)),
            Math.max(Math.min(this.pointA.y, this.pointB.y),
                Math.min(segment.pointA.y, segment.pointB.y)),
        );
    }

    getLine()
    {
        const x1 = this.pointA.x, y1 = this.pointA.y, x2 = this.pointB.x, y2 = this.pointB.y;
        const a = y1 - y2, b = x2 - x1, c = x1 * y2 - x2 * y1;
        return new Line(a, b, c);
    }
}
