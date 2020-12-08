import React from "react";
import SvgFunctions from "../SvgFunctions";
import Polygon from "../../GeometricalFigures/Polygon";
import SvgPolygon from "../SvgPolygon";
import SvgItem from "./SvgItem";
import Cube from "../../GeometricalFigures/3D/Cube";
import Constants from "../../../Models/Constants";
import Rectangle from "../../GeometricalFigures/Rectangle";
import Point from "../../GeometricalFigures/Point";

export default class SvgChest extends React.Component {
    getSvgItems()
    {
        const itemWidth = this.props.width / this.props.array.length;
        return <g>
            {this.props.array.map((item, index) =>
                this.getSvgItem(item, index, itemWidth))
            }
        </g>
    }

    getSvgItem(item, index, width) {
        const x = this.props.x + width * index;
        const y = this.props.y;
        return <SvgItem x={x} y={y}
                        width={width} length={this.props.length}
                        text={this.props.array[index]} anim={this.props.anim}
                        height={this.props.height}/>
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
        if (this.props.array.length > 0) {
            return <g>
                {this.getSvgItems()}
                {/*{this.getAllCube().getReactComponent("#ffd91a")}
            {this.getBottomCube().getCoverReactComponent("#ffefa1")}*/}
            </g>
        }
        const bearingArea = new Rectangle(
            new Point(this.props.x, this.props.y),
            new Point(this.props.x + this.props.width, this.props.y + this.props.length)
        );
        const cube = new Cube(bearingArea, this.props.height);
        return cube.getReactComponent(Constants.chestColor)
    }
}
