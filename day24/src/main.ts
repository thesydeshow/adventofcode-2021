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

function alu(input: number, ops: string[]): {[key: string]: number} {
    let vars: {[key: string]: number} = {'w': 0, 'x': 0, 'y': 0, 'z': 0};
    let digits = input.toString().split('').map(Number);

    for(let i = 0; i < ops.length; i++) {
        const args = ops[i].split(' ');
        if(args.length === 2) {
            vars[args[1]] = doOp(args[0], digits.unshift());
        } else if (args.length === 3) {
            vars[args[1]] = doOp(args[0], vars[args[1]], vars[args[2]]);
        } else {
            throw new Error(`invalid op: ${ops[i]}`);
        }
    }

    return vars;
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
    do {
        const output = alu(modelNumber, lines);
        if(MONAD(output)) return modelNumber;
        if(!(modelNumber % 1000000)) console.log(`modelNumber at ${modelNumber}...`);
    } while(--modelNumber >= 10000000000000)

    throw new Error('no valid model number');
}