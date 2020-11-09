import Parallelogram from "../GeometricalFigures/Parallelogram";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import BoardObject from "./BoardObject";
import SvgCrown from "../ReactObjects/SvgCrown";
import React from "react";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Crown extends BoardObject
{
    constructor(cx, cy) {
        super();
        this.state = {
            cx: cx,
            cy: cy,
        }
        this.bearingArea = new Parallelogram(
            this.getPointMin(),
            Constants.crownRx * 2,
            Constants.crownRy * 2,
            0,
        )
        this.objectType = objectTypes.lying;
        this.hasHeight = false;
    }

    getPointMin()
    {
        let minX = this.state.cx - Constants.crownRx;
        let minY = this.state.cy + Constants.crownRy;
        console.log("Crown:\nminX = " + minX + "; minY = " + minY);
        return new Point(minX, minY);
    }

    getReactComponent()
    {
        return <SvgCrown cx={this.state.cx} cy={this.state.cy}/>;
    }
}
