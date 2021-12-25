import { Player } from "./classes";

function modBaseOne(dividend: number, divisor: number): number {
    return (dividend - 1) % divisor + 1;
}

export function takeTurn(startingPosition: number, spins: number[]): number {
    const spun = spins.reduce((p,c) => p + c);
    const finalPosition = modBaseOne(startingPosition + spun, 10);
    return finalPosition;
}

export function rollDeterministicDice(lastRoll: number, player: IPlayer): number {
    const spins = [modBaseOne(++lastRoll, 100), modBaseOne(++lastRoll, 100), modBaseOne(++lastRoll, 100)];
    const newPosition = takeTurn(player.position, spins);
    player.position = newPosition;
    player.score += newPosition;
    return spins[2];
}

export function playDeterministicGame(players: IPlayer[]): number {
    let rolls = 0;
    let lastRoll = 0;
    let activePlayer = 0;
    while(Math.max(...players.map(x => x.score)) < 1000) {
        lastRoll = rollDeterministicDice(lastRoll, players[activePlayer]);
        rolls += 3;
        activePlayer = (activePlayer + 1) % players.length;
    }
    return rolls;
}

export function getLoser(players: IPlayer[]): Player {
    return players.sort((a,b) => a.score - b.score)[0];
}