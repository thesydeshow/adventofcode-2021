import { Pair, NestedArray } from '../src/classes';
import { reduce, tryExplode, trySplit } from '../src/main';

const magnitudeCases: [NestedArray, number][] = [
    [[9,1], 29],
    [[1,9], 21],
    [[[9,1],[1,9]], 129],
    [[[1,2],[[3,4],5]], 143],
    [[[[[0,7],4],[[7,8],[6,0]]],[8,1]], 1384],
    [[[[[1,1],[2,2]],[3,3]],[4,4]], 445],
    [[[[[3,0],[5,3]],[4,4]],[5,5]], 791],
    [[[[[5,0],[7,4]],[5,5]],[6,6]], 1137],
    [[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]], 3488],
    [[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]], 4140]
];

describe('magnitude tests', () => {
    test.each(magnitudeCases)('given %p as the snailfish number, returns a magnitude of %p', (argument, expectedResult) => {
        const snailFishNumber = new Pair(argument);
        expect(snailFishNumber.magnitude).toEqual(expectedResult);
    })
})

const explodeCases: [NestedArray, NestedArray][] = [
    [[[[[[9,8],1],2],3],4], [[[[0,9],2],3],4]],
    [[7,[6,[5,[4,[3,2]]]]], [7,[6,[5,[7,0]]]]],
    [[[6,[5,[4,[3,2]]]],1], [[6,[5,[7,0]]],3]],
    [[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]], [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]],
    [[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]], [[3,[2,[8,0]]],[9,[5,[7,0]]]]]
];

describe('explode tests', () => {
    test.each(explodeCases)('given %p as the snailfish number, returns exploded as %p', (argument, expectedResult) => {
        let snailfishNumber = new Pair(argument);
        console.log(tryExplode(snailfishNumber));
        expect(snailfishNumber).toEqual(new Pair(expectedResult));
    })
})

const splitCases: [NestedArray, NestedArray][] = [
    [[[[[0,7],4],[15,[0,13]]],[1,1]], [[[[0,7],4],[[7,8],[0,13]]],[1,1]]],
    [[[[[0,7],4],[[7,8],[0,13]]],[1,1]], [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]]
];

describe('split tests', () => {
    test.each(splitCases)('given %p as the snailfish number, returns split as %p', (argument, expectedResult) => {
        let snailfishNumber = new Pair(argument);
        trySplit(snailfishNumber);
        expect(snailfishNumber).toEqual(new Pair(expectedResult));
    })
})

const reduceCases: [NestedArray, NestedArray][] = [
    [[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]], [[[[0,7],4],[[7,8],[6,0]]],[8,1]]],
    [[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]], [[3,[2,[8,0]]],[9,[5,[7,0]]]]],
    [[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]], [[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]]
];

describe('reduce tests', () => {
    test.each(reduceCases)('given %p as the snailfish number, returns reduced number %p', (argument, expectedResult) => {
        let snailfishNumber = new Pair(argument);
        reduce(snailfishNumber);
        expect(snailfishNumber).toEqual(new Pair(expectedResult));
    })
})