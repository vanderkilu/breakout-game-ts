import {Entity} from './Entity'
import { IGameOptions } from '../Game';

export class Paddle extends Entity {
    public rightPressed: boolean = false
    public leftPressed: boolean = false
    public dx: number = 5
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
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    public beginMovement(e: KeyboardEvent): void {
        if (e.key === 'ArrowRight' || e.key === 'right') {
            this.rightPressed = true
        }
        else if (e.key === 'ArrowLeft' || e.key === 'left') {
            this.leftPressed = true
        }
    }

    public checkMovement(gameArea: IGameOptions): void {
        if (this.rightPressed) {
            this.x += this.dx
            if (this.x + this.width > gameArea.canvasWidth){
                this.x = gameArea.canvasWidth - this.width;
            }
        }
        else if (this.leftPressed) {
            this.x += -this.dx
            if (this.x < 0) {
                this.x = 0;
            }
        }
    }

    public stopMovement(e: KeyboardEvent): void {
        if (e.key === 'ArrowRight' || e.key === 'right') {
            this.rightPressed = false
        }
        else if (e.key === 'ArrowLeft' || e.key === 'left') {
            this.leftPressed = false
        }
    }
}