import { Pair } from './classes';

function tryExplode(snailfishNumber: Pair): boolean {
    let explode = explodeGet(snailfishNumber);
    if(explode) {
        explodeAddLeft(snailfishNumber, <number>explode.left, explode.leftOrderRange[0] - 1);
        explodeAddRight(snailfishNumber, <number>explode.right, explode.rightOrderRange[0] + 1);
        applyOrdering(snailfishNumber);
        return true;
    }
    return false;
}

function explodeGet(pair: Pair): Pair | undefined {
    if(pair.left instanceof Pair) {
        if(pair.left.depth === 4) {
            const exploded = pair.left;
            pair.left = 0;
            return exploded;
        }
        const exploded = explodeGet(pair.left);
        if(exploded) {
            return exploded;
        }
    }

    if(pair.right instanceof Pair) {
        if(pair.right.depth === 4) {
            const exploded = pair.right;
            pair.right = 0;
            return exploded;
        }
        const exploded = explodeGet(pair.right);
        if(exploded) {
            return exploded;
        }
    }

    return;
}

function explodeAddLeft(pair: Pair, left: number, leftIndex: number) {
    if(typeof pair.left === 'number' && leftIndex === pair.leftOrderRange[0]) {
        pair.left += left;
    } else if(typeof pair.right === 'number' && leftIndex === pair.rightOrderRange[0]) {
        pair.right += left;
    } else if(pair.leftOrderRange[0] <= leftIndex && leftIndex <= pair.leftOrderRange[1]) {
        explodeAddLeft(<Pair>pair.left, left, leftIndex);
    } else if(pair.rightOrderRange[0] <= leftIndex && leftIndex <= pair.rightOrderRange[1]) {
        explodeAddLeft(<Pair>pair.right, left, leftIndex);
    }
}

function explodeAddRight(pair: Pair, right: number, rightIndex: number) {
    if(typeof pair.left === 'number' && rightIndex === pair.leftOrderRange[0]) {
        pair.left += right;
    } else if(typeof pair.right === 'number' && rightIndex === pair.rightOrderRange[0]) {
        pair.right += right;
    } else if(pair.leftOrderRange[0] <= rightIndex && rightIndex <= pair.leftOrderRange[1]) {
        explodeAddRight(<Pair>pair.left, right, rightIndex);
    } else if(pair.rightOrderRange[0] <= rightIndex && rightIndex <= pair.rightOrderRange[1]) {
        explodeAddRight(<Pair>pair.right, right, rightIndex);
    }
}


function trySplit(snailfishNumber: Pair): boolean {
    const didSplit = splitDo(snailfishNumber);
    if(didSplit) applyOrdering(snailfishNumber);
    return didSplit;
}

function splitDo(pair: Pair): boolean {
    if(typeof pair.left === 'number') {
        if(pair.left >= 10) {
            pair.left = new Pair([Math.floor(pair.left/2), Math.ceil(pair.left/2)]);
            return true;
        }
    } else if(splitDo(pair.left)) {
        return true;
    }

    if(typeof pair.right === 'number') {
        if(pair.right >= 10) {
            pair.right = new Pair([Math.floor(pair.right/2), Math.ceil(pair.right/2)]);
            return true;
        }
    } else if(splitDo(pair.right)) {
        return true;
    }
    
    return false;
}


function applyOrdering(snailfishNumber: Pair, startAt: number = 0, depth: number = 0): number {
    snailfishNumber.depth = depth;

    if(snailfishNumber.left instanceof Pair) {
        snailfishNumber.leftOrderRange[0] = startAt;
        startAt = applyOrdering(snailfishNumber.left, startAt, depth + 1);
        snailfishNumber.leftOrderRange[1] = startAt-1;
    } else {
        snailfishNumber.leftOrderRange = [startAt, startAt];
        startAt++;
    }

    if(snailfishNumber.right instanceof Pair) {
        snailfishNumber.rightOrderRange[0] = startAt;
        startAt = applyOrdering(snailfishNumber.right, startAt, depth + 1);
        snailfishNumber.rightOrderRange[1] = startAt-1;
    } else {
        snailfishNumber.rightOrderRange = [startAt, startAt];
        startAt++;
    }

    return startAt;
}


function reduce(snailfishNumber: Pair) {
    let furtherReduced = false;
    do {
        furtherReduced = tryExplode(snailfishNumber);
        furtherReduced = furtherReduced || trySplit(snailfishNumber);
    } while(furtherReduced)
}


function add(snailfishNumber: Pair, addend: Pair): Pair {
    let sum = new Pair([snailfishNumber.flat, addend.flat]);
    reduce(sum);
    return sum;
}

function sum(snailfishNumbers: Pair[]): Pair {
    return snailfishNumbers.reduce((p,c) => add(p,c));
}

function part1(input: string[]): number {
    const snailfishNumbies = input.map(x => new Pair(JSON.parse(x)));
    const total = sum(snailfishNumbies);
    return total.magnitude;
}


export {
    applyOrdering,
    tryExplode,
    trySplit,
    reduce,
    add,
    sum,
    part1
}