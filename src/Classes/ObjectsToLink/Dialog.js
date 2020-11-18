import Constants from "../../Models/Constants";
import SvgDialog from "../SvgObjects/Heros/SvgDialog";
import React from "react";

export default class Dialog
{
    constructor(text) {
        this.text = text;
        this.localX = -(Constants.lineMaxLength - Constants.characterRx * 2) / 2;
        this.margin = 10;
        this.padding = 2;
        this.localY = -(Constants.legRy + Constants.characterRy * 2 + this.margin);
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
        //this.localY = -(Constants.legRy + Constants.characterRy * 2 + this.margin + height);
    }

    getReactComponent(x, y, scale)
    {
        return <SvgDialog x={x + this.localX} y={y + this.localY} text={this.text}
                          padding={this.padding}
                          width={this.getWidth()} scale={scale} anim={this.anim}
                          setHeight={(height) => this.setHeight(height)}/>;
    }
}
