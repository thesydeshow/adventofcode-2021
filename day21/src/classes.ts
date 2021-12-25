export class Player implements IPlayer {
    position: number;
    score: number;

    constructor(position: number, score: number = 0) {
        this.position = position;
        this.score = score;
    }
}