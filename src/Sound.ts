
interface ISoundOptions {
    volume?: number,
    loop?: boolean,
}

export class Sound {
    private audio : HTMLAudioElement = new Audio()
    constructor(public src: string, public options: ISoundOptions) {
        this.audio.src = src
        this.audio.volume = this.options.volume || 0.5
        this.audio.currentTime += 5
    }

    public play(): void {
        if(this.options.loop) {
            this.audio.loop = true
        }
        if (this.audio) {
            this.audio.currentTime = 0
        }
        this.audio.play()
    }

    public pause(): void {
        this.audio.pause()
    }
}