import { getLinesFromInput } from '../core/readInput';
import { join } from 'path';
import { Dijkstra } from './classes';

function getNodes(lines: string[]): Dijkstra[][] {
    let result = lines.map((line,i) => line.split('').map((risk,j) => new Dijkstra(i, j, Number(risk))));
    result[0][0].distance = 0;
    return result;
}

function decideDestination(nodes: Dijkstra[][], currentNode: Dijkstra): Dijkstra {
    // left
    if(currentNode.x > 0) {
        const leftNode = nodes[currentNode.x-1][currentNode.y];
        if(!leftNode.visited && leftNode.distance > currentNode.distance + leftNode.riskLevel) {
            leftNode.distance = currentNode.distance + leftNode.riskLevel;
            leftNode.previousNode = currentNode;
        }
    }

    // right
    if(currentNode.x < nodes.length - 1) {
        const rightNode = nodes[currentNode.x+1][currentNode.y];
        if(!rightNode.visited && rightNode.distance > currentNode.distance + rightNode.riskLevel) {
            rightNode.distance = currentNode.distance + rightNode.riskLevel;
            rightNode.previousNode = currentNode;
        }
    }

    // up
    if(currentNode.y > 0) {
        const upNode = nodes[currentNode.x][currentNode.y-1]; // what's upNode?
        if(!upNode.visited && upNode.distance > currentNode.distance + upNode.riskLevel) {
            upNode.distance = currentNode.distance + upNode.riskLevel;
            upNode.previousNode = currentNode;
        }
    }

    // down
    if(currentNode.y < nodes[currentNode.y].length - 1) {
        const downNode = nodes[currentNode.x][currentNode.y+1];
        if(!downNode.visited && downNode.distance > currentNode.distance + downNode.riskLevel) {
            downNode.distance = currentNode.distance + downNode.riskLevel;
            downNode.previousNode = currentNode;
        }
    }

    currentNode.visited = true;

    return nodes.flat().filter(x => !x.visited).sort((a,b) => a.distance - b.distance)[0];
}

function traverseNodes(nodes: Dijkstra[][]): Dijkstra {
    let current: Dijkstra = nodes[0][0];
    const maxX = nodes.length - 1;
    const maxY = nodes[maxX].length - 1;

    while(current.x !== maxX || current.y !== maxY) {
        current = decideDestination(nodes, current);
    }

    return current;
}

function part1(inputFilename: string) {
    getLinesFromInput(join('..', 'day15', inputFilename)).then(lines => {
        console.time('stopwatch');
        const nodes = getNodes(lines);
        const finalNode = traverseNodes(nodes);
        const answer = finalNode.distance;
        console.log('answer:', answer);
        console.timeEnd('stopwatch');
    });
}

part1('input.txt');
