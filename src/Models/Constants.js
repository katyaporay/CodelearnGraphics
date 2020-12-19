import Vector from "../Classes/GeometricalFigures/Vector";
import Point from "../Classes/GeometricalFigures/Point";
import Point3D from "../Classes/GeometricalFigures/3D/Point3D";
import SvgFunctions from "../Classes/SvgObjects/SvgFunctions";

export default class Constants {
    static durationStep = 600;
    static durationGo = 20;
    static durationFallDown = 500;
    static lengthStep = 25;

    static characterRx = 30;
    static characterRy = 40;
    static legRx = 11;
    static legRy = 25;
    static legWidth = 5;
    static eyeRx = 12;

    static crownR = 22;
    static crownCount = 5;
    static crownHeight = 8;
    static crownUp = 5;

    static npcR = 30;
    static npcLegRy = 20;
    static npcLegRx = 10;

    static charHeight = 10;
    static lineMaxLength = Constants.characterRx * 2;

    static chestCapHeight = 10;

    static divY = 2;
    static constDiv = 100;
    static fWidth = 600;
    static fLength = 500;
    //static range = 1000;
    //static height = 400;
    static viewPoint()
    {
        return new Point3D(this.fWidth / 2, 800, 2000);
    }

    static shiftX()
    {
        let leftPoint = SvgFunctions.getSvgPointWithoutShift(0, Constants.fLength);
        let rightPoint = SvgFunctions.getSvgPointWithoutShift(Constants.fWidth, Constants.fLength);
        return -(leftPoint.x + rightPoint.x) / 2 + document.documentElement.clientWidth / 2;
    }

    static shiftY()
    {
        if (this.mode === "3d") {
            let downPoint = SvgFunctions.getSvgPointWithoutShift(0, Constants.fLength);
            let upPoint = SvgFunctions.getSvgPointWithoutShift(0, 0);
            return -upPoint.y + downPoint.y - upPoint.y;
        }
        return 0;
    }

    static eps = 1e-3;
    static mode = "3d";

    static matrix() {
        if (this.mode === "3d") {
            return [
                [1, 0, 0, 0],
                [0, -1, 0, 0],
                [0, 0, 0, -1 / Constants.viewPoint().z],
                [-Constants.viewPoint().x, Constants.viewPoint().y, 0, 1],
            ]
        }
        else
        {
            return [
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1],
            ]
        }
    };

    static k() {
        if (Constants.mode === "3d")
        {
            const real = SvgFunctions.getProduct(
                [[ 0, 0, Constants.fLength, 1 ]], Constants.matrix())[0];
            const newPoint = new Point( real[0] / real[3], real[1] / real[3]);
            const maxWidth = -newPoint.x * 2;
            return document.documentElement.clientWidth / maxWidth;
        }
        else
        {
            const docEl = document.documentElement;
            return Math.min(docEl.clientWidth / Constants.fWidth,
                docEl.clientHeight / Constants.fLength);
        }
    }

    static getHeight()
    {
        const svgPoint = SvgFunctions.getSvgPoint(0, Constants.fLength);
        return svgPoint.y;
    }
}
