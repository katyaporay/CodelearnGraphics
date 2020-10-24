import Segment from './Segment';

export default class Rectangle
{
    constructor(pointMin, pointMax) {
        this.pointMin = pointMin;
        this.pointMax = pointMax;
        this.segmentX = new Segment(this.pointMin.x, this.pointMax.x);
        this.segmentY = new Segment(this.pointMin.y, this.pointMax.y);
    }

    isCollide(rectangle2)
    {
        return (this.segmentX.isCollide(rectangle2.segmentX) && this.segmentY.isCollide(rectangle2.segmentY));
    }
}