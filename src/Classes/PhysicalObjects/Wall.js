import BoardObject from "./BoardObject";
import React from "react";
import SvgWall from "../SvgObjects/SvgWall";
import {objectTypes} from "../../Models/Types";
import Point from "../GeometricalFigures/Point";
import Segment from "../GeometricalFigures/Segment";
import Constants from "../../Models/Constants";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Polygon from "../GeometricalFigures/Polygon";

export default class Wall extends BoardObject
{
    constructor(bearingArea, height) {
        super();
        this.height = height;
        this.bearingArea = bearingArea;
        this.objectType = objectTypes.barrier;
    }

    getDist()
    {
        const y = this.bearingArea.pointMin.y, x1 = this.bearingArea.pointMin.x,
            x2 = this.bearingArea.pointMax.x;
        const segment = new Segment(new Point(x1, y), new Point(x2, y));
        return Constants.viewPoint.getDist(segment);
    }

    doesOverlapView(figure)
    {
        return this.bearingArea.polygon.getOverviewFigure().hasOverlap(figure);
    }

    getReactComponent()
    {
        return <SvgWall bearingArea={this.bearingArea} height={this.height}/>;
    }

    getProjection()
    {
        const x1 = this.bearingArea.pointMin.x, y1 = this.bearingArea.pointMin.y;
        const x2 = this.bearingArea.pointMax.x, y2 = this.bearingArea.pointMax.y;

        const [a1, b1, c1, d1] = this.getABCD(x1, y1, x2, y2);
        const [a2, b2, c2, d2] = this.getABCD(x1, y1, x2, y2, this.height);

        return this.getPolygons(a1, b1, c1, d1, a2, b2, c2, d2);
    }

    getABCD(x1, y1, x2, y2, height = 0)
    {
        const a = SvgFunctions.getSvgPoint(x1, y1, height);
        const b = SvgFunctions.getSvgPoint(x2, y1, height);
        const c = SvgFunctions.getSvgPoint(x2, y2, height);
        const d = SvgFunctions.getSvgPoint(x1, y2, height);
        return [a, b, c, d];
    }

    getPolygons(a1, b1, c1, d1, a2, b2, c2, d2)
    {
        return [
            new Polygon([c1, c2, d2, d1]),
            new Polygon([c1, b1, b2, c2]),
            new Polygon([a1, a2, d2, d1]),
            new Polygon([a2, b2, c2, d2]),
            new Polygon([a1, b1, c1, d1]),
            new Polygon([a1, b1, b2, a2]),
        ];
    }
}
