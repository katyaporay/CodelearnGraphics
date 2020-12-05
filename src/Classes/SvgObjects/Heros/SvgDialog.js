import React from "react";
import Constants from "../../../Models/Constants";
import Text from "../../../Models/Text";
import TweenOne from "../../../src/TweenOne";
import Animations from "../../../Models/Animations";

export default class SvgDialog extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        }
    }

    setHeight(height)
    {
        if (height === this.state.height) return;
        this.props.setHeight(height);
        this.setState({
            height: height,
        });
    }

    getForm()
    {
        let form = "";
        form += "M" + (this.props.x) + ", " + (this.props.y) + " ";
        form += "L" + (this.props.x + this.props.width) + ", " + (this.props.y) + " ";
        form += "L" + (this.props.x + this.props.width) + ", " + (this.props.y + this.props.height) + " ";
        form += "L" + (this.props.x) + ", " + (this.props.y + this.props.height) + " ";
        form += "L" + (this.props.x) + ", " + (this.props.y);
        return form;
    }

    render()
    {
        if (this.props.text === "")
            return <g/>;
        return <g>
            <TweenOne animation={this.props.anim} component="g">
                <g>
                    <rect x={this.props.x} y={this.props.y - this.state.height}
                          height={this.state.height} width={this.props.width}
                          fill="#ffffff" strokeWidth="1" stroke="#000000" rx="5" ry="5"/>
                    {<Text x={this.props.x + this.props.padding}
                           y={this.props.y + this.props.padding + Constants.charHeight - this.state.height}
                           setHeight={(height) => this.setHeight(height)}
                           width={this.props.width - 2 * this.props.padding}
                           height={`${this.state.height}em`}
                           aria-multiline={true} style={{fontSize: 10}}>
                        {this.props.text}</Text>}
                    {/*<switch>
                        <foreignObject x={this.props.x + this.props.padding}
                                       y={this.props.y + this.props.padding + Constants.charHeight}
                                       width={this.props.width}
                                       height={this.props.height} fontSize={10}
                                       aria-multiline={true}>
                            <p xmlns="http://www.w3.org/1999/xhtml">{this.props.text}</p>
                        </foreignObject>
                    </switch>*/}
                </g>
            </TweenOne>
        </g>
    }
}
