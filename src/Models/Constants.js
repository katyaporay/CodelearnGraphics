import Vector from "../Classes/GeometricalFigures/Vector";
import Point from "../Classes/GeometricalFigures/Point";
import Point3D from "../Classes/GeometricalFigures/3D/Point3D";

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
    static npcLehRx = 10;

    static charHeight = 10;
    static lineMaxLength = Constants.characterRx * 2;

    static divY = 2;
    static constDiv = 100;
    static fWidth = 600;
    static fLength = 500;
    static range = 1000;
    static height = 200;
    static viewPoint = new Point3D(this.fWidth / 2, 200, 1200);
    static shiftX = 550;

    static eps = 1e-9;

    static matrix = [
        [ 1, 0, 0, 0 ],
        [ 0, -1, 0, 0 ],
        [ 0, 0, 0, -1/Constants.viewPoint.z],
        [ -Constants.viewPoint.x, Constants.viewPoint.y, 0, 1 ],
    ];
}
