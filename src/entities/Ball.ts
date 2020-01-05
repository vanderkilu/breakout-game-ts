import {Entity} from './Entity'

export class Ball extends Entity {
    public dx: number = 2
    public dy: number = -2

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string
    ) {
        super(x,y,width,height)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
        ctx.closePath()
    }
    public updatePosition(): void {
        this.x += this.dx
        this.y += this.dy
    }
}