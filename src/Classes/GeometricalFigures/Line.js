import Point from "./Point";

export default class Line
{
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getIntersection(line)
    {
        if (this.a * line.b === line.a * this.b)
            return null;
        const x = (line.c * this.b - this.c * line.b) / (this.a * line.b - line.a * this.b);
        const y = (line.c * this.a - this.c * line.a) / (this.b * line.a - line.b * this.a);
        return new Point(x, y);
    }
}
