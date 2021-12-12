import { getLinesFromInput } from '../core/readInput'

function getDepthChart(lines: string[]): number[][] {
    return lines.map(x => x.split('').map(y => Number(y)));
}

function isLowest(x: number, y: number, chart: number[][]): boolean {
    if(x > 0 && chart[x-1][y] <= chart[x][y]) return false;
    if(x < chart.length-1 && chart[x+1][y] <= chart[x][y]) return false;
    if(y > 0 && chart[x][y-1] <= chart[x][y]) return false;
    if(y < chart[x].length-1 && chart[x][y+1] <= chart[x][y]) return false;

    return true;
}

function getLowestPoints(chart: number[][]): number[] {
    let lowestPoints: number[] = [];
    for(let i = 0; i < chart.length; i++) {
        for(let j = 0; j < chart[i].length; j++) {
            if(isLowest(i, j, chart)) lowestPoints.push(chart[i][j]);
        }
    }

    return lowestPoints;
}

function part1(inputPath: string) {
    getLinesFromInput(inputPath).then(result => {
        const depthChart = getDepthChart(result);
        console.log('depthChart:', depthChart);
        const lowestPoints = getLowestPoints(depthChart);
        console.log('lowestPoints:', lowestPoints);
        const answer = lowestPoints.reduce((p,c) => p + c + 1, 0);
        console.log('answer:', answer);
    })
}

part1('../day09/input.txt')