import Constants from "../../../Models/Constants";
import React from "react";

export function Eye(props)
{
    let whiteX, blackX;
    const k = window.innerWidth / Constants.fWidth;
    const dx = Constants.eyeRx;
    if (props.isLeft)
    {
        whiteX = props.x - dx / 3 * 2;
        blackX = props.x - dx / 7 * 6;
    }
    else
    {
        whiteX = props.x + dx / 3 * 2;
        blackX = props.x + dx / 7 * 6;
    }
    return (
        <g>
            <circle cx={whiteX} cy={props.y} r={dx} fill="#ffffff"/>
            <circle cx={blackX} cy={props.y} r={dx / 2} fill="#000000"/>
        </g>
    )
}
