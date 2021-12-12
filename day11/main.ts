import { getLinesFromInput } from '../core/readInput';

function getEnergyLevels(lines: string[]): number[][] {
    return lines.map(x => x.split('').map(x => Number(x)));
}

function tick(energyLevels: number[][]) {
    for(let i = 0; i < energyLevels.length; i++) {
        for(let j = 0; j < energyLevels[i].length; j++) {
            powerUp(i, j, energyLevels);
        }
    }
}

function tock(energyLevels: number[][]): number {
    let flashes = 0;
    for(let i = 0; i < energyLevels.length; i++) {
        for(let j = 0; j < energyLevels[i].length; j++) {
            if(energyLevels[i][j] > 9) {
                flashes++;
                energyLevels[i][j] = 0;
            }
        }
    }

    return flashes;
}

function powerUp(x: number, y: number, energyLevels: number[][]) {
    energyLevels[x][y]++;
    if(energyLevels[x][y] === 10) {
        lit(x, y, energyLevels);
    }
}

function lit(x: number, y: number, energyLevels: number[][]) {
    const minX = Math.max(0, x-1);
    const maxX = Math.min(energyLevels.length-1, x+1);
    const minY = Math.max(0, y-1);
    const maxY = Math.min(energyLevels[x].length-1, y+1);

    for(let i = minX; i <= maxX; i++) {
        for(let j = minY; j <= maxY; j++) {
            if(x === i && y === j) continue;
            powerUp(i, j, energyLevels);
        }
    }
}

function part1(inputPath: string) {
    getLinesFromInput(inputPath).then(result => {
        let energyLevels = getEnergyLevels(result);
        let flashes = 0;

        for(let i = 0; i < 100; i++) {
            tick(energyLevels);
            flashes += tock(energyLevels);
        }

        console.log('answer:', flashes);
    })
}

part1('../day11/input.txt')