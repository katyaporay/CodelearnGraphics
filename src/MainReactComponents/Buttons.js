import React from "react";

export function Buttons(props) {
    return (
        <div align="center">
            <div>
                <button onClick={props.moveUp}>
                    ↑
                </button>
            </div>
            <div>
                <button onClick={props.moveLeft}>
                    ←
                </button>
                <button onClick={props.moveDown}>
                    ↓
                </button>
                <button onClick={props.moveRight}>
                    →
                </button>
            </div>
        </div>
    )
}
