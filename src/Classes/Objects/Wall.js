import React from "react";
import Object from "../Object";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Wall extends Object
{
    constructor(props) {
        super(props);
        this.objectType = objectTypes.barrier;
    }

    render() {
        return(
            <rect x={this.capsule.pointMin.x} y={this.capsule.pointMin.y}
                  width={this.props.rx * 2} height={this.props.ry * 2}
                  fill="#C0C0C0" strokeWidth="3" stroke="#A0A0A0"
                  rx={10} ry={10}/>
        )
    }
}
