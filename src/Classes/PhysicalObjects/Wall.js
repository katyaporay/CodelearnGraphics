import BoardObject from "./BoardObject";
import React from "react";
import SvgWall from "../SvgObjects/SvgWall";
import {objectTypes} from "../../Models/Types";
import Point from "../GeometricalFigures/Point";
import Segment from "../GeometricalFigures/Segment";
import Constants from "../../Models/Constants";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Polygon from "../GeometricalFigures/Polygon";
import Cube from "../GeometricalFigures/3D/Cube";
import Rectangle from "../GeometricalFigures/Rectangle";

export default class Wall extends BoardObject
{
    constructor(minX, minY, maxX, maxY, height) {
        super();
        this.height = height;
        this.bearingArea = new Rectangle(new Point(minX, minY), new Point(maxX, maxY));
        this.objectType = objectTypes.barrier;
    }

    getDist()
    {
        const y = this.bearingArea.pointMin.y, x1 = this.bearingArea.pointMin.x,
            x2 = this.bearingArea.pointMax.x;
        const segment = new Segment(new Point(x1, y), new Point(x2, y));
        return Constants.viewPoint().getDist(segment);
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
        const cube = new Cube(this.bearingArea, this.height);
        return cube.getProjection();
    }
}
