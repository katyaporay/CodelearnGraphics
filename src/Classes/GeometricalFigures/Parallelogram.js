import Segment from "./Segment";
import Constants from "../../Models/Constants";
import Polygon from "./Polygon";
import Point from "./Point";

export default class Parallelogram
{
    constructor(pointMin, width, height, cot = Constants.cot) {
        this.pointMin = pointMin;
        this.width = width;
        this.height = height;
        this.cot = cot;

        this.polygon = new Polygon(this.getPoints());

        this.segmentX = this.getSegmentX();
        this.segmentY = this.getSegmentY();
    }

    getPoints()
    {
        let x1 = this.pointMin.x, x2 = x1 + this.height * this.cot;
        let y1 = this.pointMin.y, y2 = y1 - this.height;
        let x3 = x1 + this.width, x4 = x2 + this.width;
        return (
            [new Point(x1, y1), new Point(x3, y1), new Point(x4, y2), new Point(x2, y2)]
        );
    }

    hasOverlap(polygon)
    {
        return this.polygon.hasOverlap(polygon);
    }

    getSegmentX()
    {
        let dx1 = this.height * this.cot, dy1 = this.height;
        let dy2 = this.pointMin.y;
        let dx2 = dx1 / dy1 * dy2;
        let x1 = this.pointMin.x + dx2;
        let x2 = x1 + this.width;
        return new Segment(x1, x2);
    }

    getSegmentY()
    {
        let y1 = this.pointMin.y - this.height;
        let y2 = this.pointMin.y;
        return new Segment(y1, y2);
    }

    /*hasOverlap(parallelogram)
    {
        console.log("Parallelogram-1:\n(" + this.pointMin.x + ", " + this.pointMin.y + ")\n" +
        this.width + "\n" + this.height + "\n" +
        "Parallelogram-2:\n(" + parallelogram.pointMin.x + ", " + parallelogram.pointMin.y + ")\n" +
        parallelogram.width + "\n" + parallelogram.height + "\n" +
        "return is " + (this.segmentX.hasOverlap(parallelogram.segmentX)
            && this.segmentY.hasOverlap(parallelogram.segmentY)));
        return (this.segmentX.hasOverlap(parallelogram.segmentX)
            && this.segmentY.hasOverlap(parallelogram.segmentY));
    }*/
}
