import {Game, IGameOptions} from './Game'

window.addEventListener('load', (): void => {
    const game: Game = new Game({
        canvasWidth: 800,
        canvasHeight: 480,
        canvasId: 'canvas'
    } as IGameOptions)
}, true)