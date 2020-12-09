import React from "react";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import SvgCharacter from "../SvgObjects/Heroes/3d/SvgCharacter";
import {objectTypes} from "../../Models/Types";
import BoardObject from "./BoardObject";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Rectangle from "../GeometricalFigures/Rectangle";
import SvgPolygon from "../SvgObjects/SvgPolygon";
import Polygon from "../GeometricalFigures/Polygon";
import Ellipse from "../GeometricalFigures/Ellipse";
import Dialog from "../ObjectsToLink/Dialog";
import SvgCharacter2d from "../SvgObjects/Heroes/2d/SvgCharacter2d";
import Circle from "../GeometricalFigures/Circle";

export default class Character extends BoardObject
{
    constructor(cx, cy) {
        super();
        this._center = new Point(cx, cy);
        this.bearingArea = this.getBearingArea();
        this.fallingArea = this.getFallingArea();
        this.durationStep = 0;
        this.objectType = objectTypes.character;
        this.height = Constants.characterRy * 2 + Constants.legRy;
        this._linkedObjects = [new Dialog("", Character.name)];
        this._anim = null;
        this._countSteps = 0;
    }

    set anim(value) {
        this._anim = value;
    }

    set countSteps(value) {
        this._countSteps = value;
    }

    set linkedObjects(value) {
        this._linkedObjects = value;
    }

    set center(value) {
        this._center = value;
    }

    setCenter(cx, cy)
    {
        this._center = new Point(cx, cy);
        this.bearingArea = this.getBearingArea();
        this.fallingArea = this.getFallingArea();
    }

    setAnim(anim, countSteps, durationStep)
    {
        this._anim = anim;
        this._countSteps = countSteps;
        this.durationStep = durationStep;
    }

    getFallingArea()
    {
        /*const pointMin = new Point(this._center.x - Constants.legRx,
                this._center.y - 3 * Constants.legWidth);
        const pointMax = new Point(this._center.x + Constants.legRx,
                this._center.y + Constants.legWidth);
        return new Rectangle(pointMin, pointMax);*/
        return new Circle(this._center.x, this._center.y, Constants.legWidth);
    }

    getBearingArea()
    {
        /*const pointMin = new Point(this._center.x - Constants.characterRx,
                this._center.y - Constants.characterRx);
        const pointMax = new Point(this._center.x + Constants.characterRx,
                this._center.y + Constants.characterRx);
        return new Rectangle(pointMin, pointMax);*/
        return new Circle(this._center.x, this._center.y, Constants.characterRx);
    }

    hasOverlap(object)
    {
        return this.bearingArea.hasOverlap(object.bearingArea);
    }

    doesOverlapView(figure)
    {
        return this.bearingArea.getOverviewFigure().hasOverlap(figure);
    }

    getDist()
    {
        return this.bearingArea.getMinDist();
    }

    getReactComponent()
    {
        console.log("from getReactComponent: countSteps = " + this._countSteps);
        if (Constants.mode === "3d") {
            return <g>
                <SvgCharacter cx={this._center.x} cy={this._center.y} anim={this._anim}
                              countSteps={this._countSteps} durationStep={this.durationStep}
                              linkedObjects={this._linkedObjects}/>
            </g>
        }
        else
        {
            return <g>
                <SvgCharacter2d cx={this._center.x} cy={this._center.y} anim={this._anim}
                              countSteps={this._countSteps} durationStep={this.durationStep}
                              linkedObjects={this._linkedObjects}/>
            </g>
        }
    }

    getProjection()
    {
        const scale = SvgFunctions.getScale(this._center.x, this._center.y, this.height);
        const bottomPoint = SvgFunctions.getSvgPoint(this._center.x, this._center.y);
        const body = new Ellipse(bottomPoint.x,
            bottomPoint.y - (Constants.legRy + Constants.characterRy) * scale,
            Constants.characterRx * scale, Constants.characterRy * scale);
        const leg = new Ellipse(bottomPoint.x, bottomPoint.y - Constants.legRy * scale,
            Constants.legRx * scale, Constants.legRy * scale);
        return [body, leg];
    }

    clone()
    {
        return new Character(this._center.x, this._center.y);
    }
}
