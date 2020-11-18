import React from "react";
import TweenOne, {TweenOneGroup} from "rc-tween-one";
import Animations from "../../../Models/Animations";
import Constants from "../../../Models/Constants";
import SvgFunctions from "../SvgFunctions";
import Point from "../../GeometricalFigures/Point";
import SvgPolygon from "../SvgPolygon";
import Leg from "./Leg";

function Eye(props)
{
    let whiteX, blackX;
    const k = window.innerWidth / Constants.fWidth;
    const dx = Constants.eyeRx;
    if (props.isLeft)
    {
        whiteX = props.x - dx / 3 * 2;
        blackX = props.x - dx / 7 * 6;
    }
    else
    {
        whiteX = props.x + dx / 3 * 2;
        blackX = props.x + dx / 7 * 6;
    }
    return (
        <g>
            <circle cx={whiteX} cy={props.y} r={dx} fill="#ffffff"/>
            <circle cx={blackX} cy={props.y} r={dx / 2} fill="#000000"/>
        </g>
    )
}

export default class SvgCharacter extends React.Component {
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
        const k = window.innerWidth / Constants.fWidth;
        const characterRx = Constants.characterRx, characterRy = Constants.characterRy,
            legRy = Constants.legRy;
        console.log("SvgCharacter: scale = " + scale);
        const innerPoint = new Point(cx - characterRx, cy);
        return (
            <g>
                <TweenOne component="g" animation={this.props.anim}
                          style={{transformOrigin: transformOrigin}}>
                    <g style={{transformOrigin: transformOrigin}}
                       transform={"scale(" + scale + ")"}>

                        <Leg x={cx} y={cy - legRy}
                             fill={fill} stroke={stroke}
                             isBackLeg={true}
                             isLeft={this.state.isLeft}
                             durationStep={this.props.durationStep}
                             countSteps={this.props.countSteps}
                             rx={Constants.legRx} ry={Constants.legRy}
                        />
                        <ellipse cx={cx}
                             cy={cy - legRy - characterRy}
                             rx={characterRx}
                             ry={characterRy}
                             fill={fill}
                             stroke={stroke}
                             strokeWidth="3"/>
                        <Leg x={cx} y={cy - legRy}
                             fill={fill} stroke={stroke}
                             isBackLeg={false}
                             isLeft={this.state.isLeft}
                             durationStep={this.props.durationStep}
                             countSteps={this.props.countSteps}
                             rx={Constants.legRx} ry={Constants.legRy}
                        />
                        <Eye x={cx}
                             y={cy - legRy - characterRy / 2 * 3}
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
