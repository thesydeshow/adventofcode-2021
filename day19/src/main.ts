function findScanner(knownBeacons: [number, number, number][], scannersBeacon: [number, number, number][]): [number, number, number] | undefined {
    const perspectives = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
    const orientations = [[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]];
    //todo: figure out how to bring perspectives x orientations from 48 to 24

    for(let i = 0; i < knownBeacons.length - 11; i++) {
        for(let j = 0; j < scannersBeacon.length; j++) {
            for(let perspective of perspectives) {
                for(let orientation of orientations){
                    const delta: [number, number, number] = [
                        knownBeacons[i][0] - orientation[0] * scannersBeacon[j][perspective[0]],
                        knownBeacons[i][1] - orientation[1] * scannersBeacon[j][perspective[1]],
                        knownBeacons[i][2] - orientation[2] * scannersBeacon[j][perspective[2]]
                    ];

                    const shiftedBeacons: [number, number, number][] = scannersBeacon.map(
                        b => [
                            orientation[0] * b[perspective[0]] + delta[0],
                            orientation[1] * b[perspective[1]] + delta[1],
                            orientation[2] * b[perspective[2]] + delta[2]
                        ]);

                    const overlaps = shiftedBeacons.filter(b => knownBeacons.some(kb => kb.every((value,index) => value === b[index])));
                    if(overlaps.length >= 12) {
                        const newBeacons = shiftedBeacons.filter(b => overlaps.indexOf(b) === -1);
                        knownBeacons.push(...newBeacons);
                        return delta;
                    }
                }
            }
        }
    }

    return;
}

function getManhattanDistance(from: [number, number, number], to: [number, number, number]): number {
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]) + Math.abs(from[2] - to[2]);
}

function getLongestManhattanDistance(scanners: [number, number, number][]): number {
    let distances = [];
    for(let i = 0; i < scanners.length - 1; i++) {
        for(let j = i + 1; j < scanners.length; j++) {
            distances.push(getManhattanDistance(scanners[i], scanners[j]));
        }
    }

    return distances.sort((a,b) => b - a)[0];
}

function findAllBeacons(scannersBeacons: [number, number, number][][]): {scanners: [number, number, number][], beacons: [number, number, number][]} {
    let knownBeacons = scannersBeacons.shift() || [];
    let knownScanners: [number, number, number][] = [[0,0,0]];

    while(scannersBeacons.length) {
        for(let i = scannersBeacons.length - 1; i >= 0; i--) {
            const scanner = findScanner(knownBeacons, scannersBeacons[i]);
            if(scanner) {
                scannersBeacons.splice(i, 1);
                knownScanners.push(scanner);
            }
        }
    }

    return {scanners: knownScanners, beacons: knownBeacons };
}

function collectScannerData(lines: string[]): [number, number, number][][] {
    let data: [number, number, number][][] = [];
    for(let line of lines) {
        if(!line) continue;
        if(line.startsWith('---')) {
            data.push([]);
            continue;
        }
        const coords = line.split(',').map(x => Number(x));
        data[data.length-1].push([coords[0], coords[1], coords[2]]);
    }
    return data;
}


export {
    findScanner,
    findAllBeacons,
    collectScannerData,
    getManhattanDistance,
    getLongestManhattanDistance
}