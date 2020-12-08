import Rectangle from "../../GeometricalFigures/Rectangle";
import Point from "../../GeometricalFigures/Point";
import Cube from "../../GeometricalFigures/3D/Cube";
import SvgChest from "../../SvgObjects/Collections/SvgChest";
import React from "react";
import {objectTypes} from "../../../Models/Types";
import BoardObject from "../BoardObject";

export default class Chest extends BoardObject
{
    constructor(name, minX, minY, maxX, maxY, height, array) {
        super();
        this.name = name;
        this.pointMin = new Point(minX, minY);
        this.pointMax = new Point(maxX, maxY);
        this.height = height;
        this.oldArray = array;
        this.array = array;

        this.objectType = objectTypes.barrier;
    }

    setPosition(minX, minY, maxX, maxY)
    {
        this.pointMin = new Point(minX, minY);
        this.pointMax = new Point(maxX, maxY);
    }

    getBearingArea()
    {
        return new Rectangle(
            this.pointMin,
            this.pointMax
        );
    }

    getProjection()
    {
        const cube = new Cube(this.getBearingArea(), this.height);
        return cube.getProjection();
    }

    pushItem(value)
    {
        this.oldArray = this.array.slice();
        this.array.push(value);
    }

    insertItem(index, value)
    {
        this.oldArray = this.array.slice();
        this.array.splice(index, 0, value);
    }

    removeItem(index)
    {
        this.oldArray = this.array.slice();
        this.array.splice(index, 1);
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
                      width={this.pointMax.x - this.pointMin.x}
                      length={this.pointMax.y - this.pointMin.y}
                      height={this.height}
                      oldArray={this.oldArray}
                      array={this.array}
                      bearingArea={this.bearingArea}/>
        </g>
    }
}
