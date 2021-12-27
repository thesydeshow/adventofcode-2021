export class Player implements IPlayer {
    position: number;
    score: number;
    wins: number;

    constructor(position: number, score: number = 0) {
        this.position = position;
        this.score = score;
        this.wins = 0;
    }
}