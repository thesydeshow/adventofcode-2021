import { Player } from "./classes";

function modBaseOne(dividend: number, divisor: number): number {
    return (dividend - 1) % divisor + 1;
}

export function takeTurn(startingPosition: number, spins: number[]): number {
    const spun = spins.reduce((p,c) => p + c);
    const finalPosition = modBaseOne(startingPosition + spun, 10);
    return finalPosition;
}

export function movePlayer(player: IPlayer, newPosition: number) {
    player.position = newPosition;
    player.score += newPosition;
}

export function rollDeterministicDice(lastRoll: number, player: IPlayer): number {
    const spins = [modBaseOne(++lastRoll, 100), modBaseOne(++lastRoll, 100), modBaseOne(++lastRoll, 100)];
    const newPosition = takeTurn(player.position, spins);
    movePlayer(player, newPosition);
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

export function getLoser(players: IPlayer[]): IPlayer {
    return players.sort((a,b) => a.score - b.score)[0];
}

export function getBiggestWinner(players: IPlayer[]): IPlayer {
    return players.sort((a,b) => b.wins - a.wins)[0];
}

let quantumDieRolls: IRolls[][] = [...Array(10)].map(x => new Array<IRolls>());
for(let i = 1; i <= 3; i++) {
    for(let j = 1; j <= 3; j++) {
        for(let k = 1; k <= 3; k++) {
            quantumDieRolls[i+j+k].push(<IRolls>{dieAmounts: [i, j, k]});
        }
    }
}

export function playDiracGame(players: IPlayer[], activePlayer: number = 0, rolls: number[] = [], turn: number = 1) {
    if(rolls.length) {
        const newPosition = takeTurn(players[activePlayer].position, rolls);
        movePlayer(players[activePlayer], newPosition);
        if(players[activePlayer].score >= 21) {
            players[activePlayer].wins++;
            return;
        }
        activePlayer = (activePlayer + 1) % players.length;
    }

    for(let spun = 3; spun <= 9; spun++) {
        let universePlayers = players.map(x => new Player(x.position, x.score));
        playDiracGame(universePlayers, activePlayer, quantumDieRolls[spun][0].dieAmounts, turn + 1);
        players.forEach((x,i) => x.wins += universePlayers[i].wins * quantumDieRolls[spun].length);
    }
}