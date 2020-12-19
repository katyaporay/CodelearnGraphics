import Segment from "./Segment";
import Point from "./Point";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import SvgPolygon from "../SvgObjects/SvgPolygon";
import React from "react";
import Constants from "../../Models/Constants";
import Circle from "./Circle";
import Ellipse from "./Ellipse";
import Vector from "./Vector";

export default class Polygon
{
    constructor(points) {
        this.points = points;
    }

    getArea()
    {
        /*let vector1, vector2;
        let area = 0;
        for (let i = 1; i + 1 < this.points.length; i++)
        {
            vector1 = new Vector(this.points[0], this.points[i]);
            vector2 = new Vector(this.points[0], this.points[i + 1]);
            area += vector1.vectorProduct(vector2);
        }
        return Math.abs(area);*/
        return this.getAreaFromPoint(this.points[0])
    }

    getAreaFromPoint(point)
    {
        let vector1, vector2;
        let area = 0;
        for (let i = 0; i < this.points.length; i++)
        {
            const j = (i + 1) % this.points.length;
            vector1 = new Vector(point, this.points[i]);
            vector2 = new Vector(point, this.points[j]);
            area += vector1.realVectorProduct(vector2);
        }
        return Math.abs(area);
    }

    checkHas(point)
    {
        const ray = new Segment(
            point,
            new Point(-1e9, point.y),
        );
        let count = 0;
        for (let i = 0; i < this.points.length; i++)
        {
            let j = (i + 1) % this.points.length, k = (j + 1) % this.points.length;
            const segment = new Segment(this.points[i], this.points[j]);
            count += segment.hasOverlap(ray);
            const middleSegment = new Segment(this.points[i], this.points[k]);
            count -= (ray.hasPoint(this.points[j]) && middleSegment.hasOverlap(ray));
        }
        return count % 2 === 1;
        /*const area1 = this.getArea(), area2 = this.getAreaFromPoint(point);
        return (Math.abs(area1 - area2) < Constants.eps);*/
    }

    hasOverlap(figure)
    {
        if (figure.hasOwnProperty('polygon'))
            figure = figure.polygon;
        if (figure.constructor.name === Polygon.name)
        {
            return this.hasOverlapWithPolygon(figure);
        }
        if (figure.constructor.name === Circle.name)
        {
            return figure.hasOverlapWithPolygon(this);
        }
        if (figure.constructor.name === Ellipse.name)
        {
            return (figure.getIntersectionWithPolygon(this) !== null);
        }
        return false;
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
            return figure.getIntersectionWithPolygon(this);
        }
        if (figure.constructor.name === Ellipse.name)
        {
            return figure.getIntersectionWithPolygon(this);
        }
        return null;
    }

    hasOverlapWithPolygon(polygon)
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

    getIntersectionWithPolygon(polygon)
    {
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
                if (segment1.hasOverlap(segment2))
                {
                    return segment1.getIntersection(segment2);
                }
            }
        }
        if (this.checkHas(polygon.points[0])) return polygon.points[0];
        if (polygon.checkHas(this.points[0])) return this.points[0];
        return null;
    }

    getReactComponent(fill="#A7A7D7")
    {
        let svgPoints = [];
        for (let i = 0; i < this.points.length; i++)
        {
            svgPoints.push(SvgFunctions.getSvgPoint(this.points[i].x, this.points[i].y));
        }
        const svgPolygon = new Polygon(svgPoints);
        return <SvgPolygon polygon={svgPolygon} fill={fill}/>;
    }

    getY()
    {
        let minY = this.points[0].y, maxY = this.points[0].y;
        for (let i = 0; i < this.points.length; i++)
        {
            const y = this.points[i].y;
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        return [minY, maxY];
    }

    getMinX()
    {
        let minX = this.points[0].x;
        for (let i = 0; i < this.points.length; i++)
        {
            minX = Math.min(minX, this.points[i].x);
        }
        return minX;
    }

    getMaxX()
    {
        let maxX = this.points[0].x;
        for (let i = 0; i < this.points.length; i++)
        {
            maxX = Math.max(maxX, this.points[i].x);
        }
        return maxX;
    }

    getX(y)
    {
        let minX = 1e9, maxX = -1e9;
        for (let i = 0; i < this.points.length; i++)
        {
            const j = (i + 1) % this.points.length;
            const y1 = Math.min(this.points[i].y, this.points[j].y);
            const y2 = Math.max(this.points[i].y, this.points[j].y);
            if (y1 <= y && y <= y2)
            {
                const segment = new Segment(this.points[i], this.points[j]);
                const x = this.getXOnSegment(segment, y);
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
            }
        }
        return [minX, maxX];
    }

    getXOnSegment(segment, y)
    {
        const dx1 = segment.pointA.x - segment.pointB.x,
            dy1 = segment.pointA.y - segment.pointB.y,
            dy2 = segment.pointA.y - y;
        let dx2 = dx1 / dy1 * dy2;
        if (dy1 === 0)
            dx2 = 0;
        return segment.pointA.x - dx2;
    }

    getMinDist()
    {
        let dist = 1e9;
        for (let i = 0; i < this.points.length; i++)
        {
            const j = (i + 1) % this.points.length;
            const segment = new Segment(this.points[i], this.points[j]);
            dist = Math.min(dist, Constants.viewPoint().getDist(segment));
        }
        return dist;
    }

    getMaxDist(point)
    {
        let dist = -1e9;
        for (let i = 0; i < this.points.length; i++)
        {
            dist = Math.max(dist, point.getDist(this.points[i]));
        }
        return dist;
    }

    getOverviewFigure()
    {
        let min = 1e9, max = -1e9, minPoint, maxPoint;
        for (let i = 0; i < this.points.length; i++)
        {
            const segment = new Segment(Constants.viewPoint(), this.points[i]);
            const line = segment.getLine();
            if (line.b === 0) continue;
            if (-line.c / line.b < min)
            {
                min = -line.c / line.b;
                minPoint = this.points[i];
            }
            if (-line.c / line.b > max)
            {
                max = -line.c / line.b;
                maxPoint = this.points[i];
            }
        }
        return new Polygon([ Constants.viewPoint(), minPoint, maxPoint ]);
    }

    getMinDistToPointOnSegment(segment)
    {
        let minDist = 1e9;
        let maxDist = -1e9;
        for (let i = 0; i < this.points.length; i++)
        {
            const j = (i + 1) % this.points.length;
            const polygonSegment = new Segment(this.points[i], this.points[j]);
            if (!segment.hasOverlap(polygonSegment)) continue;
            const intersection = segment.getIntersection(polygonSegment);
            const dist = intersection.getDist(segment.pointA);
            minDist = Math.min(minDist, dist);
            maxDist = Math.max(maxDist, dist)
        }
        return (minDist + maxDist) / 2;
    }
}
