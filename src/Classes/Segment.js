export default class Segment
{
    constructor(cMin, cMax) {
        this.cMin = cMin;
        this.cMax = cMax;
    }

    isCollide(segment2)
    {
        return ((this.cMin <= segment2.cMin && this.cMax >= segment2.cMin) ||
            (this.cMin <= segment2.cMax && this.cMax >= segment2.cMax) ||
            (segment2.cMin <= this.cMin && segment2.cMax >= this.cMin))
    }
}
