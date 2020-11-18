import React from "react";
import Leg from "./Leg";
import Constants from "../../../Models/Constants";
import SvgFunctions from "../SvgFunctions";

export default class SvgNpc extends React.Component
{
    render() {
        const fill = "#57f771", stroke = "#31d422";
        const centerPoint = SvgFunctions.getSvgPoint(this.props.cx, this.props.cy);
        const cx = centerPoint.x, cy = centerPoint.y;
        const scale = SvgFunctions.getScale(this.props.cx, this.props.cy,
            Constants.npcLegRy + Constants.npcR * 2);
        const transformOrigin = "" + cx + "px " + cy + "px";
        return (
            <g style={{transformOrigin: transformOrigin}}
                       transform={"scale(" + scale + ")"}>
                <Leg x={cx} y={cy - Constants.npcLegRy} fill={fill} stroke={stroke}
                     isBackLeg={true} isLeft={true} durationStep={0} countSteps={0}
                     rx={Constants.npcLehRx} ry={Constants.npcLegRy}/>
                <circle cx={cx} cy={cy - Constants.npcLegRy - Constants.npcR}
                        r={Constants.npcR} fill={fill}
                        strokeWidth="3" stroke={stroke}/>
                <Leg x={cx} y={cy - Constants.npcLegRy} fill={fill} stroke={stroke}
                     isBackLeg={false} isLeft={true} durationStep={0} countSteps={0}
                     rx={Constants.npcLehRx} ry={Constants.npcLegRy}/>
            </g>
        );
    }
}
