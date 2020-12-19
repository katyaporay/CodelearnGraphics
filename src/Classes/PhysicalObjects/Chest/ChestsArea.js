import BoardObject from "../BoardObject";
import Rectangle from "../../GeometricalFigures/Rectangle";
import Point from "../../GeometricalFigures/Point";
import Cube from "../../GeometricalFigures/3D/Cube";
import Chest from "./Chest";
import React from "react";
import {objectTypes} from "../../../Models/Types";
import FiguresArray from "../../GeometricalFigures/FiguresArray";
import SvgPolygon from "../../SvgObjects/SvgPolygon";

export default class ChestsArea extends BoardObject {
    constructor(minX, minY, maxX, maxY, height) {
        super();
        this.height = height;
        this.chests = [];
        this.pointMin = new Point(minX, minY);
        this.pointMax = new Point(maxX, maxY);
        this.bearingArea = this.getBearingArea();
        this.maxChestWidth = 100;
        this.objectType = objectTypes.barrier;
    }

    getBearingArea()
    {
        /*const figures = this.chests.reduce((result, chest) => {
            result.push(chest.getBearingArea());
            return result;
        }, []);
        return new FiguresArray(figures);*/
        return new Rectangle(this.pointMin, this.pointMax);
    }
    /*getProjection() {
        const cube = new Cube(this.bearingArea, this.height);
        return cube.getProjection();
    }*/

    updateChestsPosition()
    {
        const { space, chestWidth } = this.getSpace();
        for (let i = 0; i < this.chests.length; i++)
        {
            const minX = this.pointMin.x,
                minY = this.pointMin.y + space * i + chestWidth * i,
                maxX = this.pointMax.x,
                maxY = minY + chestWidth;
            this.chests[i].setPosition(minX, minY, maxX, maxY);
        }
        this.bearingArea = this.getBearingArea();
    }

    getSpace()
    {
        const length = this.pointMax.y - this.pointMin.y;
        const count = this.chests.length;
        let space = (count > 1
            ? (length - this.maxChestWidth * count) / (count - 1)
            : (length - this.maxChestWidth * count) / 2),
            chestWidth = this.maxChestWidth;
        if (space <= 0 && count > 0) {
            space = length / (3 * count + count - 1);
            chestWidth = 3 * space;
        }
        return { space, chestWidth };
    }

    addChest(type, name)
    {
        this.chests.push(new Chest(name, 0, 0, 0, 0, this.height, [], type));
        this.updateChestsPosition();
    }

    removeFromChest(num_chest, index)
    {
        this.chests[num_chest].removeItem(index);
    }

    insertToChest(num_chest, index, value)
    {
        this.chests[num_chest].insertItem(index, value);
    }

    pushToChest(num_chest, value)
    {
        this.chests[num_chest].pushItem(value);
    }

    changeInChest(num_chest, index, value)
    {
        this.chests[num_chest].changeItem(index, value);
    }

    swapItemsInChest(num_chest, index1, index2)
    {
        this.chests[num_chest].swap(index1, index2);
    }

    getProjection()
    {
        const projection = this.chests.reduce((result, chest) => {
            result = result.concat(chest.getProjection());
            return result;
        }, []);
        return projection;
    }

    getReactComponent(board)
    {
        return <g>
            {this.bearingArea.polygon.getReactComponent("#fdff82")}
            {this.chests.map(chest => chest.getReactComponent(board))}
        </g>
    }

    clone()
    {
        return new ChestsArea(this.pointMin.x, this.pointMin.y, this.pointMax.x,
            this.pointMax.y, this.height);
    }
}
