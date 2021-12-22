import { applyOrdering } from "./main";

export interface NestedArray extends Array<number | NestedArray> {}

export class Pair implements ISnailfishNumber {
    left: number | Pair;
    right: number | Pair;

    leftOrderRange: number[];
    rightOrderRange: number[];
    depth: number;
    
    get flat(): NestedArray {
        return [typeof this.left === 'number' ? this.left : this.left.flat, typeof this.right === 'number' ? this.right : this.right.flat];
    }

    get magnitude(): number  {
        const leftAddend = 3 * (typeof this.left === 'number' ? this.left : this.left.magnitude);
        const rightAddend = 2 * (typeof this.right === 'number' ? this.right : this.right.magnitude);
        return leftAddend + rightAddend;
    }
    
    constructor(numbers: NestedArray) {
        this.leftOrderRange = [-1,-1];
        this.rightOrderRange = [-1,-1];
        this.depth = -1;
        
        this.left = typeof numbers[0] === 'number' ? numbers[0] : new Pair(numbers[0]);
        this.right = typeof numbers[1] === 'number' ? numbers[1] : new Pair(numbers[1]);

        applyOrdering(this);
    }
}