import { getLinesFromInput } from '../core/readInput';

function getVectors(lines: string[]): Promise<Vector[]> {
    const vectors = lines.map(x => getVector(x));
    return Promise.resolve(vectors);
}

function getVector(line: string): Vector {
    const parts = line.split(' -> ');
    const vector: Vector = {
        p0: getCoordinate(parts[0]),
        p1: getCoordinate(parts[1])
    }
    return vector;
}

function getCoordinate(point: string): Coordinate {
    const parts = point.split(',');
    const coordinate: Coordinate = {
        x: parseInt(parts[0]),
        y: parseInt(parts[1])
    }
    return coordinate;
}

function getBounds(vectors: Vector[]): Coordinate {
    const maxBounds: Coordinate = {
        x: Math.max(...vectors.map(vector => [vector.p0.x, vector.p1.x]).flat()),
        y: Math.max(...vectors.map(vector => [vector.p0.y, vector.p1.y]).flat())
    };
    return maxBounds;
}

function initMap(vectors: Vector[]): number[][] {
    const maxBounds = getBounds(vectors);
    let mapping: number[][] = Array(maxBounds.x + 1);
    for(let i = 0; i <= maxBounds.x; i++) {
        mapping[i] = new Array(maxBounds.y + 1).fill(0);
    }
    return mapping;
}

function isDiagonal(vector: Vector): boolean {
    return vector.p0.x !== vector.p1.x && vector.p0.y !== vector.p1.y;
}

function getMap(vectors: Vector[], considerDiagonals: boolean = false): Promise<number[][]> {
    let mapping: number[][] = initMap(vectors);

    vectors.filter(x => !isDiagonal(x)).forEach(vector => {
        const x = [vector.p0.x, vector.p1.x].sort((a,b) => a - b);
        const y = [vector.p0.y, vector.p1.y].sort((a,b) => a - b);
        for(let i = x[0]; i <= x[1]; i++) {
            for(let j = y[0]; j <= y[1]; j++) {
                mapping[i][j]++;
            }
        }
    });

    if(considerDiagonals) {
        vectors.filter(x => isDiagonal(x)).forEach(vector => {
            const coords = [vector.p0, vector.p1].sort((a,b) => a.x - b.x);
            for(let i = coords[0].x, j = coords[0].y; i <= coords[1].x; i++) {
                mapping[i][j]++;
                j += (coords[0].y > coords[1].y ? -1 : 1);
            }
        })
    }

    return Promise.resolve(mapping);
}

function countPointsWithLines(mapping: number[][], minLines: number): Promise<number> {
    const matchingPoints = mapping.flat().filter(x => x >= minLines);
    return Promise.resolve(matchingPoints.length);
}


getLinesFromInput('../day05/input.txt').then(result => {
    return getVectors(result);
}).then(result => {
    return getMap(result, true);
}).then(result => {
    console.log(result);
    return countPointsWithLines(result, 2);
}).then(result => {
    console.log('answer:', result);
})