import React from "react";
import Leg2d from "./Leg2d";
import Constants from "../../../../Models/Constants";
import SvgFunctions from "../../SvgFunctions";
import {Eye} from "../Eye";
import Point from "../../../GeometricalFigures/Point";

export default class SvgNpc2d extends React.Component
{
    render() {
        const fill = "#57f771", stroke = "#31d422";
        const centerPoint = SvgFunctions.getSvgPoint(this.props.cx, this.props.cy);
        const cx = centerPoint.x, cy = centerPoint.y;
        const scale = SvgFunctions.getScale(this.props.cx, this.props.cy,
            Constants.npcLegRy + Constants.npcR * 2);
        const transformOrigin = "" + cx + "px " + cy + "px";
        const innerPoint = new Point(cx - Constants.npcR, cy);
        return (
            <g style={{transformOrigin: transformOrigin}}
                       transform={"scale(" + scale + ")"}>
                <Leg2d x={cx} y={cy} fill={fill} stroke={stroke}
                       durationStep={0} countSteps={0}
                       rx={Constants.npcLegRx} ry={Constants.npcR}/>
                <circle cx={cx} cy={cy}
                        r={Constants.npcR} fill={fill}
                        strokeWidth="3" stroke={stroke}/>
                <Eye x={cx}
                     y={cy}
                     isLeft={true}
                     isBackLeg={false}/>
                {this.props.linkedObjects.map(object =>
                    object.getReactComponent(innerPoint.x, innerPoint.y, scale))}
            </g>
        );
    }
}
