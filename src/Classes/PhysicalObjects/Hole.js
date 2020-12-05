import Point from "../GeometricalFigures/Point";
import BoardObject from "./BoardObject";
import React from "react";
import SvgHole from "../SvgObjects/SvgHole";
import {objectTypes} from "../../Models/Types";
import Circle from "../GeometricalFigures/Circle";
import Constants from "../../Models/Constants";
import Polygon from "../GeometricalFigures/Polygon";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Ellipse from "../GeometricalFigures/Ellipse";

export default class Hole extends BoardObject
{
    constructor(cx, cy, r) {
        super();
        this.state = {
            cx: cx,
            cy: cy,
            r: r,
        }
        this.deathArea = this.getDeathArea();
        this.bearingArea = this.getBearingArea();
        this.objectType = objectTypes.death;
        this.height = 0;
    }

    getDeathArea()
    {
        return new Circle(this.state.cx, this.state.cy, this.state.r / 3 * 2);
    }

    getBearingArea()
    {
        return new Circle(this.state.cx, this.state.cy, this.state.r / 2 * 3);
    }

    getPointMin()
    {
        let minX = this.state.cx - this.state.rx;
        let minY = this.state.cy + this.state.ry;
        return new Point(minX, minY);
    }

    getDist()
    {
        return this.bearingArea.getMaxDist();
    }

    doesOverlapView(figure)
    {
        const [p1, p2] = this.bearingArea.getVisibilityLimits();
        const polygon = new Polygon([ Constants.viewPoint(), p1, p2 ]);
        return polygon.hasOverlap(figure) || this.bearingArea.hasOverlap(figure);
    }

    hasOverlap(figure)
    {
        console.log("checking overlap...");
        return this.deathArea.hasOverlap(figure);
    }

    getReactComponent()
    {
        return <SvgHole cx={this.state.cx} cy={this.state.cy}
                        r={this.state.r}/>;
    }

    getProjection()
    {
        const centerPoint = SvgFunctions.getSvgPoint(this.state.cx, this.state.cy);
        const circle = new Circle(this.state.cx, this.state.cy, this.state.r);
        const rx = SvgFunctions.getEllipseRx(circle);
        const ry = SvgFunctions.getEllipseRy(circle);
        const ellipse = new Ellipse(centerPoint.x, centerPoint.y, rx, ry);
        return [ellipse];
    }
}
