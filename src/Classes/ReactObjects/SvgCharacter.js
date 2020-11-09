import React from "react";
import TweenOne from "rc-tween-one";
import Animations from "../../Models/Animations";
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
        let animGo;
        if (this.props.isBackLeg)
        {
            animGo = Animations.animGoLeft;
        }
        else
        {
            animGo = Animations.animGoRight;
        }
        /*animGo[0].onStart = () =>
        {
            console.log("moment: 0");
            this.setState({
                moment: null,
        }, () => {
                console.log("moment: null");
                this.setState({
                    moment: 0,
                });
        })};*/
        /*animGo[animGo.length - 1].onComplete = (() =>
        this.setState({
            moment: null,
        }));*/
        //animGo.onComplete = (() => this.finishAnim());
        this.state = {
            rx: Constants.legRx,
            ry: Constants.legRy,
            baseAnim: animGo,
            moment: null,
            lastRepeat: -1,
            nowAnim: null,
        }
    }

    render() {
        if (this.state.lastRepeat !== this.props.countSteps)
        {
            if (this.props.countSteps !== 0) {
                this.setState({
                    lastRepeat: this.props.countSteps,
                    moment: 0,
                    nowAnim: this.state.baseAnim,
                }, () => {
                    this.setState({
                        moment: null,
                    })
                });
            }
            else
            {
                this.setState({
                    lastRepeat: this.props.countSteps,
                });
            }
        }
        let x = this.props.x, y = this.props.y;
        if (this.props.isBackLeg)
        {
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
        //animGo.repeat = this.props.countSteps;
        return (
            <g>
                <TweenOne component="g" animation={this.state.nowAnim}
                style={{transformOrigin: x + "px " + (y - this.state.ry) + "px"}}
                /*paused={this.props.paused}*/ repeat={this.props.countSteps}
                moment={this.state.moment}>
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

export default class SvgCharacter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rx: Constants.characterRx,
            ry: Constants.characterRy,
            anim: null,
            isLeft: false,
        }
        /*this.capsule = new Rectangle(
            new Point(this.props.cx - this.state.rx, this.props.cy - this.state.ry),
            new Point(this.props.cx + this.state.rx, this.props.cy + this.state.ry)
        );
        this.objectType = objectTypes.character;*/
    }

    render() {
        if (this.props.anim != null)
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
        return (
            <g>
                <TweenOne component="g" animation={this.props.anim}>
                    <g>
                        <Leg x={this.props.cx}
                             y={this.props.cy + this.state.ry}
                             paused={this.props.paused}
                             isBackLeg={true}
                             isLeft={this.state.isLeft}
                             countSteps={this.props.countSteps}
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
                             isBackLeg={false}
                             isLeft={this.state.isLeft}
                             countSteps={this.props.countSteps}
                        />
                        <Eye x={this.props.cx}
                             y={this.props.cy - this.state.ry / 2}
                             dx={this.state.rx / 2}
                             isLeft={this.state.isLeft}
                             isBackLeg={false}
                        />
                    </g>
                </TweenOne>
            </g>
        )
    }
}
