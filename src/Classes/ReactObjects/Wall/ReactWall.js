import React from "react";
import ReactParallelogram from "../ReactParallelogram";
import Parallelogram from "../../GeometricalFigures/Parallelogram";
import Point from "../../GeometricalFigures/Point";
import Constants from "../../../Models/Constants";
import WallRectangle from "./WallRectangle";
import WallParallelogram from "./WallParallelogram";

export default class ReactWall extends React.Component
{
    render() {
        let firstParallelogram, secondParallelogram;
        if (this.props.bearingArea.cot > 0)
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

    getBack()
    {
        let backPointMin = this.getBackPointMin();
        return <WallRectangle x={backPointMin.x} y={backPointMin.y}
                              height={this.props.height} width={this.props.bearingArea.width}/>
    }

    getFront()
    {

        return <WallRectangle x={this.props.bearingArea.pointMin.x}
                              y={this.props.bearingArea.pointMin.y}
                              height={this.props.height} width={this.props.bearingArea.width}/>
    }

    getBottom()
    {
        return <ReactParallelogram parallelogram={this.props.bearingArea}/>
    }

    getCap()
    {
        let topLeftFrontPoint = this.getTopLeftFrontPoint();
        let parallelogram = new Parallelogram(
            topLeftFrontPoint,
            this.props.bearingArea.width,
            this.props.bearingArea.height,
        );
        return <ReactParallelogram parallelogram={parallelogram}/>
    }

    getLeft()
    {
        let pointMin = new Point(
            this.props.bearingArea.pointMin.x + this.props.bearingArea.width,
            this.props.bearingArea.pointMin.y,
        );
        let parallelogram = new Parallelogram(
            pointMin,
            this.props.bearingArea.height * this.props.bearingArea.cot,
            this.props.height,
        )
        return <WallParallelogram parallelogram={parallelogram}/>;
    }

    getRight()
    {
        let pointMin = this.props.bearingArea.pointMin;
        let parallelogram = new Parallelogram(
            pointMin,
            this.props.bearingArea.height * this.props.bearingArea.cot,
            this.props.height,
        );
        return <WallParallelogram parallelogram={parallelogram}/>;
    }

    getBackPointMin()
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
    }
}
