export interface IEntity {
    x: number,
    y: number,
    width: number,
    height: number,
    draw(ctx: CanvasRenderingContext2D): void
}

export abstract class Entity implements IEntity {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ){}

    public abstract draw(ctx: CanvasRenderingContext2D): void
}