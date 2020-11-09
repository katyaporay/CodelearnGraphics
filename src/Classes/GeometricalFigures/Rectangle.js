import Segment from './Segment';

export default class Rectangle
{
    constructor(pointMin, pointMax) {
        this.pointMin = pointMin;
        this.pointMax = pointMax;
        this.segmentX = new Segment(this.pointMin.x, this.pointMax.x);
        this.segmentY = new Segment(this.pointMin.y, this.pointMax.y);
    }

    hasOverlap(rectangle2)
    {
        return (this.segmentX.hasOverlap(rectangle2.segmentX) && this.segmentY.hasOverlap(rectangle2.segmentY));
    }
}
