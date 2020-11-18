import React from "react";
import Board from "./Board";
import Constants from "../Models/Constants";
import {objectTypes} from "../Models/Types";
import Character from "../Classes/PhysicalObjects/Character";
import Animations from "../Models/Animations";
import Crown from "../Classes/PhysicalObjects/Crown";
import Hole from "../Classes/PhysicalObjects/Hole";
import Wall from "../Classes/PhysicalObjects/Wall";
import Point from "../Classes/GeometricalFigures/Point";
import Polygon from "../Classes/GeometricalFigures/Polygon";
import TweenOne from "rc-tween-one";

import SvgDrawPlugin from "../src/plugin/SvgDrawPlugin";
import Rectangle from "../Classes/GeometricalFigures/Rectangle";
import SvgFunctions from "../Classes/SvgObjects/SvgFunctions";
import Dialog from "../Classes/ObjectsToLink/Dialog";
import GetMessage from "./GetMessage";
import Npc from "../Classes/PhysicalObjects/Npc";
TweenOne.plugins.push(SvgDrawPlugin);

export default class Game extends React.Component
{
    constructor(props) {
        super(props);
        const linkedObjects = [new Dialog("Привет!!!\n\nasdfs")];
        this.state = {
            character: new Character(219, 381,
                null, 0, 0, linkedObjects),
            objects: [
                new Npc(Constants.fWidth - Constants.npcR, 100, null, []),
                new Crown(400, 200),
                new Hole(500, 200, 60),
                new Wall(new Rectangle(
                    new Point(0, 0),
                    new Point(10, Constants.fLength),
                ), 50),
                new Wall(new Rectangle(
                    new Point(10, 0),
                    new Point(Constants.fWidth - 10, 10),
                ), 50),
                new Wall(new Rectangle(
                    new Point(Constants.fWidth - 10, 0),
                    new Point(Constants.fWidth, Constants.fLength),
                ), 50),
                new Wall(new Rectangle(
                    new Point(11, Constants.fLength - 10),
                    new Point(Constants.fWidth - 10, Constants.fLength),
                ), 50),
                new Wall(new Rectangle(
                    new Point(100, 10),
                    new Point(150, 200),
                ), 100),
            ],
        };

        let that = this;
        /*let oldWidth = window.innerWidth;
        window.addEventListener("resize", function ()
        {
            const newWidth = window.innerWidth;
            if (newWidth !== oldWidth) {
                that.forceUpdate();
                oldWidth = newWidth;
            }
        });*/
        let oldWidth = window.innerWidth;
        window.onresize = function () {
            const newWidth = window.innerWidth;
            if (newWidth !== oldWidth) {
                that.forceUpdate();
                oldWidth = newWidth;
            }
        };
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

    checkCanGo(animX, animY)
    {
        const rectangle = this.state.character.bearingArea;
        let minX = Math.min(rectangle.pointMin.x, rectangle.pointMin.x + animX),
            minY = Math.min(rectangle.pointMin.y, rectangle.pointMin.y + animY),
            maxX = Math.max(rectangle.pointMax.x, rectangle.pointMax.x + animX),
            maxY = Math.max(rectangle.pointMax.y, rectangle.pointMax.y + animY);
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
        return this.checkDoesCollide(this.state.character.fallingArea.polygon, objectTypes.death);
        return false;
    }

    getNewCharacter(animX, animY)
    {
        console.log("countSteps = " + Math.ceil(Constants.durationGo * Math.abs(animX + animY)
                / Constants.durationStep));
        const nowPoint = SvgFunctions.getSvgPoint(
            this.state.character.center.x,
            this.state.character.center.y,
        );
        const newPoint = SvgFunctions.getSvgPoint(
            this.state.character.center.x + animX,
            this.state.character.center.y + animY
        );
        const center = this.state.character.center;
        const animScale = SvgFunctions.getScale(center.x, center.y, this.state.character.height) /
            SvgFunctions.getScale(center.x, center.y + animY, this.state.character.height);
        const duration = Constants.durationGo * Math.abs(animX + animY);
        return new Character (
            this.state.character.center.x + animX,
            this.state.character.center.y + animY,
            {
                duration: duration,
                type: "from",
                x: nowPoint.x - newPoint.x,
                y: nowPoint.y - newPoint.y,
                onUpdate: (() => this.go()),
                onComplete: (() => this.stop()),
                scale: animScale,
                ease: "linear",
            },
            Math.ceil(duration / Constants.durationStep),
            duration / Math.ceil(duration / Constants.durationStep),
            this.state.character.linkedObjects,
        );
    }

    updateCharacter(newCharacter)
    {
        this.state.character.setCenter(newCharacter.center.x, newCharacter.center.y);
        this.state.character.setAnim(newCharacter.anim, newCharacter.countSteps,
            newCharacter.durationStep);
    }

    go()
    {
        //this.forceUpdate();
    }

    move(animX, animY)
    {
        if (this.state.character.anim != null) return;
        while (!this.checkCanGo(animX, animY))
        {
            animX += (animX > 0 ? -1 : animX < 0 ? 1 : 0);
            animY += (animY > 0 ? -1 : animY < 0 ? 1 : 0);
            if (animX === 0 && animY === 0) return;
        }
        this.setState({
            character: this.getNewCharacter(animX, animY),
        });
    }

    stop()
    {
        this.setState({
            character: new Character(
                this.state.character.center.x,
                this.state.character.center.y,
                null,
                0,
                0,
                this.state.character.linkedObjects,
            )
        });
        if (this.checkIsDying())
        {
            this.setState({
                character: new Character(
                    this.state.character.center.x,
                    this.state.character.center.y,
                    Animations.animFallDown,
                    0,
                    0,
                    this.state.character.linkedObjects,
                )
            });
        }
    }

    say(message)
    {
        let linkedObjects = this.state.character.linkedObjects;
        for (let i = 0; i < linkedObjects.length; i++)
        {
            if (linkedObjects[i].constructor.name === Dialog.name)
            {
                linkedObjects[i] = new Dialog(message);
            }
        }
        this.setState({
                character: new Character(
                    this.state.character.center.x,
                    this.state.character.center.y,
                    this.state.character.anim,
                    this.state.character.countSteps,
                    this.state.character.durationStep,
                    linkedObjects,
                )
            });
    }

    render() {
        return(
            <div>
                <Board character={this.state.character}
                       objects={this.state.objects}/>
                <GetMessage getMessage={(message) => this.say(message)}/>
                <div>
                    {"cx = " + this.state.character.center.x}
                </div>
                <div>
                    {"cy = " + this.state.character.center.y}
                </div>
                <div>
                    {"count = " + this.state.character.countSteps}
                </div>
            </div>
        )
    }

    componentDidMount() {

        const that = this;
        window.addEventListener("keydown", function(event) {
            console.log(event.key);
            switch (event.key)
            {
                case "ArrowRight":
                    that.move(Constants.lengthStep, 0);
                    break;
                case "ArrowLeft":
                    that.move(-Constants.lengthStep, 0);
                    break;
                case "ArrowDown":
                    that.move(0, Constants.lengthStep);
                    break;
                case "ArrowUp":
                    that.move(0, -Constants.lengthStep);
                    break;
                default:
            }
        });
    }
}