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

export {
    findScanner
}