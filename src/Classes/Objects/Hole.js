import React from "react";
import Object from "../Object";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Hole extends Object {
    constructor(props) {
        super(props);
        this.objectType = objectTypes.death;
    }

    render() {
        return (
            <g>
                <radialGradient id="grad">
                    <stop offset="20%" stopColor="#ffffff"/>
                    <stop offset="90%" stopColor="#000000"/>
                    <stop offset="100%" stopColor="#ffffff"/>
                </radialGradient>
                <ellipse cx={this.props.cx}
                         cy={this.props.cy}
                         rx={this.props.rx}
                         ry={this.props.ry}
                         fill="url(#grad)"
                />
            </g>
        );
    }
}
