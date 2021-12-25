import { takeTurn } from '../src/main';

const turns = [
    [7, 2, 2, 1, 2],
    [4, 1, 2, 3, 10],
    [8, 4, 5, 6, 3],
    [10, 7, 8, 9, 4],
    [3, 10, 11, 12, 6],
    [4, 13, 14, 15, 6],
    [6, 16, 17, 18, 7],
    [6, 19, 20, 21, 6],
    [7, 22, 23, 24, 6],
    [6, 88, 89, 90, 3],
    [4, 91, 92, 93, 10]
]
describe('takeTurn tests', () => {
    test.each(turns)('given starting position %p, and rolls %p %p %p, results in space %p', (argument1, argument2, argument3, argument4, expectedResult) => {
        const result = takeTurn(argument1, argument2, argument3, argument4);
        expect(result).toEqual(expectedResult);
    })
})