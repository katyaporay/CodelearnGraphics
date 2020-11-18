import Point from "./Point";
import Polygon from "./Polygon";

export default class Rectangle
{
    constructor(pointMin, pointMax) {
        this.pointMin = pointMin;
        this.pointMax = pointMax;

        this.polygon = new Polygon(this.getPoints());
    }

    getPoints()
    {
        const minX = this.pointMin.x, minY = this.pointMin.y;
        const maxX = this.pointMax.x, maxY = this.pointMax.y;
        return [
            new Point(minX, minY),
            new Point(minX, maxY),
            new Point(maxX, maxY),
            new Point(maxX, minY),
        ];
    }

    hasOverlap(figure)
    {
        return (this.polygon.hasOverlap(figure));
    }

    getY()
    {
        return this.polygon.getY();
    }

    getX(y)
    {
        return this.polygon.getX(y);
    }

    getMinDistToPointOnSegment(segment)
    {
        return this.polygon.getMinDistToPointOnSegment(segment);
    }
}
