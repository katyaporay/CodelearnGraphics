import React from "react";

export default class WallParallelogram extends React.Component
{
    render() {
        let pointMin = this.props.parallelogram.pointMin, cot = this.props.parallelogram.cot,
            width = this.props.parallelogram.width, height = this.props.parallelogram.height;
        let y1 = pointMin.y, y2 = y1 - width / cot, y3 = y1 - height, y4 = y2 - height;
        let x1 = pointMin.x, x2 = x1 + width;
        return <polygon points={ x1 + ", " + y1 + " " + x2 + ", " + y2 + " " +
        x2 + ", " + y4 + " " + x1 + ", " + y3}
                        fill="#C0C0C0" strokeWidth="3" stroke="#A0A0A0"/>
    }
}
