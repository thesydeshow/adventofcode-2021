function doOp(operation: string, a: number, b: number | undefined = undefined): number {
    switch(operation) {
        case 'inp':
            return a;
        case 'add':
            return a + b!;
        case 'mul':
            return a * b!;
        case 'div':
            return Math.floor(a / b!);
        case 'mod':
            return a % b!;
        case 'eql':
            return a === b ? 1 : 0;
        default:
            throw new Error('invalid operation');
    }
}

function alu(input: number, ops: string[], vars: {[key: string]: number}) {
    let digits = input.toString().split('').map(Number);

    for(let i = 0; i < ops.length; i++) {
        const args = ops[i].split(' ');
        if(args.length === 2) {
            const digit = digits.shift();
            if(!digit) throw new Error(`invalid input: ${input}`);
            vars[args[1]] = doOp(args[0], digit);
        } else if (args.length === 3) {
            vars[args[1]] = doOp(args[0], vars[args[1]], vars[args[2]] ?? Number(args[2]));
        } else {
            throw new Error(`invalid op: ${ops[i]}`);
        }
    }
}

function MONAD(vars: {[key: string]: number}): boolean {
    return vars['z'] === 0;
}

export function bruteForceMONAD(lines: string[]): number {
    /**
     * this obviously won't work. plus it has a few flaws:
     *    a. it tries model numbers containing zeros, which aren't part of the answer
     *    b. it runs the first 13 "sections" of the commands 10 times when it only needs to be run once
     */
    let modelNumber = 99999999999999;
    let vars: {[key: string]: number} = {'w': 0, 'x': 0, 'y': 0, 'z': 0};
    do {
        alu(modelNumber, lines, vars);
        if(MONAD(vars)) return modelNumber;
        if(!(modelNumber % 1000000)) {
            console.timeLog();
            console.log(`modelNumber at ${modelNumber}...`);
        }
    } while(--modelNumber >= 10000000000000)

    throw new Error('no valid model number');
}

export async function segmentedBruteForceMONAD(lines: string[], vars: {[key: string]: number} = {'w': 0, 'x': 0, 'y': 0, 'z': 0}, numbersSoFar: number = 0): Promise<number | undefined> {
    let remainingLines = [...lines];
    const nextInput = remainingLines.map( x => x.replace(/\s.+$/, '')).indexOf('inp', 1);
    const subOps = remainingLines.splice(0, nextInput === -1 ? remainingLines.length : nextInput);
    for(let i = 9; i > 0; i--) {
        let io = {'w': vars['w'], 'x': vars['x'], 'y': vars['y'], 'z': vars['z']};
        alu(i, subOps, io);
        if(remainingLines.length) {
            const subResult = await segmentedBruteForceMONAD(remainingLines, io, numbersSoFar * 10 + i);
            if(subResult) {
                return Promise.resolve(Number(i.toString() + subResult.toString()));
            }
        } else if(MONAD(io)) {
            return Promise.resolve(i);
        }
    }
    
    return Promise.resolve(undefined);
}