import BoardObject from "./BoardObject";
import React from "react";
import ReactWall from "../ReactObjects/Wall/ReactWall";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Wall extends BoardObject
{
    constructor(bearingArea, height) {
        super();
        this.state = {
            bearingArea: bearingArea,
            height: height,
        }
        this.bearingArea = bearingArea;
        this.objectType = objectTypes.barrier;
        this.hasHeight = true;
    }

    getReactComponent()
    {
        return <ReactWall bearingArea={this.state.bearingArea} height={this.state.height}/>;
    }
}
