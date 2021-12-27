export function doReboot(commandLines: string[], regionRange: [number, number] | undefined = undefined): boolean[][][] {
    const commands = commandLines.map(line => {
        const matches = line.match(/(on|off) x=(\-?\d+)\.\.(\-?\d+),y=(\-?\d+)\.\.(\-?\d+),z=(\-?\d+)\.\.(\-?\d+)/) || [];
        return {
            newState: matches[1] === 'on',
            xRange: <[number, number]>[Number(matches[2]), Number(matches[3])],
            yRange: <[number, number]>[Number(matches[4]), Number(matches[5])],
            zRange: <[number, number]>[Number(matches[6]), Number(matches[7])]
        };
    });
    
    const cleanSlate = regionRange ? prepReboot(regionRange) : prepReboot(
        [Math.min(...commands.map(x => x.xRange[0])), Math.max(...commands.map(x => x.xRange[0]))],
        [Math.min(...commands.map(x => x.yRange[0])), Math.max(...commands.map(x => x.yRange[0]))],
        [Math.min(...commands.map(x => x.zRange[0])), Math.max(...commands.map(x => x.zRange[0]))]);
    let region = cleanSlate.region;
    for(let i = 0; i < commands.length; i++) {
        changeCuboidState(region, commands[i].newState, commands[i].xRange, commands[i].yRange, commands[i].zRange, cleanSlate.offSets);
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
                region[x][y][z] = newState;
            }
        }
    }
}

function prepReboot(xRange: [number, number], yRange: [number, number] = xRange, zRange: [number, number] = xRange): {region: boolean[][][], offSets: [number, number, number]} {
    const xSize = xRange[1] - xRange[0] + 1;
    const ySize = yRange[1] - yRange[0] + 1;
    const zSize = zRange[1] - zRange[0] + 1;
    const region = [...Array(xSize)].map(x => [...Array(ySize)].map(x => [...Array(zSize)]));
    return {region, offSets: [0 - xRange[0], 0 - yRange[0], 0 - zRange[0]]};
}

export function countCubes(region: boolean[][][]): number {
    return region.flat(2).filter(x => x).length;
}