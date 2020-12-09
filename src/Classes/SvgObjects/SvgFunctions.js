import Constants from "../../Models/Constants";
import Point from "../GeometricalFigures/Point";

export default class SvgFunctions
{
    static getSvgPoint(x, z, y = 0)
    {
        let newPoint = this.getSvgPointWithoutShift(x, z, y);
        newPoint.x += Constants.shiftX();
        newPoint.y += Constants.shiftY();
        return newPoint;
    }

    static getSvgPointWithoutShift(x, z, y = 0)
    {
        const k = Constants.k();
        const real = this.getProduct([[ x, y, z, 1 ]], Constants.matrix())[0];
        let newPoint = new Point( real[0] / real[3], real[1] / real[3]);
        newPoint.x *= k;
        newPoint.y *= k;
        return newPoint;
    }

    static getProduct(matrix1, matrix2)
    {
        const n = matrix1.length, l = matrix2.length, m = matrix2[0].length;
        let product = [];
        for (let i = 0; i < n; i++)
        {
            product.push([]);
            for (let j = 0; j < m; j++)
            {
                product[i].push(0);
                for (let k = 0; k < l; k++)
                {
                    product[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return product;
    }

    static cx(props)
    {
        const point = SvgFunctions.getSvgPoint(props.cx, props.cy);
        return point.x;
    }

    static cy(props)
    {
        const point = SvgFunctions.getSvgPoint(props.cx, props.cy);
        return point.y;
    }

    static getScale(x, y, height)
    {
        if (Constants.mode === "3d") {
            const p1 = this.getSvgPoint(x, y);
            const p2 = this.getSvgPoint(x, y, height);
            return (p1.y - p2.y) / height;
        }
        return Constants.k();
    }

    /*static getYScale(y)
    {
        return 1 / (1 + Math.pow((y / Constants.fLength), 1/10)) / Constants.divY;
    }*/

    static getEllipseRy(circle)
    {
        /*let p1 = new Point(r / Math.sqrt(2), r / Math.sqrt(2));
        let p2 = new Point(0, r);
        p1 = this.getSvgPoint(p1);
        p2 = this.getSvgPoint(p2);
        const kk = (p1.x * p1.x - p2.x * p2.x) / (p2.y * p2.y - p1.y * p1.y);
        return Math.sqrt(p1.x * p1.x / kk + p1.y * p1.y);*/
        //const bb = (p2.y * p2.y * p1.x * p1.x - p1.y * p1.y * p2.x * p2.x) /
        //    (p1.x * p1.x - p2.x * p2.x);
        //return Math.sqrt(bb);
        let pu = new Point(circle.center.x, circle.center.y - circle.r);
        let pd = new Point(circle.center.x, circle.center.y + circle.r);
        pu = this.getSvgPoint(pu.x, pu.y);
        pd = this.getSvgPoint(pd.x, pd.y);
        return (pd.y - pu.y) / 2;
    }

    static getEllipseRx(circle)
    {
        /*let p = new Point(r, 0);
        p = this.getSvgPoint(p);
        return p.x;*/
        let pl = new Point(circle.center.x - circle.r, circle.center.y);
        let pr = new Point(circle.center.x + circle.r, circle.center.y);
        pl = this.getSvgPoint(pl.x, pl.y);
        pr = this.getSvgPoint(pr.x, pr.y);
        return (pr.x - pl.x) / 2;
    }

    static getFirstX(x)
    {
        const k = Constants.k();
        x -= Constants.shiftX();
        x /= k;
        x += Constants.viewPoint().x;
        return x;
    }
}
