import React from "react";

export default class WallRectangle extends React.Component
{
    render() {
        return <rect x={this.props.x} y={this.props.y - this.props.height}
                     height={this.props.height} width={this.props.width}
                     fill="#C0C0C0" strokeWidth="3" stroke="#A0A0A0"/>
    }
}
