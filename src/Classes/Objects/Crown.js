import React from "react";
import TweenOne from "rc-tween-one";
import Object from "../Object";
import Animations from "../../Models/Animations";
import {objectTypes} from "../../Models/ObjectTypes";

export default class Crown extends Object {
    constructor(props) {
        super(props);
        const count = 5;
        const rx = 22;
        this.state = {
            rx: rx,
            ry: 8,
            height: 8,
            width: rx / count,
            count: count,
            up: 5,
        }
        this.objectType = objectTypes.lying;
    }

    getTriangle(i)
    {
        const count = this.state.count;
        let up1 = i;
        if (up1 > count / 2)
        {
            up1 = count - 1 - i;
        }
        let up2 = i + 1;
        if (up2 > count / 2)
        {
            up2 = count - up2;
        }
        return " L" + (this.props.cx - this.state.rx + (i * 2 + 1) * this.state.width) +
                ", " + (this.props.cy - this.state.ry - this.state.height - up1 * this.state.up) +

                " L" + (this.props.cx - this.state.rx + (i * 2 + 2) * this.state.width) +
                ", " + (this.props.cy - up2 * this.state.up);
    }

    getCrownTriangles()
    {
        let triangles = "";
        for (let i = 0; i < this.state.count; i++)
        {
            triangles += this.getTriangle(i) + " ";
        }
        return triangles;
    }

    render() {
        return (
            <g visibility={this.props.visibility}>
                <TweenOne component="g" animation={Animations.crownAnim}>
                    <g>
                        <ellipse cx={this.props.cx} cy={this.props.cy} rx={this.state.rx} ry={this.state.ry}
                                 fill="#FFF700" stroke="#FFDE00" strokeWidth="2"/>
                        <path d={"M" + (this.props.cx - this.state.rx) +
                            ", " + (this.props.cy) +
                            this.getCrownTriangles()}
                            stroke="#FFDE00" strokeWidth="3" fill="#FFF700"/>
                    </g>
                </TweenOne>
            </g>
        )
    }
}
