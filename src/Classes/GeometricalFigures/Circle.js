import Segment from "./Segment";
import Point from "./Point";
import {objectTypes} from "../../Models/Types";
import Constants from "../../Models/Constants";
import Polygon from "./Polygon";
import Ellipse from "./Ellipse";

export default class Circle
{
    constructor(cx, cy, r) {
        this.center = new Point(cx, cy);
        this.r = r;
    }

    getIntersection(figure)
    {
        if (figure.hasOwnProperty('polygon'))
        {
            figure = figure.polygon;
        }
        if (figure.constructor.name === Circle.name)
        {
            return this.getIntersectionWithCircle(figure);
        }
        if (figure.constructor.name === Polygon.name)
        {
            return this.getIntersectionWithPolygon(figure);
        }
        if (figure.constructor.name === Ellipse.name)
        {
            return figure.getIntersectionWithCircle(this);
        }
        return null;
    }

    hasOverlap(figure)
    {
        if (figure.hasOwnProperty('polygon'))
        {
            figure = figure.polygon;
        }
        if (figure.constructor.name === Circle.name)
        {
            return this.hasOverlapWithCircle(figure);
        }
        if (figure.constructor.name === Polygon.name)
        {
            return this.hasOverlapWithPolygon(figure);
        }
    }

    hasOverlapWithCircle(circle)
    {
        const dx = circle.center.x - this.center.x, dy = circle.center.y - this.center.y;
        const dd = dx * dx + dy * dy;
        const rr = (this.r + circle.r) * (this.r + circle.r);
        return (dd - rr < Constants.eps);
    }

    hasOverlapWithSegment(segment)
    {
        const x1 = segment.pointA.x, y1 = segment.pointA.y,
            x2 = segment.pointB.x, y2 = segment.pointB.y,
            cx = this.center.x, cy = this.center.y, r = this.r;
        const a = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        const b = 2 * ((x2 - x1) * (x1 - cx) + (y2 - y1) * (y1 - cy));
        const c = cx * cx + cy * cy + x1 * x1 + y1 * y1 - 2 * (cx * x1 + cy * y1) - r * r;

        if (-b < Constants.eps)
            return (c < Constants.eps);
        if (-b < (2 * a))
            return (4 * a * c - b * b < Constants.eps)
        return (a + b + c < Constants.eps);
    }

    getIntersectionsWithLine(line)
    {
        if (Math.abs(this.center.x * line.a + this.center.y * line.b + line.c) < Constants.eps &&
            (line.a * line.a + line.b * line.b) > Constants.eps)
        {
            const one = this.r * this.r / (line.a * line.a + line.b * line.b);
            const p1 = new Point(this.center.x + one * line.b, this.center.y - one * line.a);
            const p2 = new Point(this.center.x - one * line.b, this.center.y + one * line.a);
            return [p1, p2];
        }
        const line2 = this.center.getPerpendicularLine(line);
        const lineIntersection = line.getIntersection(line2);
        const d = this.center.getDistToLine(line);
        if (this.r < d)
        {
            return null;
        }
        const r = Math.sqrt(this.r * this.r - d * d);
        const circle = new Circle(lineIntersection.x, lineIntersection.y, r);
        return this.getIntersectionsWithCircle(circle);
    }

    getIntersectionWithSegment(segment)
    {
        const line = segment.getLine();
        const pp = this.getIntersectionsWithLine(line);
        if (pp == null)
        {
            return null;
        }
        const [p1, p2] = pp;
        if (p1.getDistToSegment(segment) < Constants.eps)
            return p1;
        if (p2.getDistToSegment(segment) < Constants.eps)
        {
            return p2;
        }
        return null;
    }

    hasOverlapWithPolygon(polygon)
    {
        for (let i = 0; i < polygon.points.length; i++)
        {
            const j = (i + 1) % polygon.points.length;
            const segment = new Segment(polygon.points[i], polygon.points[j]);
            if (this.hasOverlapWithSegment(segment)) return true;
        }
        return (polygon.checkHas(this.center));
    }

    getIntersectionWithPolygon(polygon)
    {
        for (let i = 0; i < polygon.points.length; i++)
        {
            const j = (i + 1) % polygon.points.length;
            const segment = new Segment(polygon.points[i], polygon.points[j]);
            if (this.hasOverlapWithSegment(segment)) {
                return this.getIntersectionWithSegment(segment);
            }
        }
        return null;
    }

    getY(objectType)
    {
        const minY = this.center.y - this.r, maxY = this.center.y + this.r;
        if (objectType === objectTypes.lying)
            return [maxY, maxY];
        return [minY, maxY];
    }

    getX(y)
    {
        const dx = Math.sqrt(this.r * this.r - (y - this.center.y) * (y - this.center.y));
        const minX = this.center.x - dx, maxX = this.center.x + dx;
        return [minX, maxX];
    }

    getMaxDist()
    {
        return Constants.viewPoint().getDist(this.center) + this.r;
    }

    getMinDist()
    {
        return Constants.viewPoint().getDist(this.center) - this.r;
    }

    getIntersectionWithCircle(circle)
    {
        if (this.hasOverlapWithCircle(circle)) return null;
        return this.getIntersectionsWithCircle(circle)[0];
    }

    getIntersectionsWithCircle(circle)
    {
        if (!this.hasOverlapWithCircle(circle)) return null;
        const d = this.center.getDist(circle.center);
        const a = (this.r * this.r - circle.r * circle.r + d * d) / (2 * d);
        const h = Math.sqrt(this.r * this.r - a * a);
        const x3 = this.center.x + a / d * (circle.center.x - this.center.x);
        const y3 = this.center.y + a / d * (circle.center.y - this.center.y);
        const p1 = new Point(
            x3 + h / d * (circle.center.y - this.center.y),
            y3 - h / d * (circle.center.x - this.center.x),
        );
        const p2 = new Point(
            x3 - h / d * (circle.center.y - this.center.y),
            y3 + h / d * (circle.center.x - this.center.x),
        );
        return [p1, p2];
    }

    getVisibilityLimits()
    {
        const circle = new Circle(
            (Constants.viewPoint().x + this.center.x) / 2,
            (Constants.viewPoint().y + this.center.y) / 2,
            this.center.getDist(Constants.viewPoint()) / 2,
        );
        return this.getIntersection(circle);
    }

    getMinDistToPointOnSegment(segment)
    {
        let line = segment.getLine();
        line.c += this.center.y * line.b;
        if (line.b !== 0)
            line.c += this.center.x * line.a ;
        const x0 = -line.a * line.c / (line.a * line.a + line.b * line.b);
        const y0 = -line.b * line.c / (line.a * line.a + line.b * line.b);
        const d = this.r * this.r - line.c * line.c/(line.a * line.a + line.b * line.b);
        const mult = Math.sqrt(d / (line.a * line.a + line.b * line.b));
        const p1 = new Point(x0 + line.b * mult, x0 - line.b * mult);
        const p2 = new Point(y0 - line.a * mult, y0 + line.a * mult);
        p1.x += this.center.x; p1.y += this.center.y;
        p2.x += this.center.x; p2.y += this.center.y;
        return (p1.getDist(segment.pointA) + p2.getDist(segment.pointA)) / 2;
    }
}
