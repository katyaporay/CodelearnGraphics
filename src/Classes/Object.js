import Rectangle from "./Rectangle";
import Point from "./Point";
import React from "react";

export default class Object extends React.Component{
    constructor(props) {
        super(props);
        this.capsule = new Rectangle(
            new Point(this.props.cx - this.props.rx, this.props.cy - this.props.ry),
            new Point(this.props.cx + this.props.rx, this.props.cy + this.props.ry)
        );
    }

    isCollide(object)
    {
        return this.capsule.isCollide(object.capsule);
    }
}
