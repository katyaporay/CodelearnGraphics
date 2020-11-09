import Point from "../GeometricalFigures/Point";
import Parallelogram from "../GeometricalFigures/Parallelogram";

export default class BoardObject {
    constructor()
    {
        this.bearingArea = null;
    }

    hasOverlap(polygon)
    {
        console.log("checking overlap...");
        return this.bearingArea.hasOverlap(polygon);
    }
}
