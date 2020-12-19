import SvgFunctions from "../../SvgObjects/SvgFunctions";
import Polygon from "../Polygon";
import SvgPolygon from "../../SvgObjects/SvgPolygon";
import React from "react";
import Constants from "../../../Models/Constants";

export default class Cube {
    constructor(bearingArea, height) {
        this.bearingArea = bearingArea;
        this.height = height;
    }

    getProjection() {
        const x1 = this.bearingArea.pointMin.x, y1 = this.bearingArea.pointMin.y;
        const x2 = this.bearingArea.pointMax.x, y2 = this.bearingArea.pointMax.y;

        const [a1, b1, c1, d1] = this.getABCD(x1, y1, x2, y2);
        const [a2, b2, c2, d2] = this.getABCD(x1, y1, x2, y2, this.height);

        return this.getPolygons(a1, b1, c1, d1, a2, b2, c2, d2);
    }

    getABCD(x1, y1, x2, y2, height = 0) {
        const a = SvgFunctions.getSvgPoint(x1, y1, height);
        const b = SvgFunctions.getSvgPoint(x2, y1, height);
        const c = SvgFunctions.getSvgPoint(x2, y2, height);
        const d = SvgFunctions.getSvgPoint(x1, y2, height);
        return [a, b, c, d];
    }

    getPolygons(a1, b1, c1, d1, a2, b2, c2, d2) {
        return [
            new Polygon([c1, b1, b2, c2]),
            new Polygon([a1, a2, d2, d1]),
            new Polygon([a2, b2, c2, d2]),
            new Polygon([a1, b1, c1, d1]),
            new Polygon([a1, b1, b2, a2]),
            new Polygon([c1, c2, d2, d1]),
        ];
    }

    getReactPolygons()
    {
        const x1 = this.bearingArea.pointMin.x, y1 = this.bearingArea.pointMin.y;
        const x2 = this.bearingArea.pointMax.x, y2 = this.bearingArea.pointMax.y;

        const [a1, b1, c1, d1] = this.getABCD(x1, y1, x2, y2);
        const [a2, b2, c2, d2] = this.getABCD(x1, y1, x2, y2, this.height);

        const leftPolygon = new Polygon([a1, a2, d2, d1]);
        const rightPolygon = new Polygon([b1, b2, c2, c1]);
        const frontPolygon = new Polygon([c1, c2, d2, d1])
        const capPolygon = new Polygon([a2, b2, c2, d2]);
        return [leftPolygon, rightPolygon, frontPolygon, capPolygon];
    }

    getReactComponent(fill = "#C0C0C0")
    {
        const [leftPolygon, rightPolygon, frontPolygon, capPolygon] = this.getReactPolygons();

        return (
            <g>
                <SvgPolygon polygon={leftPolygon} fill={fill}/>
                <SvgPolygon polygon={rightPolygon} fill={fill}/>
                <SvgPolygon polygon={frontPolygon} fill={fill}/>
                <SvgPolygon polygon={capPolygon} fill={fill}/>
        </g>
        )
    }

    getCoverReactComponent(fill = "#C0C0C0")
    {
        const [leftPolygon, rightPolygon, frontPolygon, capPolygon] = this.getReactPolygons();

        if (Constants.mode === "3d") {
            /*let polygons = [];
            if (frontPolygon.getMinX() - leftPolygon.getMinX() > Constants.eps) {
                polygons.push(leftPolygon);
            }
            if (rightPolygon.getMaxX() - frontPolygon.getMaxX() > Constants.eps) {
                polygons.push(rightPolygon);
            }
            polygons.push(frontPolygon);
            return <g>
                {polygons.map(polygon => <SvgPolygon polygon={polygon} fill={fill}/>)}
            </g>*/
            return <g>
                <SvgPolygon polygon={frontPolygon} fill={fill}/>
            </g>
        }
        else {
            return <g>
                <SvgPolygon polygon={capPolygon} fill={fill}/>
            </g>
        }
    }
}
