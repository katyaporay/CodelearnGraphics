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
import jQuery from "jquery";

import SvgDrawPlugin from "../src/plugin/SvgDrawPlugin";
import Rectangle from "../Classes/GeometricalFigures/Rectangle";
import SvgFunctions from "../Classes/SvgObjects/SvgFunctions";
import Dialog from "../Classes/ObjectsToLink/Dialog";
import GetMessage from "./Debug/GetMessage";
import Npc from "../Classes/PhysicalObjects/Npc";
import Chest from "../Classes/PhysicalObjects/Chest/Chest";
import ChangeItem from "./Debug/ChangeItem";
import ReadLevel from "./Debug/ReadLevel";
import BoardObject from "../Classes/PhysicalObjects/BoardObject";
import {Buttons} from "./Debug/Buttons";
import ChestsArea from "../Classes/PhysicalObjects/Chest/ChestsArea";
import PushItem from "./Debug/PushItem";
import InsertItem from "./Debug/InsertItem";
import RemoveItem from "./Debug/RemoveItem";
import FiguresArray from "../Classes/GeometricalFigures/FiguresArray";
import Circle from "../Classes/GeometricalFigures/Circle";

TweenOne.plugins.push(SvgDrawPlugin);

const initialState2 = {
    field: {width: 600, length: 500},
    character: {className: Character.name,
        cx: 419, cy: 200},
    objects: [
        {className: Npc.name, cx: Constants.fWidth - Constants.npcR, cy: 100},
        {className: Hole.name, cx: 500, cy: 200, r: 60},
        {className: Wall.name, minX: 0, minY: 0, maxX: 10, maxY: Constants.fLength,
            height: 50},
        {className: Wall.name, minX: 10, minY: 0, maxX: Constants.fWidth - 10, maxY: 10,
            height: 50},
        {className: Wall.name, minX: Constants.fWidth - 10, minY: 0, maxX: Constants.fWidth,
            maxY: Constants.fLength, height: 50},
        {className: Wall.name, minX: 10, minY: Constants.fLength - 10,
            maxX: Constants.fWidth - 10, maxY: Constants.fLength, height: 10},
        {className: Wall.name, minX: 100, minY: 10, maxX: 150, maxY: 200, height: 100},
        {className: Chest.name, name: "first_chest", minX: 250, minY: 0, width: 200, length: 100,
            maxCount: 5, array: ["aaaa aaaaa", "bb", "cc Cc cC", "DD", "Ee eE"]},
    ],
};

let str = JSON.stringify(initialState2);

const initialState = {
    character: new Character(0, 0),
    objects: [],
}

function getSpecificObject(object)
    {
        switch (object.className)
        {
            case Character.name:
                object = new Character(object.cx, object.cy);
                break;
            case Chest.name:
                object = new Chest(object.name, object.minX, object.minY,
                    object.width, object.length, object.height, object.maxCount, object.array);
                break;
            case Hole.name:
                object = new Hole(object.cx, object.cy, object.r);
                break;
            case Npc.name:
                object = new Npc(object.cx, object.cy);
                break;
            case Wall.name:
                object = new Wall(object.minX, object.minY, object.maxX, object.maxY,
                    object.height);
                break;
            case ChestsArea.name:
                object = new ChestsArea(object.minX, object.minY, object.maxX, object.maxY, object.height);
                break;
            default:
        }
        return object;
    }

export default class Game extends React.Component
{
    constructor(props) {
        super(props);
        Constants.mode = this.props.mode;
        const str2 = str;
        const initState2 = JSON.parse(str2);
        const initialState = {
            character: new Character(0, 0),
            objects: [],
        };
        this.initialState = initialState;
        this.state = initialState;

        let that = this;
        let oldWidth = document.documentElement.clientWidth;
        window.onresize = function () {
            const newWidth = document.documentElement.clientWidth;
            if (newWidth !== oldWidth) {
                that.forceUpdate();
                oldWidth = newWidth;
            }
        };
    }
    
    checkDoesCollide(figure, objectTypeToCheck)
    {
        console.log("checkDoesCollide");
        for (let i = 0; i < this.state.objects.length; i++)
        {
            let object = this.state.objects[i];
            if (!object.hasOwnProperty('objectType')) continue;
            if (object.objectType !== objectTypeToCheck) continue;
            if (figure.hasOverlap(object.bearingArea)) return true;
            console.log("not overlap");
        }
        return false;
    }

    checkCanGo(animX, animY)
    {
        const circle = this.state.character.bearingArea;
        let polygon;
        if (animX === 0)
        {
            polygon = new Polygon([
                new Point(circle.center.x - Constants.characterRx, circle.center.y),
                new Point(circle.center.x + Constants.characterRx, circle.center.y),
                new Point(circle.center.x + Constants.characterRx, circle.center.y + animY),
                new Point(circle.center.x - Constants.characterRx, circle.center.y + animY),
            ]);
        }
        else if (animY === 0)
        {
            polygon = new Polygon([
                new Point(circle.center.x, circle.center.y - Constants.characterRx),
                new Point(circle.center.x, circle.center.y + Constants.characterRx),
                new Point(circle.center.x + animX, circle.center.y + Constants.characterRx),
                new Point(circle.center.x + animX, circle.center.y - Constants.characterRx),
            ]);
        }
        const figuresArray = new FiguresArray([
            circle,
            polygon,
            new Circle(circle.center.x + animX, circle.center.y + animY, circle.r),
        ])
        /*let minX = Math.min(circle.center.x -, rectangle.pointMin.x + animX),
            minY = Math.min(rectangle.pointMin.y, rectangle.pointMin.y + animY),
            maxX = Math.max(rectangle.pointMax.x, rectangle.pointMax.x + animX),
            maxY = Math.max(rectangle.pointMax.y, rectangle.pointMax.y + animY);
        const polygon = new Polygon([
            new Point(minX, minY),
            new Point(minX, maxY),
            new Point(maxX, maxY),
            new Point(maxX, minY),
        ]);*/
        return !this.checkDoesCollide(figuresArray, objectTypes.barrier);
    }

    checkIsDying()
    {
        return this.checkDoesCollide(this.state.character.fallingArea, objectTypes.death);
    }

    getNewCharacter(animX, animY)
    {
        console.log("countSteps = " + Math.ceil(Constants.durationGo * Math.abs(animX + animY)
                / Constants.durationStep));
        const nowPoint = SvgFunctions.getSvgPoint(
            this.state.character._center.x,
            this.state.character._center.y,
        );
        const newPoint = SvgFunctions.getSvgPoint(
            this.state.character._center.x + animX,
            this.state.character._center.y + animY
        );
        const center = this.state.character._center;
        const animScale = SvgFunctions.getScale(center.x, center.y, this.state.character.height) /
            SvgFunctions.getScale(center.x, center.y + animY, this.state.character.height);
        const duration = Constants.durationGo * Math.abs(animX + animY);
        let character = this.state.character;
        character.setCenter(this.state.character._center.x + animX,
            this.state.character._center.y + animY);
        character.setAnim({
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
            duration / Math.ceil(duration / Constants.durationStep)
        );
        return character;
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
        if (this.state.character._anim != null) return;
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
        let character = this.state.character;
        character.setAnim(null, 0, 0);
        this.setState({
            character: character,
        })
        /*this.setState({
            character: new Character(
                this.state.character.center.x,
                this.state.character.center.y,
                null,
                0,
                0,
                this.state.character.linkedObjects,
            )
        });*/
        if (this.checkIsDying())
        {
            character.setAnim(Animations.getAnimFallDown(), 0, 0);
            this.setState({
                character: character,
            })
            /*this.setState({
                character: new Character(
                    this.state.character.center.x,
                    this.state.character.center.y,
                    Animations.getAnimFallDown(),
                    0,
                    0,
                    this.state.character.linkedObjects,
                )
            });*/
        }
    }

    say(message, type)
    {
        let linkedObjects = this.state.character._linkedObjects.slice();
        for (let i = 0; i < linkedObjects.length; i++)
        {
            if (linkedObjects[i].constructor.name === Dialog.name)
            {
                linkedObjects[i] = new Dialog(message, Character.name, type);
            }
        }
        let character = this.state.character;
        character.linkedObjects = linkedObjects;
        this.setState({
            character: character,
        });
        /*this.setState({
                character: new Character(
                    this.state.character.center.x,
                    this.state.character.center.y,
                    this.state.character.anim,
                    this.state.character.countSteps,
                    this.state.character.durationStep,
                    linkedObjects,
                )
            });*/
    }

    npcSay(message, type)
    {
        let npc;
        for (let i = 0; i < this.state.objects.length; i++)
        {
            if (this.state.objects[i].constructor.name === Npc.name)
            {
                npc = this.state.objects[i];
                break;
            }
        }
        if (npc === null) return;
        let linkedObjects = npc.linkedObjects;
        for (let i = 0; i < linkedObjects.length; i++)
        {
            if (linkedObjects[i].constructor.name === Dialog.name)
            {
                linkedObjects[i] = new Dialog(message, Npc.name, type);
            }
        }
        let objects = this.state.objects;
        for (let i = 0; i < objects.length; i++)
        {
            if (objects[i].constructor.name === Npc.name)
            {
                objects[i] = npc;
            }
        }
        this.setState({
            objects: objects,
        });
    }

    goToChest(num_chest, callback)
    {
        const cx = this.state.character.bearingArea.center.x,
            cy = this.state.character.bearingArea.center.y;
        let objects = this.state.objects;
        let newX, newY;
        for (let i = 0; i < objects.length; i++)
        {
            const object = objects[i];
            if (object.constructor.name !== ChestsArea.name)
                continue;
            const chest = object.chests[num_chest];
            newX = chest.pointMax.x + this.state.character.bearingArea.r + 10;
            newY = (chest.pointMin.y + chest.pointMax.y) / 2;
        }
        let character = this.getNewCharacter(newX - cx, 0);
        let anim = character._anim;
        anim.onComplete = (() => {
            let character2 = this.getNewCharacter(0, newY - cy);
            let anim2 = character2._anim;
            anim2.onComplete = callback;
            character2.anim = anim2;
            this.setState({
                character: character2,
            })
        })
        character.anim = anim;
        this.setState({
            character: character,
        })
        //this.move(newX - cx, 0);
    }

    changeItem(num_chest, index, value)
    {
        this.goToChest(num_chest, () => {
            this.stop();
            let objects = this.state.objects;
            for(let i = 0; i < objects.length; i++)
            {
                const object = objects[i];
                if (object.constructor.name !== ChestsArea.name)
                    continue;
                object.changeInChest(num_chest, index, value);
            }
            this.setState({
                objects: objects,
            })
        })
    }

    pushItem(num_chest, value)
    {
        this.goToChest(num_chest, () => {
            this.stop();
            let objects = this.state.objects;
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (object.constructor.name !== ChestsArea.name)
                    continue;
                object.pushToChest(num_chest, value);
            }
            this.setState({
                objects: objects,
            })
        })
    }

    insertItem(num_chest, index, value)
    {
        this.goToChest(num_chest, () => {
            this.stop();
            let objects = this.state.objects;
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (object.constructor.name !== ChestsArea.name)
                    continue;
                object.insertToChest(num_chest, index, value);
            }
            this.setState({
                objects: objects,
            })
        })
    }

    removeItem(num_chest, index)
    {
        this.goToChest(num_chest, () => {
            this.stop();
            let objects = this.state.objects;
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (object.constructor.name !== ChestsArea.name)
                    continue;
                object.removeFromChest(num_chest, index);
            }
            this.setState({
                objects: objects,
            })
        })
    }

    addChest()
    {
        let objects = this.state.objects;
        for (let i = 0; i < objects.length; i++)
        {
            const object = objects[i];
            if (object.constructor.name !== ChestsArea.name)
                continue;
            object.addChest();
        }
        this.setState({
            objects: objects,
        })
    }

    changeMode()
    {
        if (Constants.mode === "3d")
        {
            Constants.mode = "2d";
        }
        else
        {
            Constants.mode = "3d";
        }
        this.forceUpdate();
    }

    render() {
        return(
            <div>
                <Board character={this.state.character}
                       objects={this.state.objects}/>
                <div style={{float: 'right', alignContent: 'center'}}>
                    <Buttons moveUp={() => this.move(0, -Constants.lengthStep)}
                             moveDown={() => this.move(0, Constants.lengthStep)}
                             moveLeft={() => this.move(-Constants.lengthStep, 0)}
                             moveRight={() => this.move(Constants.lengthStep, 0)}/>
                </div>
                <div style={{float: 'left'}}>
                    <ReadLevel changeLevel={(object) => this.changeLevel(object)}/>
                    <button onClick={() => this.changeMode()}>Изменить вид</button>
                </div>
                <button onClick={() => this.restartGame()}>Перезапустить игру</button>
                <GetMessage getMessage={(message, type) => this.say(message, type)}/>
                <GetMessage getMessage={(message, type) => this.npcSay(message, type)}/>
                <br/>
                <button onClick={() => this.addChest()}>
                    Добавить сундук
                </button>

                <div style={{float: 'right', margin: 50}}>
                    <PushItem pushItem={(num_chest, value) =>
                        this.pushItem(num_chest, value)}/>
                    <RemoveItem removeItem={(num_chest, index) =>
                        this.removeItem(num_chest, index)}/>
                    <ChangeItem changeItem={(num_chest, index, value) =>
                        this.changeItem(num_chest, index, value)}/>
                    <InsertItem insertItem={(num_chest, index, value) =>
                        this.insertItem(num_chest, index, value)}/>
                </div>

                <div>
                    {"cx = " + this.state.character._center.x}
                </div>
                <div>
                    {"cy = " + this.state.character._center.y}
                </div>
                <div>
                    {"count = " + this.state.character._countSteps}
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
                case "d":
                    that.move(Constants.lengthStep, 0);
                    break;
                case "a":
                    that.move(-Constants.lengthStep, 0);
                    break;
                case "s":
                    that.move(0, Constants.lengthStep);
                    break;
                case "w":
                    that.move(0, -Constants.lengthStep);
                    break;
                default:
            }
        });
    }

    cloneInitialState()
    {
        const clonedInitialsState = {};
        clonedInitialsState.field = this.initialState.field;
        clonedInitialsState.character = this.initialState.character.clone();
        clonedInitialsState.objects = [];
        for(let i = 0; i < this.initialState.objects.length; i++) {
            const object = this.initialState.objects[i];
            clonedInitialsState.objects.push(object.clone());
        }
        return clonedInitialsState;
    }

    restartGame()
    {
        this.setState(this.cloneInitialState());
        this.forceUpdate();
    }

    getInitialState(json)
    {
        let initialState = JSON.parse(json);
        initialState.character = getSpecificObject(initialState.character);
        for (let i = 0; i < initialState.objects.length; i++)
        {
            initialState.objects[i] = getSpecificObject(initialState.objects[i]);
        }
        Constants.fWidth = initialState.field.width;
        Constants.fLength = initialState.field.length;
        return initialState;
    }

    changeLevel(object)
    {
        let file = object.files[0]
        let reader = new FileReader()
        let that = this;
        reader.onload = function() {
            that.setState(that.getInitialState(reader.result));
            that.initialState = that.getInitialState(reader.result);
            that.forceUpdate();
            /*jQuery.ajax(reader.result).done(function (data)
            {
                console.log("data, ", data);
            })*/
        }
        /*jQuery.getJSON(file, function(data)
        {
            console.log('data', data);
        })
        //const r = JSON.parse(file);
        //let k = r;
        let url = URL.createObjectURL(file);
        url = url.slice(5, url.length);
        jQuery.ajax({
            url: url,
            dataType: "json",
        }).done(function (data)
        {
            console.log("data: ", data);
        });*/
        reader.readAsText(file)
    }
}
