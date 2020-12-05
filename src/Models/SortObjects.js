import {objectTypes} from "./Types";
import Segment from "../Classes/GeometricalFigures/Segment";
import Constants from "./Constants";
import Point from "../Classes/GeometricalFigures/Point";
import SvgFunctions from "../Classes/SvgObjects/SvgFunctions";

export default class SortObjects
{
    constructor(objects) {
        this.objects = objects;
        this.gr = this.getGraph();
        this.used = this.getUsed();
        this.order = [];
        this.setOrder();
    }

    getSortedObjects()
    {
        let objects = [];
        for (let i = this.objects.length - 1; i >= 0; i--)
        {
            objects.push(this.objects[this.order[i]]);
        }
        return objects;
    }

    setOrder()
    {
        for (let i = 0; i < this.objects.length; i++)
        {
            this.dfs(i);
        }
    }

    dfs(v)
    {
        if (this.used[v]) return;
        this.used[v] = 1;
        for (let j = 0; j < this.gr[v].length; j++)
        {
            const u = this.gr[v][j];
            this.dfs(u);
        }
        this.order.push(v);
    }

    getUsed()
    {
        let used = [];
        for (let i = 0; i < this.objects.length; i++)
        {
            used.push(0);
        }
        return used;
    }

    getGraph() {
        let gr = [];
        for (let i = 0; i < this.objects.length; i++) {
            gr.push([]);
        }
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = 0; j < this.objects.length; j++) {
                if (i === j || this.objects[j].height === 0) continue;

                /*if (this.objects[i].objectType === objectTypes.lying &&
                    this.objects[j].objectType === objectTypes.character)
                {
                    if (this.objects[i].doesOverlapView(this.objects[j].fallingArea))
                    {
                        gr[i].push(j);
                    }
                    continue;
                }*/

                if (SortObjects.doesOverlapView(this.objects[j], this.objects[i])) {
                    gr[i].push(j);
                }
            }
        }
        return gr;
    }

    static doesOverlapView(object1, object2)
    {
        let intersection = this.getIntersection(object1, object2);
        if (!intersection || object1.height === 0)
            return false;
        if (object2.height === 0)
            return true;
        intersection = new Point(SvgFunctions.getFirstX(intersection.x), 0);
        //const last = SvgFunctions.getSvgPoint(intersection.x, intersection.y);
        const segment = new Segment(Constants.viewPoint().getPoint2D(), intersection);
        return object1.bearingArea.getMinDistToPointOnSegment(segment) <
            object2.bearingArea.getMinDistToPointOnSegment(segment);
    }

    static getIntersection(object1, object2)
    {
        const figures1 = object1.getProjection(), figures2 = object2.getProjection();
        for (let i = 0; i < figures1.length; i++)
        {
            for (let j = 0; j < figures2.length; j++)
            {
                const intersection = figures1[i].getIntersection(figures2[j]);
                if (intersection) {
                    return intersection;
                }
            }
        }
        return null;
    }
}
