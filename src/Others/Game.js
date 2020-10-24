import React from "react";
import {Buttons} from "./Buttons";
import Board from "./Board";
import Crown from "../Classes/Objects/Crown";
import Hole from "../Classes/Objects/Hole";
import Wall from "../Classes/Objects/Wall";
import Constants from "../Models/Constants";

export default class Game extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            character: {
                cx: 100,
                cy: 100,
                paused: true,
                anim: null,
            },
            objects: [
                <Crown cx={400} cy={200}/>,
                <Hole cx={300} cy={300} rx={60} ry={30}/>,
                <Wall cx={700} cy={100} rx={30} ry={50}/>,
            ],
        }
    }

    move(animX, animY)
    {
        if (this.state.character.anim != null) return;
        this.setState({
            character:
                {
                    cx: this.state.character.cx + animX,
                    cy: this.state.character.cy + animY,
                    paused: false,
                    anim: {
                        duration: Constants.durationGo * Math.abs(animX + animY),
                        type: "from",
                        x: -animX,
                        y: -animY,
                        onComplete: (() => this.stop()),
                        ease: "linear",
                    },
                }
        });
    }

    stop()
    {
        this.setState({
            character:
                {
                    cx: this.state.character.cx,
                    cy: this.state.character.cy,
                    paused: true,
                    anim: null,
                }
        });
    }

    render() {
        return(
            <div>
                <Board characterCx={this.state.character.cx} characterCy={this.state.character.cy}
                       paused={this.state.character.paused} objects={this.state.objects}
                       anim={this.state.character.anim}/>
                <Buttons moveUp={() => this.move(0, -10)}
                         moveDown={() => this.move(0, 10)}
                         moveLeft={() => this.move(-10, 0)}
                         moveRight={() =>this.move(10, 0)}
                />
                <div>
                    {"cx = " + this.state.character.cx}
                </div>
                <div>
                    {"cy = " + this.state.character.cy}
                </div>
                <div>
                    {"count = " + this.state.count}
                </div>
            </div>
        )
    }
}