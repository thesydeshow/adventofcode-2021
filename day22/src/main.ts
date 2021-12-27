export function doReboot(commands: string[], regionRange: [number, number]): boolean[][][] {
    const cleanSlate = prepReboot(regionRange);
    let region = cleanSlate.region;
    for(let i = 0; i < commands.length; i++) {
        const matches = commands[i].match(/(on|off) x=(\-?\d+)\.\.(\-?\d+),y=(\-?\d+)\.\.(\-?\d+),z=(\-?\d+)\.\.(\-?\d+)/) || [];
        changeCuboidState(region, matches[1] === 'on', [Number(matches[2]), Number(matches[3])], [Number(matches[4]), Number(matches[5])], [Number(matches[6]), Number(matches[7])], cleanSlate.offSets);
    }
    return region;
}

function changeCuboidState(region: boolean[][][], newState: boolean, xRange: [number, number], yRange: [number, number], zRange: [number, number], offsets: [number, number, number]) {
    xRange = [Math.max(xRange[0] + offsets[0], 0), Math.min(xRange[1] + offsets[0], region.length)];
    yRange = [Math.max(yRange[0] + offsets[1], 0), Math.min(yRange[1] + offsets[1], region[0].length)];
    zRange = [Math.max(zRange[0] + offsets[2], 0), Math.min(zRange[1] + offsets[2], region[0][0].length)];

    for(let x = xRange[0]; x <= xRange[1]; x++) {
        for(let y = yRange[0]; y <= yRange[1]; y++) {
            for(let z = zRange[0]; z <= zRange[1]; z++) {
                if(region[x] === undefined || region[x][y] === undefined || region[x][y][z] === undefined) throw new Error('this should never happen');
                region[x][y][z] = newState;
            }
        }
    }
}

function prepReboot(regionRange: [number, number]): {region: boolean[][][], offSets: [number, number, number]} {
    const size = regionRange[1] - regionRange[0] + 1;
    const region = [...Array(size)].map(x => [...Array(size)].map(x => [...Array(size)].fill(false)));
    return {region, offSets: [0 - regionRange[0], 0 - regionRange[0], 0 - regionRange[0]]};
}

export function countCubes(region: boolean[][][]): number {
    return region.flat(2).filter(x => x).length;
}