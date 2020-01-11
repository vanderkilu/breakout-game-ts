import {Entity} from './Entity'
import {IGameOptions} from '../Game'
import {Paddle} from './Paddle'
import {Sound} from '../Sound'

export class Ball extends Entity {
    public dx: number = 2
    public dy: number = -2
    public speed: number = 3
    private _isOverTheEdge: boolean = false
    private collideSound = new Sound('../src/assets/collide.wav', {volume: 0.5})

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
    get isOverTheEdge(): boolean {
        return this._isOverTheEdge
    }
    set isOverTheEdge(cond: boolean) {
        this._isOverTheEdge = cond
    }
    public checkCollision(gameArea: IGameOptions, paddle: Paddle): void {
        if ((this.x + this.width > gameArea.canvasWidth) ||
          (this.x - this.width  < 0)){
              this.dx = -this.dx
        }
        else if (this.y - this.width < 0) {
            this.dy = -this.dy
        }
        else if (this.y + this.width > gameArea.canvasHeight) {
            if((this.y > paddle.y && this.y < paddle.y + paddle.height) &&
               (this.x > paddle.x && this.x < paddle.x + paddle.width)) {
                   //collision position is done such that it always gives us
                   // a point between 1 and -1. By that we can easy add the angle
                   // the ball should move if it hits certain positions of the paddle.
                   let collisionPosition: number = this.x - (paddle.x + paddle.width /2)
                   collisionPosition = (collisionPosition / paddle.width/2) 
                   const angle: number = 1 * collisionPosition * Math.PI / 3 // 60deg
                   //calculate new position of the ball based on angle
                   this.dx = Math.sin(angle) * this.speed
                   this.dy = -1 * Math.cos(angle) *  this.speed
                   this.collideSound.play()
            }
            else {
                this._isOverTheEdge = true
            }
        }
    }
}