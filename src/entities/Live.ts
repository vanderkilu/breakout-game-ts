import {Entity} from './Entity'


export class Live extends Entity {
    private _lives: number = 3
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
        super(x,y,width,height)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Arial";
        ctx.fillStyle = this.color;
        ctx.fillText(`LIVES: ${this._lives}`, this.x, this.y);
    }

    get lives(): number {
        return this._lives
    }

    set lives(count: number) {
        this._lives = count
    }

}