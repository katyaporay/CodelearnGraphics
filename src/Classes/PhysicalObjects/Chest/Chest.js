import Rectangle from "../../GeometricalFigures/Rectangle";
import Point from "../../GeometricalFigures/Point";
import Cube from "../../GeometricalFigures/3D/Cube";
import SvgChest from "../../SvgObjects/Collections/SvgChest";
import React from "react";
import {changeArrayTypes, objectTypes} from "../../../Models/Types";
import BoardObject from "../BoardObject";

export default class Chest extends BoardObject
{
    constructor(name, minX, minY, maxX, maxY, height, array) {
        super();
        this.name = name;
        this.pointMin = new Point(minX, minY);
        this.pointMax = new Point(maxX, maxY);
        this.height = height;
        this.array = array;
        this.oldArray = array.slice();
        this.arrows = []

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
        this.arrows.push({index1: this.oldArray.length - 1, index2: this.oldArray.length,
            type: changeArrayTypes.push_back})
    }

    insertItem(index, value)
    {
        this.oldArray = this.array.slice();
        this.array.splice(index, 0, value);
        this.arrows.push({index1: index - 1, index2: index, type: changeArrayTypes.insert})
    }

    removeItem(index)
    {
        this.oldArray = this.array.slice();
        this.array.splice(index, 1);
        this.arrows.push({index1: index, index2: index, type: changeArrayTypes.remove})
    }

    changeItem(index, value)
    {
        this.oldArray = this.array.slice();
        this.array[index] = value;
        this.arrows.push({index1: index, index2: index, type: changeArrayTypes.change})
    }

    swap(index1, index2)
    {
        this.oldArray = this.array.slice();
        const val1 = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = val1;
        this.arrows.push(({index1: index1, index2: index1, type: changeArrayTypes.swap}));
        this.arrows.push(({index1: index2, index2: index2, type: changeArrayTypes.swap}));
    }

    onChangeComplete(board)
    {
        this.oldArray = this.array.slice();
        this.arrows = []
        board.forceUpdate()
    }

    getReactComponent(board)
    {
        return <g>
            <SvgChest x={this.pointMin.x} y={this.pointMin.y}
                      width={this.pointMax.x - this.pointMin.x}
                      length={this.pointMax.y - this.pointMin.y}
                      height={this.height}
                      array={this.oldArray}
                      bearingArea={this.bearingArea} arrows={this.arrows}
                      onComplete={() => this.onChangeComplete(board)}/>
        </g>
    }
}
