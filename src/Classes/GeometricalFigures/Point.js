import Segment from "./Segment";
import Vector from "./Vector";
import Line from "./Line";

export default class Point
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDist(figure)
    {
        if (figure.constructor.name === Point.name)
        {
            return this.getDistToPoint(figure)
        }
        if (figure.constructor.name === Segment.name)
        {
            return this.getDistToSegment(figure);
        }
    }

    getDistToPoint(point)
    {
        const dx = this.x - point.x, dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getDistToSegment(segment)
    {
        const vector1 = new Vector(segment.pointA, this),
            vector2 = new Vector(segment.pointA, segment.pointB),
            vector3 = new Vector(segment.pointB, this),
            vector4 = new Vector(segment.pointB, segment.pointA);
        if (vector1.scalarProduct(vector2) <= 0 || vector3.scalarProduct(vector4) <= 0)
        {
            const distA = this.getDist(segment.pointA), distB = this.getDist(segment.pointB);
            return Math.min(distA, distB);
        }
        const line = segment.getLine();
        return this.getDistToLine(line);
    }

    getDistToLine(line)
    {
        return Math.abs((line.a * this.x + line.b * this.y + line.c) /
            Math.sqrt(line.a * line.a + line.b * line.b));
    }

    getPerpendicularLine(line)
    {
        const a = line.b, b = -line.a;
        const c = -(a * this.x + b * this.y);
        return new Line(a, b, c);
    }
}
