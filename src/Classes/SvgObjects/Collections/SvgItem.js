import React from "react";
import SvgFunctions from "../SvgFunctions";
import Polygon from "../../GeometricalFigures/Polygon";
import SvgPolygon from "../SvgPolygon";
import SvgNpc from "../Heroes/3d/SvgNpc";
import Point from "../../GeometricalFigures/Point";
import Text from "../../../Models/Text";
import Constants from "../../../Models/Constants";
import TweenOne from "../../../src/TweenOne";

export default class SvgItem extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            leftPadding: 2,
            upPadding: 2,
        }
    }

    setHeight(height)
    {
        if (this.state.height === height) return;
        this.setState({
            height: height,
        });
    }

    render() {
        return <TweenOne anim={this.props.anim} component="g">
            <g>
                {this.getLeftWall()}
                {this.getRightWall()}
                {this.getCap()}
                {this.getFrontWall()}
            </g>
        </TweenOne>
    }

    getCap() {
        const a = SvgFunctions.getSvgPoint(this.props.x, this.props.y, this.props.height);
        const b = SvgFunctions.getSvgPoint(this.props.x + this.props.width, this.props.y,
            this.props.height);
        const c = SvgFunctions.getSvgPoint(this.props.x + this.props.width,
            this.props.y + this.props.length, this.props.height);
        const d = SvgFunctions.getSvgPoint(this.props.x, this.props.y + this.props.length,
            this.props.height);
        const polygon = new Polygon([ a, b, c, d ]);
        return <SvgPolygon polygon={polygon} fill={Constants.chestColor}/>
    }

    getLeftWall() {
        return this.getWall(0, 3);
    }

    getRightWall() {
        return this.getWall(1, 2);
    }

    getFrontWall() {
        const frontPolygon = this.getWall(2, 3);
        const minPoint = SvgFunctions.getSvgPoint(this.props.x,
            this.props.y + this.props.length);
        minPoint.y -= this.props.height;
        const scale = SvgFunctions.getScale(this.props.x, this.props.y + this.props.length,
            this.props.height);
        const originPoint = SvgFunctions.getSvgPoint(this.props.x,
            this.props.y + this.props.length, this.props.height);
        const transformOrigin = originPoint.x + "px " + originPoint.y + "px";
        return <g>
            {frontPolygon}
            <g transform={"scale(" + scale + ")"} style={{transformOrigin: transformOrigin}}>
                <Text x={minPoint.x + this.state.leftPadding}
                      y={minPoint.y + this.state.upPadding}
                      setHeight={(height) => this.setHeight(height)}
                      width={this.props.width - 2 * this.state.leftPadding}
                      style={{fontSize: 10}} height={this.props.height - this.state.upPadding * 2}>
                    {this.props.text}
                </Text>
            </g>
        </g>
    }

    getWall(i, j) {
        const bearingArea = this.getBearingArea();
        const p1 = bearingArea.points[i], p2 = bearingArea.points[j];
        const polygon = new Polygon([
            SvgFunctions.getSvgPoint(p1.x, p1.y),
            SvgFunctions.getSvgPoint(p1.x, p1.y, this.props.height),
            SvgFunctions.getSvgPoint(p2.x, p2.y, this.props.height),
            SvgFunctions.getSvgPoint(p2.x, p2.y),
        ]);
        return <SvgPolygon polygon={polygon} fill={Constants.chestColor}/>;
    }

    getBearingArea()
    {
        const a = new Point(this.props.x, this.props.y);
        const b = new Point(this.props.x + this.props.width, this.props.y);
        const c = new Point(this.props.x + this.props.width, this.props.y + this.props.length);
        const d = new Point(this.props.x, this.props.y + this.props.length);
        return new Polygon([ a, b, c, d ]);
    }
}
