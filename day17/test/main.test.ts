import { getMaxHeight, part1, part2 } from '../src/main';

const part1Samples = [
    ['target area: x=20..30, y=-10..-5', 45],
    ['target area: x=253..280, y=-73..-46', 2628]
]

describe('max height tests', () => {
    test.each([[-10, 45], [0,0], [-1,0], [-2, 1], [-73,2628]])('given %p as min y, returns max height of %p', (argument, expectedResult) => {
        const result = getMaxHeight(argument);
        expect(result).toEqual(expectedResult);
    })
})

describe('part 1 samples', () => {
    test.each(part1Samples)('given %p as part 1 input, returns max height of %p', (argument, expectedResult) => {
        const result = part1(<string>argument);
        expect(result).toEqual(expectedResult);
    })
    test('given invalid input as part 1 input, throws error', () => {
        expect(() => {part1('target area: y=20..30, x=-10..-5')}).toThrow();
    })
})

const part2Samples = [
    ['target area: x=20..30, y=-10..-5', 112],
    ['target area: x=253..280, y=-73..-46', 1334]
]

describe('part 2 samples', () => {
    test.each(part2Samples)('given %p as part 2 input, returns total starting velocities of %p', (argument, expectedResult) => {
        const result = part2(<string>argument);
        expect(result).toEqual(expectedResult);
    })
})
