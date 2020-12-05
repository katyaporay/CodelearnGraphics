import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import {objectTypes} from "../../Models/Types";
import Rectangle from "../GeometricalFigures/Rectangle";
import SvgNpc from "../SvgObjects/Heros/SvgNpc";
import React from "react";
import SvgFunctions from "../SvgObjects/SvgFunctions";
import Ellipse from "../GeometricalFigures/Ellipse";
import Dialog from "../ObjectsToLink/Dialog";
import BoardObject from "./BoardObject";

export default class Npc extends BoardObject
{
    constructor(cx, cy) {
        super();
        this.center = new Point(cx, cy);
        this.anim = null;
        this.linkedObjects = [new Dialog("", Npc.name)];
        this.height = Constants.npcLegRy + Constants.npcR * 2;
        this.objectType = objectTypes.npc;
        this.bearingArea = this.getBearingArea();
    }

    getBearingArea()
    {
        const pointMin = new Point(this.center.x - Constants.npcR,
            this.center.y - Constants.npcR);
        const pointMax = new Point(this.center.x + Constants.npcR,
            this.center.y + Constants.npcR);
        return new Rectangle(pointMin, pointMax);
    }

    getReactComponent()
    {
        return <SvgNpc cx={this.center.x} cy={this.center.y} anim={this.anim}
                       linkedObjects={this.linkedObjects}/>
    }


    getProjection()
    {
        const scale = SvgFunctions.getScale(this.center.x, this.center.y, this.height);
        const bottomPoint = SvgFunctions.getSvgPoint(this.center.x, this.center.y);
        const body = new Ellipse(bottomPoint.x,
            bottomPoint.y - (Constants.npcLegRy + Constants.npcR) * scale,
            Constants.npcR * scale, Constants.npcR * scale);
        const leg = new Ellipse(bottomPoint.x, bottomPoint.y - Constants.legRy * scale,
            Constants.npcLegRx * scale, Constants.npcLegRy * scale);
        return [body, leg];
    }
}
