import { getLinesFromInput } from '../core/readInput'
import { join } from 'path'

function getConnections(lines: string[]): string[][] {
    const forwardPaths = lines.map(x => x.split('-'));
    const backwardPaths = forwardPaths.filter(x => x[0] !== 'start' && x[1] !== 'end').map(x => [x[1], x[0]]);
    return forwardPaths.concat(backwardPaths);
}

function getAllPaths(connections: string[][], allPaths: string[][]) {
    let more: boolean = false;
    let badPaths: string[][] = [];

    for(let path in allPaths) {
        const start = allPaths[path][allPaths[path].length-1];
        if(start === 'end') continue;
        
        const traversableCaves = connections.filter(x => x[0] === start).map(x => x[1]).filter(x => !(x.toLowerCase() === x && allPaths[path].indexOf(x) !== -1));
        if(!traversableCaves.length) badPaths.push(allPaths[path]);
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
    
    badPaths.forEach(x => {
        allPaths.splice(allPaths.indexOf(x), 1);
    })

    if(more) getAllPaths(connections, allPaths);
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

part1('input.txt')