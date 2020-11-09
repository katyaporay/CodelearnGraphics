import React from "react";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import SvgCharacter from "../ReactObjects/SvgCharacter";
import Parallelogram from "../GeometricalFigures/Parallelogram";
import {objectTypes} from "../../Models/ObjectTypes";
import BoardObject from "./BoardObject";

export default class Character extends BoardObject
{
    constructor(cx, cy, paused, hasCrown, anim, countSteps) {
        super();
        this.cx = cx;
        this.cy = cy;
        this.paused = paused;
        this.hasCrown = hasCrown;
        this.anim = anim;
        this.bearingArea = new Parallelogram(
            new Point(cx - Constants.legRx, cy + Constants.characterRy + Constants.legRy),
            Constants.legRx * 2,
            Constants.legRy,
            0,
        );
        this.countSteps = countSteps;
        console.log("from constructor: countSteps = " + countSteps);
        this.objectType = objectTypes.character;
        this.hasHeight = true;
    }

    hasOverlap(object)
    {
        return this.bearingArea.hasOverlap(object.bearingArea);
    }

    getReactComponent()
    {
        console.log("from getReactComponent: countSteps = " + this.countSteps);
        return <g>
                <SvgCharacter cx={this.cx} cy={this.cy} paused={this.paused}
                              hasCrown={this.hasCrown} anim={this.anim}
                              countSteps={this.countSteps}/>
            </g>;
    }
}
