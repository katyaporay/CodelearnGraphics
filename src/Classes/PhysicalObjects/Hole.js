import Parallelogram from "../GeometricalFigures/Parallelogram";
import Point from "../GeometricalFigures/Point";
import BoardObject from "./BoardObject";
import React from "react";
import SvgHole from "../ReactObjects/SvgHole";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Hole extends BoardObject
{
    constructor(cx, cy, rx, ry) {
        super();
        this.state = {
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry,
        }
        this.bearingArea = new Parallelogram(
            this.getPointMin(),
            rx * 2,
            ry * 2,
            0,
        )
        this.objectType = objectTypes.death;
        this.hasHeight = false;
    }

    getPointMin()
    {
        let minX = this.state.cx - this.state.rx;
        let minY = this.state.cy + this.state.ry;
        return new Point(minX, minY);
    }

    getReactComponent()
    {
        return <SvgHole cx={this.state.cx} cy={this.state.cy}
                        rx={this.state.rx} ry={this.state.ry}/>;
    }
}
