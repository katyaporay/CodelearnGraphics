import React from "react";
import Polygon from "../../GeometricalFigures/Polygon";
import Point from "../../GeometricalFigures/Point";
import Rectangle from "../../GeometricalFigures/Rectangle";
import SvgPolygon from "../SvgPolygon";
import TweenOne from "../../../src/TweenOne";
import Animations from "../../../Models/Animations";
import {changeArrayTypes} from "../../../Models/Types";

export default class SvgArrow extends React.Component
{
    constructor(props) {
        super(props);
        this.anim = Animations.arrowAnim
        this.anim.onComplete = this.props.onComplete.bind()
        this.fill = this.getFillColor();
        this.stroke = this.getStrokeColor()
    }

    getFillColor()
    {
        switch (this.props.type)
        {
            case changeArrayTypes.swap:
                return "#ff8c21"
            case changeArrayTypes.change:
                return "#e3f51b"
            case changeArrayTypes.remove:
                return "#ff4545"
            default:
                return "#1efc35"
        }
    }

    getStrokeColor()
    {
        switch (this.props.type)
        {
            case changeArrayTypes.swap:
                return "#ed801a"
            case changeArrayTypes.change:
                return "#d7e81a"
            case changeArrayTypes.remove:
                return "#ed3434"
            default:
                return "#09e31f"
        }
    }

    render() {
        const triangle = new Polygon([
            new Point(this.props.x, this.props.y),
            new Point(this.props.x - 10, this.props.y + 10),
            new Point(this.props.x + 10, this.props.y + 10),
        ])
        const rectangle = new Rectangle(
            new Point(this.props.x - 5, this.props.y + 10),
            new Point(this.props.x + 5, this.props.y + 30)
        )
        return (
            <TweenOne animation={this.anim} component="g">>
                <SvgPolygon polygon={triangle} fill={this.fill} stroke={this.stroke}/>
                <SvgPolygon polygon={rectangle.polygon} fill={this.fill} stroke={this.stroke}/>
            </TweenOne>
        );
    }
}
