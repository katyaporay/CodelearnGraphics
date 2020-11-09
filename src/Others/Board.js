import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Crown from "../Classes/ReactObjects/SvgCrown";
import Character from "../Classes/ReactObjects/SvgCharacter";
import Hole from "../Classes/ReactObjects/SvgHole";
import Wall from "../Classes/ReactObjects/Wall/ReactWall";
import ReactParallelogram from "../Classes/ReactObjects/ReactParallelogram";
import Segment from "../Classes/GeometricalFigures/Segment";
import Constants from "../Models/Constants";

function getY(polygon)
{
    let minY = polygon.points[0].y, maxY = polygon.points[0].y;
    for (let i = 0; i < polygon.points.length; i++)
    {
        const y = polygon.points[i].y;
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    return [minY, maxY];
}

function getX(polygon, y)
{
    for (let i = 0; i < polygon.points.length; i++)
    {
        const j = (i + 1) % polygon.points.length;
        const y1 = Math.min(polygon.points[i].y, polygon.points[j].y);
        const y2 = Math.max(polygon.points[i].y, polygon.points[j].y);
        if (y1 <= y && y <= y2)
        {
            const segment = new Segment(polygon.points[i], polygon.points[j]);
            return getXOnSegment(segment, y);
        }
    }
}

function getXOnSegment(segment, y)
{
    const dx1 = segment.pointA.x - segment.pointB.x,
        dy1 = segment.pointA.y - segment.pointB.y,
        dy2 = segment.pointA.y - y;
    const dx2 = dx1 / dy1 * dy2;
    return segment.pointA.x - dx2;
}

function cmp(a, b)
{
    if (!a.hasHeight || !b.hasHeight)
        return !b.hasHeight - !a.hasHeight;
    const polygonA = a.bearingArea.polygon, polygonB = b.bearingArea.polygon;
    let [minAy, maxAy] = getY(polygonA);
    let [minBy, maxBy] = getY(polygonB);
    if (maxAy < minBy)
        return -1;
    if (maxBy < minAy)
        return 1;
    const y = Math.max(minAy, minBy);
    const xa = getX(polygonA, y), xb = getX(polygonB, y);
    if (Constants.cot < 0)
        return xb - xa;
    return xa - xb;
}

export default class Board extends React.Component{
    render() {
        let objects = this.props.objects.slice();
        objects.push(this.props.character);
        objects.sort(cmp);
        return(
            <svg width={1000} height={400}>
                <rect x={0} y={0} width={1000} height={400} fill="#ffffff" stroke="#000000"/>
                {objects.map(object => (
                    [//<ReactParallelogram parallelogram={object.bearingArea}/>,
                    object.getReactComponent()]
                ))}
            </svg>
        )
    }
}
