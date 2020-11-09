import React from "react";
import {Buttons} from "./Buttons";
import Board from "./Board";
import Constants from "../Models/Constants";
import {objectTypes, reactComponentNames} from "../Models/ObjectTypes";
import BoardObject from "../Classes/PhysicalObjects/BoardObject";
import Character from "../Classes/PhysicalObjects/Character";
import Animations from "../Models/Animations";
import Crown from "../Classes/PhysicalObjects/Crown";
import Hole from "../Classes/PhysicalObjects/Hole";
import Wall from "../Classes/PhysicalObjects/Wall";
import Parallelogram from "../Classes/GeometricalFigures/Parallelogram";
import Point from "../Classes/GeometricalFigures/Point";
import Polygon from "../Classes/GeometricalFigures/Polygon";

export default class Game extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            /*character: {
                cx: 100,
                cy: 100,
                paused: true,
                anim: null,
            },*/
            character: new Character(500, 157, true, false,
                null, 0),
            objects: [
                new Crown(400, 200),
                new Hole(300, 300, 60, 30),
                new Wall(new Parallelogram(
                    new Point(600, 200),
                    20,
                    100,
                ), 50),
            ],
        }
    }

    checkDoesCollide(polygon, objectTypeToCheck)
    {
        console.log("checkDoesCollide");
        for (let i = 0; i < this.state.objects.length; i++)
        {
            let object = this.state.objects[i];
            if (!object.hasOwnProperty('objectType')) continue;
            if (object.objectType !== objectTypeToCheck) continue;
            if (object.hasOverlap(polygon)) return true;
            console.log("not overlap");
        }
        return false;
    }

    checkCanGo(newCharacter)
    {
        const polygon1 = this.state.character.bearingArea.polygon;
        const polygon2 = newCharacter.bearingArea.polygon;
        const points = polygon1.points.concat(polygon2.points);
        let minX = points[0].x, minY = points[0].y, maxX = points[0].x, maxY = points[0].y;
        for (let i = 0; i < points.length; i++)
        {
            const x = points[i].x, y = points[i].y;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
        const polygon = new Polygon([
            new Point(minX, minY),
            new Point(minX, maxY),
            new Point(maxX, maxY),
            new Point(maxX, minY),
        ]);
        return !this.checkDoesCollide(polygon, objectTypes.barrier);
    }

    checkIsDying()
    {
        return this.checkDoesCollide(this.state.character.bearingArea.polygon, objectTypes.death);
    }

    getNewCharacter(animX, animY)
    {
        console.log("countSteps = " + Math.ceil(Constants.durationGo * Math.abs(animX + animY)
                / Constants.durationStep));
        return new Character (
            this.state.character.cx + animX,
            this.state.character.cy + animY,
            false,
            false,
            {
                    duration: Constants.durationGo * Math.abs(animX + animY),
                    type: "from",
                    x: -animX,
                    y: -animY,
                    onComplete: (() => this.stop()),
                    ease: "linear",
            },
            Math.ceil(Constants.durationGo * Math.abs(animX + animY)
                / Constants.durationStep),
        );
    }

    move(animX, animY)
    {
        if (this.state.character.anim != null) return;
        let newCharacter = this.getNewCharacter(animX, animY);
        while (!this.checkCanGo(newCharacter))
        {
            animX += (animX > 0 ? -1 : animX < 0 ? 1 : 0);
            animY += (animY > 0 ? -1 : animY < 0 ? 1 : 0);
            newCharacter = this.getNewCharacter(animX, animY);
            if (animX === 0 && animY === 0) return;
        }
        this.setState({
            character: newCharacter,
        });
    }

    stop()
    {
        this.setState({
            character: new Character(
                this.state.character.cx,
                this.state.character.cy,
                true,
                null,
                null,
                0,
            )
        });
        if (this.checkIsDying())
        {
            this.setState({
                character: new Character(
                    this.state.character.cx,
                    this.state.character.cy,
                    false,
                    null,
                    Animations.animFallDown,
                    0,
                )
            });
        }
    }

    render() {
        return(
            <div>
                <Board character={this.state.character}
                       objects={this.state.objects}/>
                <Buttons moveUp={() => this.move(0, -Constants.lengthStep)}
                         moveDown={() => this.move(0, Constants.lengthStep)}
                         moveLeft={() => this.move(-Constants.lengthStep, 0)}
                         moveRight={() =>this.move(Constants.lengthStep, 0)}
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