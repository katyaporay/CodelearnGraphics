import BoardObject from "./BoardObject";
import {objectTypes} from "../../Models/Types";

export default class Variable extends BoardObject
{
    constructor(x, y, val) {
        super();
        this.x = x;
        this.y = y;
        this.val = val;
        this.objectType = objectTypes.lying;
        this.bearingArea = this.getBearingArea();
    }

    getBearingArea()
    {

    }

    getProjection()
    {

    }
}
