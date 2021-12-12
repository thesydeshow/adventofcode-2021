import { getLinesFromInput } from '../core/readInput'
import { join } from 'path'

function getConnections(lines: string[]): string[][] {
    const forwardPaths = lines.map(x => x.split('-'));
    const backwardPaths = forwardPaths.map(x => [x[1], x[0]]);
    return forwardPaths.concat(backwardPaths).filter(x => x[1] !== 'start' && x[0] !== 'end');
}

function getAllPaths(connections: string[][], allPaths: string[][], smallCaveRevisits: number = 0) {
    let more: boolean = false;
    let badPaths: string[][] = [];

    for(let path in allPaths) {
        const start = allPaths[path][allPaths[path].length-1];
        if(start === 'end') continue;
        
        const traversableCaves = connections.filter(x => x[0] === start).map(x => x[1]).filter(x => x.toLowerCase() !== x || allPaths[path].indexOf(x) === -1 || allPaths[path].filter((c,i) => c.toLowerCase() === c && allPaths[path].indexOf(c) !== i).length < smallCaveRevisits);
        if(!traversableCaves.length) {
            allPaths.splice(Number(path), 1);
            continue;
        }
        traversableCaves.forEach((x,i) => {
            more = true;
            if(i === 0) {
                allPaths[path].push(x);
            } else {
                allPaths.push(allPaths[path].filter((p,j) => j < allPaths[path].length - 1));
                allPaths[allPaths.length-1].push(x);
            }
        });
    }

    if(more) getAllPaths(connections, allPaths, smallCaveRevisits);
}

function part1(inputPath: string) {
    getLinesFromInput(join('..', 'day12', inputPath)).then(result => {
        const connections = getConnections(result);
        let paths: string[][] = [['start']];
        getAllPaths(connections, paths);
        console.log('paths:', paths);
        console.log('answer:', paths.length);
    })
}

function part2(inputPath: string) {
    getLinesFromInput(join('..', 'day12', inputPath)).then(result => {
        const connections = getConnections(result);
        let paths: string[][] = [['start']];
        getAllPaths(connections, paths, 1);
        console.log('paths:', paths);
        console.log('answer:', paths.length);
    })
}

part2('sample-10.txt')