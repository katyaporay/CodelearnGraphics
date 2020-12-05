import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Crown from "../Classes/SvgObjects/SvgCrown";
import Character from "../Classes/SvgObjects/Heros/SvgCharacter";
import Hole from "../Classes/SvgObjects/SvgHole";
import Wall from "../Classes/SvgObjects/SvgWall";
import ReactParallelogram from "../Classes/SvgObjects/SvgParallelogram";
import Segment from "../Classes/GeometricalFigures/Segment";
import Constants from "../Models/Constants";
import SvgPolygon from "../Classes/SvgObjects/SvgPolygon";
import Polygon from "../Classes/GeometricalFigures/Polygon";
import Point from "../Classes/GeometricalFigures/Point";
import Rectangle from "../Classes/GeometricalFigures/Rectangle";
import TweenOne from "../src/TweenOne";
import SortObjects from "../Models/SortObjects";
import Ellipse from "../Classes/GeometricalFigures/Ellipse";
import SvgItem from "../Classes/SvgObjects/Collections/SvgItem";

function get_xa_xb_mid(minXa, maxXa, minXb, maxXb)
{
    let xa, xb, mid;
    if (minXb - maxXa >= -Constants.eps)
    {
        xa = minXa;
        xb = maxXb;
        mid = (minXb + maxXa) / 2;
    }
    else if (minXa - maxXb >= -Constants.eps)
    {
        xa = maxXa;
        xb = minXb;
        mid = (minXa + maxXb) / 2;
    }
    else
    {
        mid = null;
    }
    return [xa, xb, mid];
}

function cmp(a, b)
{
    /*const figureA = a.bearingArea, figureB = b.bearingArea;
    let [minYa, maxYa] = figureA.getY(a.objectType);
    let [minYb, maxYb] = figureB.getY(b.objectType);
    if (maxYa <= minYb)
        return -1;
    if (maxYb <= minYa)
        return 1;
    const y = (Math.max(minYa, minYb) + Math.min(maxYa, maxYb)) / 2;
    const [minXa, maxXa] = figureA.getX(y), [minXb, maxXb] = figureB.getX(y);
    let [xa, xb, mid] = get_xa_xb_mid(minXa, maxXa, minXb, maxXb);
    if (mid === null)
        return a.height - b.height;
    if (maxXa <= Constants.fWidth / 2 && minXb >= Constants.fWidth / 2)
        return 1;
    if (maxXb <= Constants.fWidth / 2 && minXa >= Constants.fWidth / 2)
        return -1;
    if (mid > Constants.fWidth / 2)
        return xb - xa;
    return xa - xb;*/
    return b.getDist() - a.getDist();
}

export default class Board extends React.Component{
    render() {
        const rectangle = new Rectangle(
            new Point(0, 0),
            new Point(Constants.fWidth, Constants.fLength),
        );

        let objects = this.props.objects.slice();
        objects.push(this.props.character);
        /*let intersections = [];
        for (let i = 0; i < objects.length; i++)
        {
            for (let j = i + 1; j < objects.length; j++)
            {
                if (i === j)
                    continue;
                const intersection = SortObjects.getIntersection(objects[i], objects[j]);
                if (!intersection) continue;
                intersections.push(<circle cx={intersection.x} cy={intersection.y}
                r={2}/>);
            }
        }*/

        //objects.sort(cmp);
        objects = (new SortObjects(objects)).getSortedObjects();
        let k = window.innerWidth / Constants.fWidth;
        return(
            <svg width={Constants.fWidth * k} height={Constants.height * k}>
                <rect x={0} y={0} width={Constants.fWidth * k}
                      height={Constants.height * k}
                      fill="#ffffff" stroke="#000000"/>
                      {rectangle.polygon.getReactComponent()}
                {objects.map(object => (
                    object.getReactComponent()
                ))}
                {/*objects.map(object => (
                    object.getProjection().map(figure =>
                    {
                        if (figure.constructor.name === Ellipse.name)
                            return figure.getReactComponent()
                        return <SvgPolygon polygon={figure} fill="#ffffff"/>
                    })
                ))*/}
            </svg>
        )
    }
}
