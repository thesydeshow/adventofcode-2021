import { getLinesFromInput } from '../core/readInput'
import { IO, Segment } from './classes';

function getIO(lines: string[]): Promise<IO[]> {
    let io: IO[] = [];
    lines.map(x => x.split(' | ')).forEach(x => io.push(new IO(getSegments(x[0]), getSegments(x[1]))));
    
    io.map(x => secondPass(x));

    return Promise.resolve(io);
}

function getSegments(line: string): Segment[] {
    return line.split(' ').map(x => new Segment(x));
}

function decodeSegment(segment: Segment, decodedSegments: Segment[]): string {
    const wires = segment.rawValue.split('');
    let decoderRing: string[][] = Array(10);
    decodedSegments.forEach(x => decoderRing[Number(x.decodedValue)] = x.rawValue.split(''));
    
    //    0 23 56789
    // <- 0   456 89
    //    01234  789 ->
    //      23456 89
    // <- 0 2   6 8
    //    01 3456789 ->
    //    0 23 56 89

    // 2 - 5 segments (contained by 6)
    // 3 - 5 segments (contains 1, 7)
    // 5 - 5 segments (contained by 9)
    // 6 - 6 segments (doesn't contain 1, 4, 7)
    // 9 - 6 segments (contains 1, 4, 7)
    // 0 - 6 segments (contains 1, 7)

    if(segment.valueLength === 6) {
        if(decoderRing[1] && decoderRing[1].every(x => wires.includes(x)) || decoderRing[7] && decoderRing[7].every(x => wires.includes(x))) {
            if(decoderRing[4]) {
                return decoderRing[4].every(x => wires.includes(x)) ? '9' : '0';
            }
        } else if (decoderRing[1] || decoderRing[7]) {
            return '6';
        }
    } else if(segment.valueLength === 5) {
        if(decoderRing[1] && decoderRing[1].every(x => wires.includes(x))) return '3';
        if(decoderRing[9] && wires.every(x => decoderRing[9].includes(x))) return '5';
        if(decoderRing[1] && decoderRing[9]) return '2';
    }

    return '';
}

function decode(segments: Segment[], passes: number = 1): Segment[] {
    segments.filter(x => !x.decodedValue).forEach(x => x.decodedValue = decodeSegment(x, segments.filter(x => x.decodedValue)));

    if(segments.filter(x => !x.decodedValue).length) {
        if(passes >= 10){
            throw new Error(`couldn\'t decode ${segments.filter(x => !x.decodedValue)} after ${passes} attempts`);
        }
        decode(segments, passes+1);
    }
    return segments;
}

function secondPass(io: IO) {
    const allSeggies = decode(io.input.concat(io.output));
    io.output.forEach(x => x.decodedValue = allSeggies.filter(s => s.rawValue === x.rawValue)[0].decodedValue);
}

function part1(inputPath: string) {
    getLinesFromInput(inputPath).then(result => {
        return getIO(result);
    }).then(result => {
        return result.reduce((p,c) => p + c.resolvedOutputDigits, 0);
    }).then(result => {
        console.log('answer:', result);
    })
}

function part2(inputPath: string) {
    getLinesFromInput(inputPath).then(result => {
        return getIO(result);
    }).then(result => {
        result.forEach(x => secondPass(x));
        const outputs = result.map(x => Number(x.outputString));
        console.log('outputs:', outputs);
        return outputs.reduce((p,c) => p + c);
    }).then(result => {
        console.log('answer:', result);
    })
}

part2('../day08/input.txt')
