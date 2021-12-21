import { Pair, NestedArray } from '../src/classes';

const magnitudeCases: [NestedArray, number][] = [
    [[[1,2],[[3,4],5]], 143],
    [[[[[0,7],4],[[7,8],[6,0]]],[8,1]], 1384],
    [[[[[1,1],[2,2]],[3,3]],[4,4]], 445],
    [[[[[3,0],[5,3]],[4,4]],[5,5]], 791],
    [[[[[5,0],[7,4]],[5,5]],[6,6]], 1137],
    [[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]], 3488]
];

describe('magnitude tests', () => {
    test.each(magnitudeCases)('given %p as the snailfish number, returns a magnitude of %p', (argument, expectedResult) => {
        const snailFishNumber = new Pair(argument);
        expect(snailFishNumber.magnitude).toEqual(expectedResult);
    })
})