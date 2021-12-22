interface ISnailfishNumber {
    left: number | ISnailfishNumber;
    right: number | ISnailfishNumber;
    
    leftOrderRange: number[];
    rightOrderRange: number[];
    depth: number;
    
    readonly magnitude: number;
}