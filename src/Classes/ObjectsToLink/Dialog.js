import Constants from "../../Models/Constants";
import SvgDialog from "../SvgObjects/Heroes/SvgDialog";
import React from "react";
import Character from "../PhysicalObjects/Character";
import Npc from "../PhysicalObjects/Npc";

export default class Dialog
{
    constructor(text, className) {
        let legRy, rx, ry;
        if (className === Character.name) {
            legRy = Constants.characterRy;
            rx = Constants.characterRx;
            ry = Constants.characterRy;
        } else if (className === Npc.name) {
            legRy = Constants.npcLegRy;
            rx = ry = Constants.npcR;
        }
        this.margin = 10;
        this.text = text;
        this.localX = -(Constants.lineMaxLength - rx * 2) / 2;
        if (Constants.mode === "3d") {
            this.localY = -(legRy + ry * 2 + this.margin);
        }
        else
        {
            this.localY = -rx - 10;
        }
        this.padding = 2;
        this.height = 0;
        this.anim = {
            duration: 1000,
            type: "from",
            opacity: 0,
            onComplete: (() => {
                this.anim = null;
            })
        }
    }

    getPlusHeight()
    {
        return this.height + this.margin;
    }

    getWidth()
    {
        return Constants.lineMaxLength;
    }

    setHeight(height)
    {
        this.height = height;
    }

    getReactComponent(x, y)
    {
        return <SvgDialog x={x + this.localX} y={y + this.localY} text={this.text}
                          padding={this.padding}
                          width={this.getWidth()} anim={this.anim}
                          setHeight={(height) => this.setHeight(height)}/>;
    }
}
