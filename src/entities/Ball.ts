import {Entity} from './Entity'
import {IGameOptions} from '../Game'
import {Paddle} from './Paddle'

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
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    public updatePosition(): void {
        this.x += this.dx
        this.y += this.dy
    }
    public checkCollision(gameArea: IGameOptions, paddle: Paddle): void {
        if ((this.x + this.dx > gameArea.canvasWidth - this.width ) ||
          (this.x + this.dx  < this.width)){
              this.dx = -this.dx
        }
        else if (this.y + this.dy < this.width) {
            this.dy = -this.dy
        }
        else if (this.y + this.dy > gameArea.canvasHeight-this.height) {
            if(this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy = - this.dy;
            }
        }
    }
}