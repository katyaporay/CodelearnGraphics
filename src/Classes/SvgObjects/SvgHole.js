import React from "react";
import {types} from "../../Models/Types";
import SvgFunctions from "./SvgFunctions";
import Point from "../GeometricalFigures/Point";
import Circle from "../GeometricalFigures/Circle";

export default class SvgHole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circle: new Circle(props.cx, props.cy, props.r),
        }
    }

    render() {
        const cx = SvgFunctions.cx(this.props), cy = SvgFunctions.cy(this.props),
            rx = SvgFunctions.getEllipseRx(this.state.circle),
            ry = SvgFunctions.getEllipseRy(this.state.circle);
        return (
            <g>
                <radialGradient id="grad">
                    <stop offset="20%" stopColor="#ffffff"/>
                    <stop offset="90%" stopColor="#000000"/>
                    <stop offset="100%" stopColor="#ffffff"/>
                </radialGradient>
                <ellipse cx={cx}
                         cy={cy}
                         rx={rx}
                         ry={ry}
                         fill="url(#grad)"
                />
            </g>
        );
    }
}
