export default class FiguresArray
{
    constructor(figures) {
        this.figures = figures;
    }

    hasOverlap(figure)
    {
        for (let i = 0; i < this.figures.length; i++)
        {
            if (this.figures[i].hasOverlap(figure))
                return true;
        }
        return false;
    }
}