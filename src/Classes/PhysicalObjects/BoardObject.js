export default class BoardObject {

    constructor()
    {
        this.bearingArea = null;
        this.className = this.constructor.name;
    }

    hasOverlap(figure)
    {
        console.log("checking overlap...");
        return this.bearingArea.hasOverlap(figure);
    }
}
