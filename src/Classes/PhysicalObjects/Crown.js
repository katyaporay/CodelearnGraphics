import Parallelogram from "../GeometricalFigures/Parallelogram";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import BoardObject from "./BoardObject";
import SvgCrown from "../SvgObjects/SvgCrown";
import React from "react";
import {objectTypes} from "../../Models/Types";
import Circle from "../GeometricalFigures/Circle";
import Polygon from "../GeometricalFigures/Polygon";
import Ellipse from "../GeometricalFigures/Ellipse";
import SvgFunctions from "../SvgObjects/SvgFunctions";

class Crown extends BoardObject
{
    constructor(cx, cy) {
        super();
        this.state = {
            cx: cx,
            cy: cy,
        }
        this.bearingArea = this.getBearingArea();
        this.objectType = objectTypes.lying;
        this.height = Constants.crownHeight;
    }

    getBearingArea()
    {
        return new Circle(this.state.cx, this.state.cy, Constants.crownR);
    }

    getDist()
    {
        return this.bearingArea.getMinDist();
    }

    getMaxDist(point)
    {
        return this.bearingArea.center.getDist(point) + this.bearingArea.r;
    }

    doesOverlapView(figure)
    {
        const [p1, p2] = this.bearingArea.getVisibilityLimits();
        const polygon = new Polygon([ Constants.viewPoint(), p1, p2 ]);
        if (!polygon.hasOverlap(figure))
            return false;
        if (figure.hasOwnProperty('polygon'))
        {
            figure = figure.polygon;
        }
        const maxDist = figure.getMaxDist(this.bearingArea.center);
        return maxDist > this.bearingArea.r;
    }

    getReactComponent()
    {
        return <SvgCrown cx={this.state.cx} cy={this.state.cy}/>;
    }

    getProjection()
    {
        const centerPoint = SvgFunctions.getSvgPoint(this.state.cx, this.state.cy);
        const circle = new Circle(this.state.cx, this.state.cy, Constants.crownR);
        const rx = SvgFunctions.getEllipseRx(circle), ry = SvgFunctions.getEllipseRy(circle);
        const main = new Ellipse(centerPoint.x, centerPoint.y, rx, ry);
        let points = this.getTriangles(centerPoint.x, centerPoint.y, rx, ry);
        const polygon = new Polygon(points);
        return [main, polygon];
    }

    getTriangle(i, cx, cy, rx, ry)
    {
        const k = document.documentElement.clientWidth / Constants.fWidth;
        const count = Constants.crownCount, width = rx / count;
        const up = k * Constants.crownUp;
        let up1 = i;
        if (up1 > count / 2)
        {
            up1 = count - 1 - i;
        }
        let up2 = i + 1;
        if (up2 > count / 2)
        {
            up2 = count - up2;
        }
        return [
            new Point(cx - rx + (i * 2 + 1) * width,
            cy - ry - Constants.crownHeight * k - up1 * up),
            new Point(cx - rx + (i * 2 + 2) * width,
                cy - up2 * up)
        ];
    }

    getTriangles(cx, cy, rx, ry)
    {
        let points = [new Point(cx - rx, cy)];
        for (let i = 0; i < Constants.crownCount; i++)
        {
            points = points.concat(this.getTriangle(i, cx, cy, rx, ry));
        }
        return points;
    }
}
