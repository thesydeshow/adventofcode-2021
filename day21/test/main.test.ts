import { takeTurn, rollDeterministicDice, playDeterministicGame, getLoser } from '../src/main';
import { Player } from '../src/classes';

const turns: [number, number[], number][] = [
    [7, [2, 2, 1], 2],
    [4, [1, 2, 3], 10],
    [8, [4, 5, 6], 3],
    [10, [7, 8, 9], 4],
    [3, [10, 11, 12], 6],
    [4, [13, 14, 15], 6],
    [6, [16, 17, 18], 7],
    [6, [19, 20, 21], 6],
    [7, [22, 23, 24], 6],
    [6, [88, 89, 90], 3],
    [4, [91, 92, 93], 10]
]
describe('takeTurn tests', () => {
    test.each(turns)('given starting position %p, and rolls %p, results in space %p', (argument1, argument2, expectedResult) => {
        const result = takeTurn(argument1, argument2);
        expect(result).toEqual(expectedResult);
    })
})

const deterministicDiceCases: [number, Player, number][] = [
    [0, new Player(4), 10],
    [3, new Player(8), 3],
    [87, new Player(6, 742), 745],
    [90, new Player(4, 990), 1000]
]

describe('deterministic dice tests', () => {
    test.each(deterministicDiceCases)('given player %p and the last roll of %p, returns score of %p', (argument1, argument2, expectedResult) => {
        rollDeterministicDice(argument1, argument2);
        expect(argument2.score).toEqual(expectedResult);
    })
})

const deterministicDieGames: [Player[], number, number, number][] = [
    [[new Player(4), new Player(8)], 1000, 745, 993]
]

describe('deterministic game tests', () => {
    test.each(deterministicDieGames)('given players %p, returns final scores of %p-%p over %p rolls', (players, expectedPlayer1Score, expectedPlayer2Score, expectedRolls) => {
        const rolls = playDeterministicGame(players);
        expect(players[0].score).toEqual(expectedPlayer1Score);
        expect(players[1].score).toEqual(expectedPlayer2Score);
        expect(rolls).toEqual(expectedRolls);
    })
})

const loserCases: [Player[], number][] = [
    [[new Player(3, 745), new Player(10, 1000)], 745]
]

describe('getLoser tests', () => {
    test.each(loserCases)('given players %p, returns loser score of %p', (players, expectedResult) => {
        const result = getLoser(players);
        expect(result.score).toEqual(expectedResult);
    })
})