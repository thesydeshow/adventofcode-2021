interface ISnailfishNumber {
    left: number | ISnailfishNumber;
    right: number | ISnailfishNumber;
    readonly magnitude: number;
}