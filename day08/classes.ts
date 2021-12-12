export class IO implements IIO {
    input: Segment[];
    output: Segment[];
    
    constructor(i: Segment[], o: Segment[]) {
        this.input = i;
        this.output = o;
    }

    get inputString(): string {
        return this.input.reduce((p,c) => {
            return p + (c.decodedValue || '');
        }, '');
    }

    get outputString(): string {
        return this.output.reduce((p,c) => {
            return p + (c.decodedValue || '');
        }, '');
    }

    get resolvedOutputDigits(): number {
        return this.outputString.split('').filter(i => i.trim()).length;
    }
}

export class Segment implements ISegment {
    rawValue: string;
    decodedValue: string;

    constructor(value: string) {
        this.rawValue = value;
        this.decodedValue = this.displayDigit;
    }

    get valueLength(): number {
        return this.rawValue.length;
    }

    get displayDigit(): string{
        switch(this.valueLength) {
            case 2:
                return '1';
            case 4:
                return '4';
            case 3:
                return '7';
            case 7:
                return '8';
            default:
                return '';
        }
    }
}