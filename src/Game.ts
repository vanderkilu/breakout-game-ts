import {Ball} from './entities/Ball'

export interface IGameOptions {
    canvasWidth: number,
    canvasHeight: number,
    canvasId: string
}

export class Game {
    private ctx: CanvasRenderingContext2D = null
    public ball: Ball = null
    public interval: any
    

    constructor(public gameOptions: IGameOptions){
        this.initCanvas()
        this.initBall()
        this.initGameLoop()
    }

    private initCanvas(): void {
        const canvas: HTMLCanvasElement = document.getElementById(
            this.gameOptions.canvasId
        ) as HTMLCanvasElement
        canvas.width = this.gameOptions.canvasWidth
        canvas.height = this.gameOptions.canvasHeight
        this.ctx = canvas.getContext('2d')
    }

    private initBall() : void {
        const ballX = this.gameOptions.canvasWidth/2
        const ballY = this.gameOptions.canvasHeight/2 -10
        const ballRadius = 10

        this.ball = new Ball(ballX, ballY, ballRadius, 0, 'green')
    }

    private draw(): void {
        this.ctx.clearRect(
            0, 
            0,
            this.gameOptions.canvasWidth, 
            this.gameOptions.canvasHeight
        )
        this.ball.draw(this.ctx)
        this.ball.updatePosition()
    }

    private initGameLoop() : void {
        this.interval = setInterval(this.draw, 10)
    }
}