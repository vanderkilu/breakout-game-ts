import { Entity } from './Entity'

export class Brick extends Entity {
    private hasBroken: boolean = false 
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
        if (!this.hasBroken) {
            ctx.beginPath()
            ctx.rect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.closePath()
        }
    }
}