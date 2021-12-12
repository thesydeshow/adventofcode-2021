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

function mapBasin(x: number, y: number, chart: [number,boolean][][]): number {
    if(chart[x][y][0] >= 9 || chart[x][y][1]) {
        return 0;
    }

    let i: number = 1;
    chart[x][y][1] = true;

    if(x > 0 && chart[x-1][y][0] < 9 && !chart[x-1][y][1]) {
        i += mapBasin(x-1, y, chart);
    }
    if(x < chart.length-1 && chart[x+1][y][0] <= 9 && !chart[x+1][y][1]) {
        i += mapBasin(x+1, y, chart);
    }
    if(y > 0 && chart[x][y-1][0] < 9 && !chart[x][y-1][1]) {
        i += mapBasin(x, y-1, chart);
    }
    if(y < chart[x].length-1 && chart[x][y+1][0] < 9 && !chart[x][y+1][1]) {
        i += mapBasin(x, y+1, chart);
    }

    return i;
}

function getBasinSizes(chart: number[][]): number[] {
    let basinSizes: number[] = [];
    for(let i = 0; i < chart.length; i++) {
        for(let j = 0; j < chart[i].length; j++) {
            if(isLowest(i, j, chart)) basinSizes.push(mapBasin(i, j, chart.map(x => x.map(y => [y,false]))));
        }
    }

    return basinSizes;
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

function part2(inputPath: string) {
    getLinesFromInput(inputPath).then(result => {
        const depthChart = getDepthChart(result);
        const basinSizes = getBasinSizes(depthChart);
        console.log('basinSizes:', basinSizes);
        const answer = basinSizes.sort((a,b) => b - a).filter((x,i) => i < 3).reduce((p,c) => p * c, 1);
        console.log('answer:', answer);
    })
}

part2('../day09/input.txt')