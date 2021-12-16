import { getLinesFromInput } from '../core/readInput';
import { join } from 'path';

function getInsertions(lines: string[]): string[][] {
    return lines.map(l => l.split(' -> '));
}

/* failed attempt #1
function doInsertionStep(polymer: string, insertions: string[][]): string {
    for(let i = polymer.length-1; i > 0; i--) {
        const rule = insertions.filter(x => x[0] == polymer.substring(i-1, i+1))[0];
        polymer = stringSplice(polymer, i, 0, rule[1]);
    }

    return polymer;
}

function stringSplice(input: string, start: number, deleteCount: number, items: string): string {
    return `${input.slice(0, start)}${items}${input.slice(start+deleteCount)}`;
}

function groupByElement(polymer: string): number[] {
    return polymer.split('').reduce((p,c) => (p[c] = (p[c] || 0) + 1, [], p), Object.create(null));
}
*/

/* failed attempt #2... and 3 and 4 and 5
function doInsertFill(polymer: string[]): string[] {
    const brokedUp = polymer.map(x => x.length > 20000 ? [x.slice(0, 10000), x.slice(10000)] : x).flat();
    return brokedUp.map((x,i) => (i === 0 ? '' : brokedUp[i-1].substring(brokedUp[i-1].length-1)) + x.replace(/([A-Z])/g, '_$1'));
}

function doReplaceFill(polymer: string[], insertions: string[][]): string[] {
    insertions.map(x => [...x[0].split(''), x[1]]).forEach(x => {
        const matchString = new RegExp(`${x[0]}_(?=${x[1]})`, 'g');
        const replaceString = `${x[0]}${x[2]}`;
        polymer = polymer.map(x => x.replace(matchString, replaceString));
    });
    return polymer.map(x => x.slice(1));
}
*/

function initializePolymer(polymer: string): Record<string,Record<string,number>> {
    let result: Record<string,Record<string,number>> = {};
    for(let i = 0; i < polymer.length; i++) {
        if(!result[polymer[i]]) {
            result[polymer[i]] = {};
        }
        result[polymer[i]][(polymer[i+1] || '')] = (result[polymer[i]][(polymer[i+1] || '')] || 0) + 1;
    }

    return result;
}

function doInsertionStep(polymer: Record<string,Record<string,number>>, insertions: string[][]): Record<string,Record<string,number>> {
    let result: Record<string,Record<string,number>> = {};
    
    for(let a in polymer) {
        for(let b in polymer[a]) {            
            if(!result[a]) {
                result[a] = {...polymer[a]};
            }

            if(!b) {
                // used to signify the last character in the polymer string
                result[a][b] = polymer[a][b];
                continue;
            }

            const rule = insertions.filter(x => x[0] == a + b)[0];
            if(!result[rule[1]]) {
                result[rule[1]] = {...polymer[rule[1]]};
            }
            
            result[a][rule[1]] = (result[a][rule[1]] || 0) + polymer[a][b];
            result[rule[1]][b] = (result[rule[1]][b] || 0) + polymer[a][b];
            result[a][b] -= polymer[a][b];
        }
    }

    return result;
}

function doInsertions(polymer: string, insertions: string[][], iterations: number): Record<string,Record<string,number>> {
    let result = initializePolymer(polymer);
    for(let i = 0; i < iterations; i++) {
        console.time(`insert${i}`);
        result = doInsertionStep(result, insertions);
        console.timeEnd(`insert${i}`)
    }
    return result;
}

function aggregate(polymer: Record<string,Record<string,number>>): [string,number][] {
    let result: [string,number][] = [];
    for(let a in polymer) {
        let count = 0;
        for(let b in polymer[a]) {
            count += polymer[a][b];
        }
        result.push([a,count]);
    }
    return result;
}

function max(letters: [string,number][]): number {
    return Math.max(...letters.map(x => x[1]));
}

function min(letters: [string,number][]): number {
    return Math.min(...letters.map(x => x[1]));
}


function part1(inputFilename: string) {
    getLinesFromInput(join('..', 'day14', inputFilename)).then(result => {
        let polymer = result.splice(0, 2)[0];
        const insertions = getInsertions(result);
        const newPolymer = doInsertions(polymer, insertions, 10);
        const counts = aggregate(newPolymer);
        const answer = max(counts) - min(counts);
        console.log('answer:', answer);
    });
}

function part2(inputFilename: string) {
    getLinesFromInput(join('..', 'day14', inputFilename)).then(result => {
        let polymer = result.splice(0, 2)[0];
        const insertions = getInsertions(result);
        const newPolymer = doInsertions(polymer, insertions, 40);
        const counts = aggregate(newPolymer);
        const answer = max(counts) - min(counts);
        console.log('answer:', answer);
    });
}

part2('input.txt');