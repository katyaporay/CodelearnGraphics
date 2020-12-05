import Rectangle from "../GeometricalFigures/Rectangle";
import Point from "../GeometricalFigures/Point";
import Cube from "../GeometricalFigures/3D/Cube";
import SvgChest from "../SvgObjects/Collections/SvgChest";
import React from "react";
import {objectTypes} from "../../Models/Types";
import BoardObject from "./BoardObject";

export default class Chest extends BoardObject
{
    constructor(name, minX, minY, width, length, height, maxCount, array) {
        super();
        this.name = name;
        this.pointMin = new Point(minX, minY);
        this.width = width;
        this.length = length;
        this.height = height;
        this.oldArray = array;
        this.array = array;
        this.maxCount = maxCount;

        this.minSpace = 10;
        this.itemWidth = (this.width - (maxCount + 1) * this.minSpace) / maxCount;
        this.bearingArea = this.getBearingArea();
        this.objectType = objectTypes.barrier;
    }

    getBearingArea()
    {
        return new Rectangle(
            this.pointMin,
            new Point(this.pointMin.x + this.width, this.pointMin.y + this.length)
        );
    }

    getProjection()
    {
        const cube = new Cube(this.getBearingArea(), this.height);
        return cube.getProjection();
    }

    changeItem(index, value)
    {
        this.oldArray = this.array.slice();
        this.array[index] = value;
    }

    getReactComponent()
    {
        return<g>
            <SvgChest x={this.pointMin.x} y={this.pointMin.y}
                         width={this.width} length={this.length}
                         itemWidth={this.itemWidth} height={this.height}
                         oldArray={this.oldArray} array={this.array}
                         bearingArea={this.bearingArea}/>
        </g>
    }
}
