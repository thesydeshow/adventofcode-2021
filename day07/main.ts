import { getLinesFromInput } from '../core/readInput'

function getHorizontalPositions(lines: string[]): Promise<number[]> {
    return Promise.resolve(lines[0].split(',').map(x => Number(x)));
}

function getMedians(positions: number[]): number[] {
    const sortedPositions = positions.sort((a,b) => a - b);
    const medianIndex1 = Math.floor(positions.length / 2 + 0.5) - 1;
    const medianIndex2 = Math.ceil(positions.length / 2 + 0.5) - 1;
    console.log(medianIndex1, medianIndex2);

    return [sortedPositions[medianIndex1], sortedPositions[medianIndex2]];
}

function getFuelSpent(positions: number[], target: number): number {
    let fuelSpent = 0;
    positions.forEach( x => fuelSpent += Math.abs(x - target));

    return fuelSpent;
}

getLinesFromInput('../day07/input.txt').then(result => {
    return getHorizontalPositions(result);
}).then(result => {
    const medians = getMedians(result);
    console.log('medians:', medians);
    const answer1 = getFuelSpent(result, medians[0]);
    const answer2 = getFuelSpent(result, medians[1]);
    console.log('possible answers:', answer1, answer2);
})