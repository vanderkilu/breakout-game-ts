import {Entity} from './Entity'

export class Score extends Entity {
    private _score: number = 0

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
        super(x,y,width, height)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Arial";
        ctx.fillStyle = this.color;
        ctx.fillText(`SCORE: ${this._score}`, this.x, this.y);
    }

    get score(): number {
        return this._score
    }

    set score(count: number) {
        this._score = count
    }
}