import {Game, IGameOptions} from './Game'

window.addEventListener('load', (): void => {
    const game: Game = new Game({
        canvasWidth: 1024,
        canvasHeight: 650,
        canvasId: 'canvas'
    } as IGameOptions)
}, true)