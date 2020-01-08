import {Ball} from './entities/Ball'
import {Paddle} from './entities/Paddle'
import {Score} from './entities/Score'
import {Brick} from './entities/Brick'
import {Live} from './entities/Live'


export interface IGameOptions {
    canvasWidth: number,
    canvasHeight: number,
    canvasId: string
}

export class Game {
    private ctx: CanvasRenderingContext2D = null
    public ball: Ball = null
    public paddle: Paddle = null
    public score: Score = null
    public bricks: Brick[][] = []
    public live: Live = null
    public interval: any
    private playAgainBtn: HTMLButtonElement = document.querySelector('.play-again')

    constructor(public gameOptions: IGameOptions){
        this.initGame()
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

        this.ball = new Ball(ballX, ballY, ballRadius, 0, '#307878')
    }

    private initPaddle(): void {
        const paddleWidth = 120
        const paddleHeight = 10
        const paddleX = (this.gameOptions.canvasWidth-paddleWidth)/2
        const paddleY = this.gameOptions.canvasHeight - paddleHeight

        this.paddle = new Paddle(
            paddleX, 
            paddleY, 
            paddleWidth, 
            paddleHeight,
            '#307878'
        )
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
        this.ball.checkCollision(this.gameOptions, this.paddle)

        this.paddle.draw(this.ctx)
        this.paddle.checkMovement(this.gameOptions)
        
        this.score.draw(this.ctx)
        this.live.draw(this.ctx)

        for (let i = 0; i < this.bricks.length; i++) {
            for (let j =0; j < this.bricks.length; j++) {
                const brick: Brick= this.bricks[i][j]
                if (brick  && !brick.hasBroken && brick.hasCollided(this.ball))  {
                    this.ball.dy = -this.ball.dy
                    brick.hasBroken = true 
                    this.score.score += 10
                }
                if (brick) brick.draw(this.ctx)  
            }
        }
        if (this.ball.isOverTheEdge) {
            this.live.lives = this.live.lives -1
            if (this.live.lives <= 0) {
                clearInterval(this.interval)
                this.playAgainBtn.style.display = 'block'
            }
            else {
                
                this.repositionEntity()
            }
        }
        const brickNum = this.bricks[0].length * this.bricks.length 
        if (this.score.score / 10 === brickNum) {
            this.ctx.fillText('HIYYAAA, YOU WON',
                this.gameOptions.canvasWidth/2-50,
                this.gameOptions.canvasHeight/2
            )
            clearInterval(this.interval)
            this.playAgainBtn.style.display = 'block'
        }
    }

    private repositionEntity() {
        this.ball.isOverTheEdge
        this.ball.x = this.gameOptions.canvasWidth/2
        this.ball.y = this.gameOptions.canvasHeight/2-10
        this.paddle.x = (this.gameOptions.canvasWidth-this.paddle.width)/2
        this.ball.isOverTheEdge = false
        this.ball.dx = 2
        this.ball.dy = -2
    }

    private reInitialize(): void {
        this.ctx.clearRect(
            0, 
            0,
            this.gameOptions.canvasWidth, 
            this.gameOptions.canvasHeight
        )
        clearInterval(this.interval)
        this.ball= null
        this.paddle = null
        this.score = null
        this.bricks = []
        this.live = null
        this.initGame()
    }

    private initEvent(): void {
        document.addEventListener('keydown', (e)=> this.paddle.beginMovement(e))
        document.addEventListener('keyup', (e)=> this.paddle.stopMovement(e))
        this.playAgainBtn.addEventListener('click', ()=> {
            this.playAgainBtn.style.display = 'none'
            this.reInitialize()
        }, false)

    }

    private initGameLoop() : void {
        this.interval = setInterval(() => this.draw(), 15)
    }

    private initBricks(): void {
        const col = 5
        const row = 5
        const padding = 15
        const width = 75
        const height = 10
        const offsetX = this.gameOptions.canvasWidth/4,
            offsetY = 50

        for (let i = 0; i < row; i++) {
            this.bricks[i] = []
            for (let j =0; j < col; j++) {
                const x = ((width + padding) * i) + offsetX
                const y = ((height + padding)* j) + offsetY
                this.bricks[i][j] = new Brick(x, y, width, height, '#307878')
            }
        }
    }

    private initGame(): void {
        this.initCanvas()
        this.initBall()
        this.initPaddle()
        this.initBricks()
        this.initScore()
        this.initLive()
        this.initEvent()
        this.initGameLoop()
    }

    private initScore(): void {
        this.score = new Score(8,20,0,0,'white')
    }

    private initLive(): void {
        this.live = new Live(
            this.gameOptions.canvasWidth-100,
            20,
            0,
            0,
            'white'
        )
    }
}