import { getLinesFromInput } from '../core/readInput'

function getHorizontalPositions(lines: string[]): Promise<number[]> {
    return Promise.resolve(lines[0].split(',').map(x => Number(x)));
}

function getMedians(positions: number[]): number {
    const sortedPositions = positions.sort((a,b) => a - b);
    const medianIndex = Math.ceil(positions.length / 2) - 1;

    return sortedPositions[medianIndex];
}

function getFuelSpent(positions: number[], target: number): number {
    let fuelSpent = 0;
    positions.forEach( x => fuelSpent += Math.abs(x - target));

    return fuelSpent;
}

function getExponentialFuelSpent(position: number, target: number): number {
    const distance = Math.abs(position - target);
    const fuelSpent = 0.5 * distance * ( distance + 1 );
    return fuelSpent;
}

function getTotalFuelSpent(positions: number[], target: number): number {
    return positions.reduce((previous,current) => previous + getExponentialFuelSpent(current, target), 0);
}

function getMinTotalFuelSpent(positions: number[], median: number): number {
    let newGuess = getTotalFuelSpent(positions, median);
    let previousGuess: number;
    console.log(median, '=>', newGuess);
    
    do {
        previousGuess = newGuess;
        median++;
        newGuess = getTotalFuelSpent(positions, median);
        console.log(median, '=>', newGuess);
    } while(previousGuess > newGuess)
    
    return previousGuess;
}

getLinesFromInput('../day07/input.txt').then(result => {
    return getHorizontalPositions(result);
}).then(result => {
    const median = getMedians(result);
    console.log('median:', median);
    const answer = getFuelSpent(result, median);
    console.log('answer:', answer);
    const crabsAnswer = getMinTotalFuelSpent(result, median);
    console.log('answer:', crabsAnswer);
})