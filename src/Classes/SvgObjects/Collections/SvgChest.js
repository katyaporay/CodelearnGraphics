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
        const x = this.getArrowX(object, width)
        const y = this.props.y + this.props.length;
        const point = SvgFunctions.getSvgPoint(x, y);
        return <SvgArrow x={point.x} y={point.y} type={object.type}
                         onComplete={() => this.props.onComplete(() => this.forceUpdate())}/>
    }

    getArrowX(object, width)
    {
        if (this.props.array.length === 0)
            return this.props.width / 2
        const index1 = object.index1, index2 = object.index2;
        const x1 = this.getSvgItemX(index1, width) + width / 2
        const x2 = this.getSvgItemX(index2, width) + width / 2
        const x = (x1 + x2) / 2
        return x;
    }

    getSvgItem(item, index, width) {
        const x = this.getSvgItemX(index, width);
        const y = this.props.y;
        return <SvgItem x={x} y={y}
                        width={width} length={this.props.length}
                        text={this.props.array[index]} anim={this.props.anim}
                        height={this.props.height}
                        onComplete={this.props.onComplete}/>
    }

    getSvgItemX(index, width)
    {
        return this.props.x + width * index;
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
                {this.getSvgArrows()}
            </g>
        }
        const bearingArea = new Rectangle(
            new Point(this.props.x, this.props.y),
            new Point(this.props.x + this.props.width, this.props.y + this.props.length)
        );
        const cube = new Cube(bearingArea, this.props.height);
        return <g>
            {cube.getReactComponent(Constants.chestColor)}
            {this.getSvgArrows()}
        </g>
    }
}
