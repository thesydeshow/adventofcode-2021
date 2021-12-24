import { parseInput, padImage, enhance, lightPixelCount } from '../src/main';

const padImageCases: [(0|1)[][], (0|1)[][]][] = [
    [[[1]], [[0,0,0],[0,1,0],[0,0,0]]],
    [[[0,0,0],[0,1,0],[0,0,0]], [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]]]
];

describe('padImage test', () => {
    test.each(padImageCases)('given %p as input image, returns %p image', (argument: (0|1)[][], expectedResult: (0|1)[][]) => {
        padImage(argument);
        expect(argument).toEqual(expectedResult);
    })
})

const algorithm = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##'
    + '#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###'
    + '.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.'
    + '.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....'
    + '.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..'
    + '...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....'
    + '..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#';

const image0: (0|1)[][] = [
    [1,0,0,1,0],
    [1,0,0,0,0],
    [1,1,0,0,1],
    [0,0,1,0,0],
    [0,0,1,1,1]
];

const image1: (0|1)[][] = [
    [0,1,1,0,1,1,0],
    [1,0,0,1,0,1,0],
    [1,1,0,1,0,0,1],
    [1,1,1,1,0,0,1],
    [0,1,0,0,1,1,0],
    [0,0,1,1,0,0,1],
    [0,0,0,1,0,1,0]
];

const image2: (0|1)[][] = [
    [0,0,0,0,0,0,0,1,0],
    [0,1,0,0,1,0,1,0,0],
    [1,0,1,0,0,0,1,1,1],
    [1,0,0,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,1],
    [0,1,0,1,1,1,1,1,0],
    [0,0,1,0,1,1,1,1,1],
    [0,0,0,1,1,0,1,1,0],
    [0,0,0,0,1,1,1,0,0]
];

describe('enhance tests', () => {
    test('given input image0 and sample algorithm, returns image1', () => {
        const result = enhance(image0, algorithm);
        expect(result).toEqual(image1);
    })
    test('given input image1 and sample algorithm, returns image2', () => {
        const result = enhance(image1, algorithm);
        expect(result).toEqual(image2);
    })
})

describe('lightPixelCount tests', () => {
    test.each([[image0, 10], [image1, 24], [image2, 35]])('given input image %p, returns light pixel count of %p', (argument, expectedResult) => {
        const result = lightPixelCount(argument);
        expect(result).toEqual(expectedResult);
    })
})