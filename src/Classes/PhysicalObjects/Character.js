import React from "react";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import SvgCharacter from "../SvgObjects/Heros/SvgCharacter";
import {objectTypes} from "../../Models/Types";
import BoardObject from "./BoardObject";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Rectangle from "../GeometricalFigures/Rectangle";
import SvgPolygon from "../SvgObjects/SvgPolygon";
import Polygon from "../GeometricalFigures/Polygon";
import Ellipse from "../GeometricalFigures/Ellipse";

export default class Character extends BoardObject
{
    constructor(cx, cy, anim, countSteps, durationStep, linkedObjects) {
        super();
        this.center = new Point(cx, cy);
        this.anim = anim;
        this.bearingArea = this.getBearingArea();
        this.fallingArea = this.getFallingArea();
        this.countSteps = countSteps;
        this.durationStep = durationStep;
        this.objectType = objectTypes.character;
        this.height = Constants.characterRy * 2 + Constants.legRy;
        this.linkedObjects = linkedObjects;
    }

    setCenter(cx, cy)
    {
        this.center = new Point(cx, cy);
        this.bearingArea = this.getBearingArea();
        this.fallingArea = this.getFallingArea();
    }

    setAnim(anim, countSteps, durationStep)
    {
        this.anim = anim;
        this.countSteps = countSteps;
        this.durationStep = durationStep;
    }

    getFallingArea()
    {
        const pointMin = new Point(this.center.x - Constants.legRx,
                this.center.y - 3 * Constants.legWidth);
        const pointMax = new Point(this.center.x + Constants.legRx,
                this.center.y + Constants.legWidth);
        return new Rectangle(pointMin, pointMax);
    }

    getBearingArea()
    {
        const pointMin = new Point(this.center.x - Constants.characterRx,
                this.center.y - Constants.characterRx);
        const pointMax = new Point(this.center.x + Constants.characterRx,
                this.center.y + Constants.characterRx);
        return new Rectangle(pointMin, pointMax);
    }

    hasOverlap(object)
    {
        return this.bearingArea.hasOverlap(object.bearingArea);
    }

    doesOverlapView(figure)
    {
        return this.bearingArea.polygon.getOverviewFigure().hasOverlap(figure);
    }

    getDist()
    {
        return this.bearingArea.polygon.getMinDist();
    }

    getReactComponent()
    {
        console.log("from getReactComponent: countSteps = " + this.countSteps);
        return <g>
            <SvgCharacter cx={this.center.x} cy={this.center.y} anim={this.anim}
                          countSteps={this.countSteps} durationStep={this.durationStep}
                          linkedObjects={this.linkedObjects}/>
        </g>
    }

    getProjection()
    {
        const scale = SvgFunctions.getScale(this.center.x, this.center.y, this.height);
        const bottomPoint = SvgFunctions.getSvgPoint(this.center.x, this.center.y);
        const body = new Ellipse(bottomPoint.x,
            bottomPoint.y - (Constants.legRy + Constants.characterRy) * scale,
            Constants.characterRx * scale, Constants.characterRy * scale);
        const leg = new Ellipse(bottomPoint.x, bottomPoint.y - Constants.legRy * scale,
            Constants.legRx * scale, Constants.legRy * scale);
        return [body, leg];
    }
}
