import { getLinesFromInput } from '../core/readInput';
import { flipMatrix } from '../core/twoDimensionalUtils';
import { join } from 'path';

function getDots(lines: string[]): boolean[][]{
    const coordinates = lines.filter(x => x.includes(',')).map(x => x.split(',')).map(x => [Number(x[0]), Number(x[1])]);
    const maxX = Math.max(...coordinates.map(x => x[0]));
    const maxY = Math.max(...coordinates.map(x => x[1]));

    let dots: boolean[][] = Array(maxX+1).fill('').map(x => Array(maxY+1).fill(false));
    coordinates.forEach(x => dots[x[0]][x[1]] = true);
    return dots;
}

function getFolds(lines: string[]): Fold[] {
    return lines.filter(x => x.startsWith('fold along')).map(x => x.replace('fold along ', '').split('=')).map(x => <Fold>{axis: x[0], value: Number(x[1])});
}

function doFold(dots: boolean[][], fold: Fold): boolean[][] {
    if(fold.axis == 'y') {
        dots = flipMatrix(dots);
    }
    
    let newDots = dots.slice(0, fold.value);
    for(let i = 1; i < dots.length - fold.value; i++) {
        for(let j = 0; j < newDots[0].length; j++) {
            newDots[fold.value-i][j] ||= dots[fold.value+i][j];
        }
    }

    if(fold.axis == 'y') {
        newDots = flipMatrix(newDots);
    }

    return newDots;
}

function part1(inputFilename: string) {
    getLinesFromInput(join('..', 'day13', inputFilename)).then(result => {
        let dots = getDots(result);
        const folds = getFolds(result);

        // folds.forEach(fold => {
        //     console.log('fold:', fold);
        //     dots = doFold(dots, fold);
        //     console.log('dots:', dots);
        // })
        dots = doFold(dots, folds[0]);

        const answer = dots.flat().filter(x => x).length;
        console.log('answer:', answer);
    });
}

function part2(inputFilename: string) {
    getLinesFromInput(join('..', 'day13', inputFilename)).then(result => {
        let dots = getDots(result);
        const folds = getFolds(result);

        folds.forEach(fold => {
            dots = doFold(dots, fold);
        })

        console.log();
        flipMatrix(dots).forEach(x => {
            console.log(...x.map(dot => dot ? '#' : ' '));
        })
        console.log();
    });
}

part2('input.txt')