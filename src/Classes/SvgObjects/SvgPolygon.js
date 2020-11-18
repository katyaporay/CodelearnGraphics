import React from "react";

export default class SvgPolygon extends React.Component
{
    render() {
        let points = "";
        for (let i = 0; i < this.props.polygon.points.length; i++) {
            const item = this.props.polygon.points[i];
            points += item.x + ',' + item.y + ' ';
        }
        let fill = "#C0C0C0";
        if (this.props.hasOwnProperty('fill'))
        {
            fill = this.props.fill;
        }
        return <polygon points={points}
                        fill={fill} strokeWidth="3" stroke="#A0A0A0"/>;
    }
}
