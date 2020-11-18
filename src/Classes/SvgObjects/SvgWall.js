import React from "react";
import Point from "../GeometricalFigures/Point";
import Constants from "../../Models/Constants";
import SvgFunctions from "./SvgFunctions";
import Polygon from "../GeometricalFigures/Polygon";
import SvgPolygon from "./SvgPolygon";

export default class SvgWall extends React.Component
{
    render() {
        let firstParallelogram, secondParallelogram;
        if (this.props.bearingArea.polygon.points[0].x > Constants.fWidth / 2)
        {
            firstParallelogram = this.getRight();
            secondParallelogram = this.getLeft();
        }
        else
        {
            firstParallelogram = this.getLeft();
            secondParallelogram = this.getRight();
        }
        return(
            <g>
                {this.getBack()}
                {this.getBottom()}
                {firstParallelogram}
                {secondParallelogram}
                {this.getCap()}
                {this.getFront()}
            </g>
        )
    }

    getSvgBearingArea()
    {
        let points = this.props.bearingArea.polygon.points.slice();
        for (let i = 0; i < points.length; i++)
        {
            points[i] = SvgFunctions.getSvgPoint(points[i].x, points[i].y);
        }
        return new Polygon(points);
    }

    getBack()
    {
        return this.getWall(0 ,3);
    }

    getFront()
    {
        return this.getWall(1, 2);
    }

    getBottom()
    {
        return this.props.bearingArea.polygon.getReactComponent();
    }

    getCap()
    {
        const points = this.props.bearingArea.polygon.points;
        let capPoints = [];
        for (let i = 0; i < points.length; i++)
        {
            capPoints.push(SvgFunctions.getSvgPoint(points[i].x,
                points[i].y, this.props.height));
        }
        const polygon = new Polygon(capPoints);
        return <SvgPolygon polygon={polygon}/>;
    }

    getLeft()
    {
        return this.getWall(0, 1);
    }

    getRight()
    {
        return this.getWall(2, 3);
    }

    getWall(i, j)
    {
        const pointA = this.props.bearingArea.polygon.points[i];
        const pointB = this.props.bearingArea.polygon.points[j];
        let polygon = new Polygon([
            SvgFunctions.getSvgPoint(pointA.x, pointA.y, this.props.height),
            SvgFunctions.getSvgPoint(pointA.x, pointA.y),
            SvgFunctions.getSvgPoint(pointB.x, pointB.y),
            SvgFunctions.getSvgPoint(pointB.x, pointB.y, this.props.height),
        ]);
        return <SvgPolygon polygon={polygon}/>
    }

    /*getBackPointMin()
    {
        let pointMin = this.props.bearingArea.pointMin;
        let x = pointMin.x + this.props.bearingArea.height * Constants.cot;
        let y = pointMin.y - this.props.bearingArea.height;
        return new Point(x, y);
    }

    getTopLeftFrontPoint()
    {
        let pointMin = this.props.bearingArea.pointMin;
        return new Point(
            pointMin.x,
            pointMin.y - this.props.height,
        );
    }*/
}
