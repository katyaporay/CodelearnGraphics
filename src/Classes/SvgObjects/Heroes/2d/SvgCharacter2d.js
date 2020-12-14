import React from "react";
import TweenOne, {TweenOneGroup} from "rc-tween-one";
import Animations from "../../../../Models/Animations";
import Constants from "../../../../Models/Constants";
import SvgFunctions from "../../SvgFunctions";
import Point from "../../../GeometricalFigures/Point";
import SvgPolygon from "../../SvgPolygon";
import Leg2d from "./Leg2d";
import {Eye} from "../Eye";

export default class SvgCharacter2d extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLeft: false,
        }
    }

    render() {
        const fill = "#af00ff", stroke = "#6900ff";
        const centerPoint = SvgFunctions.getSvgPoint(this.props.cx, this.props.cy);
        const cx = centerPoint.x, cy = centerPoint.y;
        if (this.props.anim !== null && this.props.anim.y === 0)
        {
            if (this.props.anim.x > 0 && !this.state.isLeft)
            {
                this.setState({
                    isLeft: true,
                })
            }
            if (this.props.anim.x < 0 && this.state.isLeft)
            {
                this.setState({
                    isLeft: false,
                })
            }
        }
        const transformOrigin = "" + cx + "px " + cy + "px";
        const scale = SvgFunctions.getScale(this.props.cx, this.props.cy,
            Constants.legRy + Constants.characterRy * 2);
        const k = document.documentElement.clientWidth / Constants.fWidth;
        const characterRx = Constants.characterRx, characterRy = Constants.characterRy,
            legRy = Constants.legRy;
        console.log("SvgCharacter2d: scale = " + scale);
        const innerPoint = new Point(cx - characterRx, cy);
        return (
            <g>
                <TweenOne component="g" animation={this.props.anim != null ? this.props.anim :
                    {duration: 0, scale: 1, opacity: 1, x: 0, y: 0}}
                          style={{transformOrigin: transformOrigin}}>
                    <g style={{transformOrigin: transformOrigin}}
                       transform={"scale(" + scale + ")"}>

                        <Leg2d x={cx} y={cy}
                               fill={fill} stroke={stroke}
                               durationStep={this.props.durationStep}
                               countSteps={this.props.countSteps}
                               rx={Constants.legRx} ry={characterRx}
                        />
                        <circle cx={cx}
                             cy={cy}
                             r={characterRx} fill={fill}
                             stroke={stroke}
                             strokeWidth="3"/>
                        <Eye x={cx}
                             y={cy}
                             isLeft={this.state.isLeft}
                             isBackLeg={false}
                        />
                        {this.props.linkedObjects.map(object =>
                            object.getReactComponent(innerPoint.x, innerPoint.y, scale))}
                    </g>
                </TweenOne>
            </g>
        )
    }
}
