import Segment from "./Segment";
import Point from "./Point";

export default class Polygon
{
    constructor(points) {
        this.points = points;
    }

    checkHas(point)
    {
        const ray = new Segment(
            point,
            new Point(0, point.y),
        );
        let count = 0;
        for (let i = 0; i < this.points.length; i++)
        {
            let j = (i + 1) % this.points.length;
            const segment = new Segment(this.points[i], this.points[j]);
            count += segment.hasOverlap(ray);
        }
        return count % 2 === 1;
    }

    hasOverlap(polygon)
    {
        console.log("checking overlap in polygon...");
        for (let i1 = 0; i1 < polygon.points.length; i1++)
        {
            let i2 = (i1 + 1) % polygon.points.length;
            const segment1 = new Segment(
                polygon.points[i1],
                polygon.points[i2],
            );
            for (let j1 = 0; j1 < this.points.length; j1++)
            {
                let j2 = (j1 + 1) % this.points.length;
                const segment2 = new Segment(
                    this.points[j1],
                    this.points[j2],
                );
                if (segment1.hasOverlap(segment2)) return true;
            }
        }
        if (this.checkHas(polygon.points[0])) return true;
        if (polygon.checkHas(this.points[0])) return true;
        return false;
    }
}
