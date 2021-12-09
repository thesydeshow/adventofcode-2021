import { getLinesFromInput } from '../core/readInput'

function initFish(input: string[]): Promise<number[]>{
    const fish = input[0].split(',').map(x => Number(x));
    return Promise.resolve(fish);
}

function dayLapse(fish: number[]) {
    const fishCount = fish.length;
    for(let i = 0; i < fishCount; i++) {
        if(fish[i] === 0) {
            fish[i] = 6;
            fish.push(8);
        } else {
            fish[i]--;
        }
    }
}

function lapseDays(fish: number[], days: number): Promise<number[]> {
    for(let i = 0; i < days; i++) {
        dayLapse(fish);
    }

    return Promise.resolve(fish);
}

getLinesFromInput('../day06/sample.txt').then(result => {
    return initFish(result);
}).then(result => {
    lapseDays(result, 80);
    console.log('answer:', result.length);
})