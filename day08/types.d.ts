interface IIO {
    input: ISegment[];
    output: ISegment[];
    readonly inputString: string;
    readonly outputString: string;
    readonly resolvedOutputDigits: number;
}

interface ISegment {
    rawValue: string;
    readonly valueLength: number;
    readonly displayDigit: string;
}