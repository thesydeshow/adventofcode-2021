import { getLinesFromInput } from '../core/readInput'
import { IO, Segment } from './classes';

function getIO(lines: string[]): Promise<IO[]> {
    let io: IO[] = [];
    lines.map(x => x.split(' | ')).forEach(x => io.push(new IO(getSegments(x[0]), getSegments(x[1]))));

    return Promise.resolve(io);
}

function getSegments(line: string): Segment[] {
    return line.split(' ').map(x => new Segment(x));
}

function main() {
    getLinesFromInput('../day08/input.txt').then(result => {
        return getIO(result);
    }).then(result => {
        return result.reduce((p,c) => p + c.resolvedOutputDigits, 0);
    }).then(result => {
        console.log('answer:', result);
    })
}

main()