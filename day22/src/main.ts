import { Cuboid } from './classes';

function getCommands(commandLines: string[]): {newState: boolean, cuboid: Cuboid}[] {
    return commandLines.map(line => {
        const matches = line.match(/(on|off) x=(\-?\d+)\.\.(\-?\d+),y=(\-?\d+)\.\.(\-?\d+),z=(\-?\d+)\.\.(\-?\d+)/) || [];
        return {
            newState: matches[1] === 'on',
            cuboid: new Cuboid(Number(matches[2]), Number(matches[3]), Number(matches[4]), Number(matches[5]), Number(matches[6]), Number(matches[7]))
        };
    });
}

export function doReboot(commandLines: string[], regionRange: [number, number]): boolean[][][] {
    const commands = getCommands(commandLines);
    const cleanSlate = prepReboot(regionRange);
    let region = cleanSlate.region;
    for(let i = 0; i < commands.length; i++) {
        changeCuboidState(region, commands[i].newState, commands[i].cuboid, cleanSlate.offSets);
    }
    
    return region;
}

function changeCuboidState(region: boolean[][][], newState: boolean, cuboid: Cuboid, offsets: [number, number, number]) {
    const xRange = [Math.max(cuboid.x0 + offsets[0], 0), Math.min(cuboid.x1 + offsets[0], region.length)];
    const yRange = [Math.max(cuboid.y0 + offsets[1], 0), Math.min(cuboid.y1 + offsets[1], region[0].length)];
    const zRange = [Math.max(cuboid.z0 + offsets[2], 0), Math.min(cuboid.z1 + offsets[2], region[0][0].length)];

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

export function doBigBoyReboot(commandLines: string[]): number {
    const commands = getCommands(commandLines);

    let poweredOn: Cuboid[] = [];
    for(let i = 0; i < commands.length; i++) {
        for(let j = poweredOn.length - 1; j >= 0; j--) {
            if(poweredOn[j].intersects(commands[i].cuboid)) {
                poweredOn.splice(j, 1);
            }
        }

        if(!commands[i].newState) continue;

        let theseCuboids: Cuboid[] = [commands[i].cuboid];
        for(let k = i + 1; k < commands.length; k++) {
            for(let l = theseCuboids.length - 1; l >= 0; l--) {
                if(theseCuboids[l].intersects(commands[k].cuboid)) {
                    theseCuboids.splice(l, 1, ...theseCuboids[l].split(commands[k].cuboid));
                }
            }
        }
        poweredOn.push(...theseCuboids);
    }

    const totalArea = poweredOn.reduce((p,c) => p + c.area, 0);
    return totalArea;
}