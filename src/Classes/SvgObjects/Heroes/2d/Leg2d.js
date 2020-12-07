import React from "react";
import Animations from "../../../../Models/Animations";
import Constants from "../../../../Models/Constants";
import TweenOne from "rc-tween-one";

export default class Leg2d extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            moment: null,
            lastRepeat: -1,
            nowAnim: null,
        }
    }

    getBaseAnim()
    {
        return Animations.getAnimGo2d(this.props.durationStep, this.props.ry);
    }

    render() {
        if (this.state.lastRepeat !== this.props.countSteps)
        {
            if (this.props.countSteps !== 0) {
                this.setState({
                    lastRepeat: this.props.countSteps,
                    moment: 0,
                    nowAnim: this.getBaseAnim(),
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
        const k = window.innerWidth / Constants.fWidth;
        const legRy = this.props.ry, legRx = this.props.rx;
        return (
            <g>
                <TweenOne component="g" animation={this.state.nowAnim}
                style={{transformOrigin: x + "px " + (y - legRy) + "px"}}
                repeat={this.props.countSteps} moment={this.state.moment}>
                    <ellipse cx={x}
                             cy={y}
                             rx={legRx}
                             ry={legRy}
                             fill={this.props.fill}
                             stroke={this.props.stroke}
                             strokeWidth="3"
                    />
                </TweenOne>
            </g>
        )
    }
}