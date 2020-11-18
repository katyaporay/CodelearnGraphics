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

    hasOverlap(figure)
    {
        return this.polygon.hasOverlap(figure);
    }
}
