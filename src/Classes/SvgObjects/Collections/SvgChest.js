import React from "react";
import SvgFunctions from "../SvgFunctions";
import Polygon from "../../GeometricalFigures/Polygon";
import SvgPolygon from "../SvgPolygon";
import SvgItem from "./SvgItem";
import Cube from "../../GeometricalFigures/3D/Cube";
import Constants from "../../../Models/Constants";
import Rectangle from "../../GeometricalFigures/Rectangle";
import Point from "../../GeometricalFigures/Point";
import SvgArrow from "./SvgArrow";
import {chestTypes} from "../../../Models/Types";
import Text from "../../../Models/Text";

export default class SvgChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nameHeight: 0}
    }


    getSvgItems()
    {
        const itemWidth = (this.props.width) / this.props.array.length;
        let length = this.props.length, height = this.props.height, y = this.props.y;
        const scale = SvgFunctions.getScale(this.props.x, this.props.y, this.props.height)
        if (Constants.mode === "3d")
            height -= this.state.nameHeight / scale
        else {
            length -= this.state.nameHeight / scale
            y += this.state.nameHeight / scale
        }
        return <g>
            {this.props.array.map((item, index) =>
                this.getSvgItem(item, index, itemWidth, length, height, y))
            }
        </g>
    }

    getSvgName() {
        let point;
        if (Constants.mode === "2d")
            point = SvgFunctions.getSvgPoint(this.props.x, this.props.y)
        else
            point = SvgFunctions.getSvgPoint(this.props.x, this.props.y + this.props.length,
                this.props.height)
        const scale = SvgFunctions.getScale(this.props.x, this.props.y, this.props.height);
        const transformOrigin = point.x + "px " + point.y + "px";
        return <g style={{transformOrigin: transformOrigin}}
            transform={"scale(" + scale + ")"}>
            <Text x={point.x + 10} y={point.y} lines={1} width={this.props.width - 20}
                         style={{fontSize: 10}}
                         setHeight={(height) => this.setNameHeight(height)}>
                {this.props.name}
            </Text>
        </g>
    }

    setNameHeight(height)
    {
        if (this.state.nameHeight === height)
            return;
        this.setState({ nameHeight: height});
    }

    getColor()
    {
        if (this.props.type === chestTypes.array)
            return "#f2ce18"
        else
            return "#34eda9"
    }

    getSvgArrows()
    {
        let itemWidth;
        if (this.props.array.length > 0)
            itemWidth = this.props.width / this.props.array.length;
        else
            itemWidth = this.props.width / 2;
        return <g>
            {this.props.arrows.map(object =>
                this.getSvgArrow(object, itemWidth))}
       </g>
    }

    getSvgArrow(object, width)
    {
        const point = this.getArrowPoint(object, width);
        return <SvgArrow x={point.x} y={point.y} type={object.type}
                         onComplete={() => this.props.onComplete(() => this.forceUpdate())}/>
    }

    getArrowPoint(object, width)
    {
        const x1 = this.props.x + width * object.index1 + width / 2;
        const x2 = this.props.x + width * object.index2 + width / 2;
        const x = (x1 + x2) / 2;
        const y = this.props.y + this.props.length;
        return SvgFunctions.getSvgPoint(x, y, this.props.height);
    }

    getSvgItem(item, index, width, length, height, y) {
        const x = this.props.x + width * index;
        return <SvgItem x={x} y={y}
                        width={width} length={length}
                        text={this.props.array[index]} anim={this.props.anim}
                        height={height}
                        onComplete={this.props.onComplete}
                        color={this.getColor()}/>
    }

    getSvgBearingArea()
    {
        const bearingAreaPoints = this.props.bearingArea.polygon.points;
        let points = [];
        for (let i = 0; i < bearingAreaPoints.length; i++)
        {
            points.push(SvgFunctions.getSvgPoint(bearingAreaPoints[i].x, bearingAreaPoints[i].y));
        }
        const polygon = new Polygon(points);
        return <SvgPolygon polygon={polygon} fill={"#ffefa1"}/>
    }

    addItem(index, item)
    {

    }

    eraseItem(index)
    {

    }

    getAllCube()
    {
        return new Cube(this.props.bearingArea, this.props.height);
    }

    getBottomCube()
    {
        return new Cube(this.props.bearingArea,
            this.props.height - Constants.chestCapHeight)
    }

    render()
    {
        /*if (this.props.array.length > 0) {
            return <g>
                {this.getSvgItems()}
                {this.getSvgArrows()}
                {this.getSvgName()}
            </g>
        }*/
        const bearingArea = new Rectangle(
            new Point(this.props.x, this.props.y),
            new Point(this.props.x + this.props.width, this.props.y + this.props.length)
        );
        const cube = new Cube(bearingArea, this.props.height);
        return <g>
            {cube.getReactComponent(this.getColor())}
            {this.getSvgItems()}
            {this.getSvgArrows()}
            {this.getSvgName()}
        </g>
    }
}
