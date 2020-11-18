import Point from "./Point";
import Polygon from "./Polygon";
import Circle from "./Circle";
import React from "react";
import Constants from "../../Models/Constants";

export default class Ellipse
{
    constructor(cx, cy, rx, ry) {
        this.center = new Point(cx, cy);
        this.rx = rx;
        this.ry = ry;
    }

    getIntersection(figure)
    {
        if (figure.hasOwnProperty('polygon'))
            figure = figure.polygon;
        if (figure.constructor.name === Polygon.name)
        {
            return this.getIntersectionWithPolygon(figure);
        }
        if (figure.constructor.name === Circle.name)
        {
            return this.getIntersectionWithCircle(figure);
        }
        if (figure.constructor.name === Ellipse.name)
        {
            return this.getIntersectionWithEllipse(figure);
        }
        return null;
    }

    getIntersectionWithPolygon(polygon)
    {
        const k = this.ry / this.rx;
        let modifiedPoints = [];
        for (let i = 0; i < polygon.points.length; i++)
        {
            modifiedPoints.push(new Point(polygon.points[i].x * k, polygon.points[i].y));
        }
        const modifiedPolygon = new Polygon(modifiedPoints);
        const circle = new Circle(this.center.x * k, this.center.y, this.ry);
        const intersection = circle.getIntersection(modifiedPolygon);
        if (!intersection) return intersection;
        intersection.x /= k;
        return intersection;
    }

    getIntersectionWithCircle(circle)
    {
        /*const x0 = this.center.x - circle.center.x;
        const y0 = this.center.y - circle.center.y;
        const rx = this.rx, ry = this.ry, r = circle.r;
        const a = rx * rx - ry * ry - 2 * rx * rx * y0;
        const b = 2 * ry * ry * x0;
        const c = 2 * rx * rx * y0 * r * r + rx * rx * y0 * y0 - ry * ry * x0 * x0 -
            rx * rx * ry * ry - rx * rx * r * r;
        const d = Math.sqrt(b * b - 4 * a * c);
        const x1 = (-b + d) / (2 * a), x2 = (-b - d) / (2 * a);
        let x, y;
        if (r * r - x1 * x1 >= 0) {
            x = x1;
            y = Math.sqrt(r * r - x1 * x1);
        }
        else if (r * r - x2 * x2 >= 0){
            x = x2;
            y = Math.sqrt(r * r - x2 * x2);
        }
        else {
            return null;
        }
        x += circle.center.x;
        y += circle.center.y;
        return new Point(x, y);*/
        let l = this.center.x - this.rx, r = this.center.x + this.rx;
        const up = (circle.center.y < this.center.y);
        while (Math.abs(r - l) > Constants.eps)
        {
            const m1 = l + Math.abs(r - l) / 3, m2 = r - Math.abs(r - l) / 3;
            const dist1 = this.getPoint(m1, up).getDist(circle.center),
                dist2 = this.getPoint(m2, up).getDist(circle.center);
            if (dist1 < dist2)
            {
                r = m2;
            }
            else
            {
                l = m1;
            }
        }
        const x = (l + r) / 2;
        const point = this.getPoint(x, up);
        if (point.getDist(circle.center) > circle.r)
        {
            return null;
        }
        return point;
    }

    getPoint(x, up)
    {
        const x0 = this.center.x;
        const yy = (1 - ((x - x0) * (x - x0)) / (this.rx * this.rx)) * this.ry * this.ry;
        if (up)
        {
            return new Point(x, -Math.sqrt(yy) + this.center.y);
        }
        else
        {
            return new Point(x, Math.sqrt(yy) + this.center.y);
        }
    }

    getIntersectionWithEllipse(ellipse)
    {
        const k = ellipse.ry / ellipse.rx;
        const circle = new Circle(ellipse.center.x * k, ellipse.center.y, ellipse.ry);
        const ellipse2 = new Ellipse(this.center.x * k, this.center.y, this.rx * k, this.ry);
        const intersection = ellipse2.getIntersectionWithCircle(circle);
        if (!intersection) return intersection;
        intersection.x /= k;
        return intersection;
    }

    getReactComponent()
    {
        return <ellipse cx={this.center.x} cy={this.center.y} rx={this.rx} ry={this.ry}/>;
    }
}
