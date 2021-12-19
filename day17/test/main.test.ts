import { part1 } from '../src/main';

const part1Samples = [
    ['target area: x=20..30, y=-10..-5', 45]
]

describe('part 1 samples', () => {
    test.each(part1Samples)('given %p as part 1 input, returns max y of %p', (argument, expectedResult) => {
        const result = part1(<string>argument);
        expect(result).toEqual(expectedResult);
    })
})