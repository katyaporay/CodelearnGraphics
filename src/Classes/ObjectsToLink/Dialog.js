import Constants from "../../Models/Constants";
import SvgDialog from "../SvgObjects/Heroes/SvgDialog";
import React from "react";
import Character from "../PhysicalObjects/Character";
import Npc from "../PhysicalObjects/Npc";

export default class Dialog
{
    constructor(text, className) {
        this.className = className;
        this.margin = 10;
        this.text = text;
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

    getLocalX()
    {
        let rx;
        if (this.className === Character.name) {
            rx = Constants.characterRx;
        } else if (this.className === Npc.name) {
            rx = Constants.npcR;
        }
        return -(Constants.lineMaxLength - rx * 2) / 2;
    }

    getLocalY()
    {
        let legRy, rx, ry;
        if (this.className === Character.name) {
            legRy = Constants.characterRy;
            rx = Constants.characterRx;
            ry = Constants.characterRy;
        } else if (this.className === Npc.name) {
            legRy = Constants.npcLegRy;
            rx = ry = Constants.npcR;
        }
        if (Constants.mode === "3d") {
            return -(legRy + ry * 2 + this.margin);
        }
        else
        {
            return -rx - 10;
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
        return <SvgDialog x={x + this.getLocalX()}
                          y={y + this.getLocalY()}
                          text={this.text}
                          padding={this.padding}
                          width={this.getWidth()} anim={this.anim}
                          setHeight={(height) => this.setHeight(height)}/>;
    }
}
