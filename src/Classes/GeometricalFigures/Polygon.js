import Segment from "./Segment";
import Point from "./Point";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import SvgPolygon from "../SvgObjects/SvgPolygon";
import React from "react";
import Constants from "../../Models/Constants";
import Circle from "./Circle";
import Ellipse from "./Ellipse";

export default class Polygon
{
    constructor(points) {
        this.points = points;
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
            let j = (i + 1) % this.points.length;
            const segment = new Segment(this.points[i], this.points[j]);
            count += segment.hasOverlap(ray);
        }
        return count % 2 === 1;
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
        if (!this.hasOverlapWithPolygon(polygon)) return null;
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
    }

    getReactComponent()
    {
        let svgPoints = [];
        for (let i = 0; i < this.points.length; i++)
        {
            svgPoints.push(SvgFunctions.getSvgPoint(this.points[i].x, this.points[i].y));
        }
        const svgPolygon = new Polygon(svgPoints);
        return <SvgPolygon polygon={svgPolygon} fill="#A7A7D7"/>;
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
            dist = Math.min(dist, Constants.viewPoint.getDist(segment));
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
            const segment = new Segment(Constants.viewPoint, this.points[i]);
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
        return new Polygon([ Constants.viewPoint, minPoint, maxPoint ]);
    }

    getMinDistToPointOnSegment(segment)
    {
        let minDist = 1e9;
        for (let i = 0; i < this.points.length; i++)
        {
            const j = (i + 1) % this.points.length;
            const polygonSegment = new Segment(this.points[i], this.points[j]);
            if (!segment.hasOverlap(polygonSegment)) continue;
            const intersection = segment.getIntersection(polygonSegment);
            minDist = Math.min(minDist, intersection.getDist(segment.pointA));
        }
        return minDist;
    }
}
