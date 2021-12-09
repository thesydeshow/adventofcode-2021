import { getLinesFromInput } from '../core/readInput'

function initFish(input: string[]): Promise<number[]>{
    let fish = Array(9).fill(0);
    input[0].split(',').map(x => Number(x)).forEach(x => {
        fish[x]++;
    })
    return Promise.resolve(fish);
}

function dayLapse(fish: number[]) {
    let newFish = fish[0];
    for(let i = 0; i < fish.length - 1; i++) {
        fish[i] = fish[i+1];
    }
    fish[8] = newFish;
    fish[6] += newFish;
}

function lapseDays(fish: number[], days: number): Promise<number[]> {
    for(let i = 0; i < days; i++) {
        dayLapse(fish);
    }
    return Promise.resolve(fish);
}

function getFishCount(fish: number[]): Promise<number> {
    const fishCount = fish.reduce((previous,current) => previous + current);
    return Promise.resolve(fishCount);
}

getLinesFromInput('../day06/input.txt').then(result => {
    return initFish(result);
}).then(result => {
    return lapseDays(result, 256);
}).then(result => {
    console.log(result);
    return getFishCount(result);
}).then(result => {
    console.log(result);
})