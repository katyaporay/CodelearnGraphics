import React from "react";
import SvgFunctions from "../SvgFunctions";
import Polygon from "../../GeometricalFigures/Polygon";
import SvgPolygon from "../SvgPolygon";
import SvgItem from "./SvgItem";
import Cube from "../../GeometricalFigures/3D/Cube";
import Constants from "../../../Models/Constants";

export default class SvgChest extends React.Component {
    getSvgItems()
    {
        return <g>
            {this.props.array.map((item, index) =>
                this.getSvgItem(item, index))
            }
        </g>
    }

    getSvgItem(item, index) {
        const x = this.props.x + this.getSpace() * (index + 1) + this.props.itemWidth * index;
        const y = this.props.y;
        return <SvgItem x={x} y={y}
                        width={this.props.itemWidth} length={this.props.length}
                        text={this.props.array[index]} anim={this.props.anim}/>
    }

    getSpace()
    {
        const count = this.props.array.length;
        return (this.props.width - this.props.itemWidth * count) / (count + 1);
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
        return <g>
            {this.getAllCube().getReactComponent("#ffd91a")}
            {this.getBottomCube().getCoverReactComponent("#ffefa1")}
        </g>
    }
}
