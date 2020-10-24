import React from "react";
import TweenOne from "rc-tween-one";
import Animations from "../../Models/Animations";
import Object from "../Object";
import Rectangle from "../Rectangle";
import Point from "../Point";
import {objectTypes} from "../../Models/ObjectTypes";
import Constants from "../../Models/Constants";

function Eye(props)
{
    let whiteX, blackX;
    if (props.isLeft)
    {
        whiteX = props.x - props.dx;
        blackX = props.x - props.dx / 4 * 5;
    }
    else
    {
        whiteX = props.x + props.dx;
        blackX = props.x + props.dx / 4 * 5;
    }
    return (
        <g>
            <circle cx={whiteX} cy={props.y} r="10" fill="#ffffff"/>
            <circle cx={blackX} cy={props.y} r="5" fill="#000000"/>
        </g>
    )
}

class Leg extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            rx: 11,
            ry: 25,
        }
    }

    render() {
        let animGo, x = this.props.x, y = this.props.y;
        if (this.props.isBackLeg)
        {
            animGo = Animations.animGoLeft;
            y -= 5;
            if (this.props.isLeft)
            {
                x -= 5;
            }
            else
            {
                x += 5;
            }
        }
        else
        {
            animGo = Animations.animGoRight;
        }
        //animGo[animGo.length - 1].onComplete = (() => animGo[0].moment = 0);
        return (
            <g>
                <TweenOne component="g" animation={this.props.paused ? null : animGo}
                style={{transformOrigin: x + "px " + (y - this.state.ry) + "px"}}
                paused={this.props.paused}
                >
                    <ellipse cx={x}
                             cy={y}
                             rx={this.state.rx}
                             ry={this.state.ry}
                             fill="#af00ff"
                             stroke="#6900ff"
                             strokeWidth="3"
                    />
                </TweenOne>
            </g>
        )
    }
}

export default class Character extends Object {
    constructor(props) {
        super(props);
        this.state = {
            rx: 30,
            ry: 40,
            anim: null,
        }
        this.capsule = new Rectangle(
            new Point(this.props.cx - this.state.rx, this.props.cy - this.state.ry),
            new Point(this.props.cx + this.state.rx, this.props.cy + this.state.ry)
        );
        this.objectType = objectTypes.character;
    }

    render() {
        return (

            <g>
                <TweenOne component="g" animation={this.props.anim}>
                    <g>
                        <Leg x={this.props.cx}
                             y={this.props.cy + this.state.ry}
                             paused={this.props.paused}
                             isBackLeg={true}
                             isLeft={this.props.isLeft}
                        />
                        <ellipse cx={this.props.cx}
                             cy={this.props.cy}
                             rx={this.state.rx}
                             ry={this.state.ry}
                             fill="#af00ff"
                             stroke="#6900ff"
                             strokeWidth="3"/>
                        <Leg x={this.props.cx}
                             y={this.props.cy + this.state.ry}
                             paused={this.props.paused}
                             isLeft={this.props.isLeft}
                        />
                        <Eye x={this.props.cx}
                             y={this.props.cy - this.state.ry / 2}
                             dx={this.state.rx / 2}
                             isLeft={this.props.isLeft}
                             isBackLeg={false}
                        />
                    </g>
                </TweenOne>
            </g>
        )
    }
}
