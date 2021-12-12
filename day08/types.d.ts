interface IIO {
    input: ISegment[];
    output: ISegment[];
    readonly inputString: string;
    readonly outputString: string;
    readonly resolvedOutputDigits: number;
}

interface ISegment {
    rawValue: string;
    decodedValue: string;
    readonly valueLength: number;
    readonly displayDigit: string;
}