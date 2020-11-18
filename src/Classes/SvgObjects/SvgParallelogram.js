import React from "react";

export default class SvgParallelogram extends React.Component
{
    render() {
        let pointMin = this.props.parallelogram.pointMin, height = this.props.parallelogram.height,
            width = this.props.parallelogram.width, cot = this.props.parallelogram.cot;
        let x1 = pointMin.x, x2 = x1 + height * cot;
        let y1 = pointMin.y, y2 = y1 - height;
        let x3 = x1 + width, x4 = x2 + width;
        return (
            <polygon points={ x1 + ", " + y1 + " " + x3 + ", " + y1 + " " +
            x4 + ", " + y2 + " " + x2 + ", " + y2}
                     fill="#C0C0C0" strokeWidth="3" stroke="#A0A0A0"/>
        )
    }
}
