import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join } from 'path';
import { once } from 'events';

async function getLinesFromInput(fileName: string): Promise<string[]> {
    const rl = createInterface({
        input: createReadStream(join(__dirname, '..', fileName)),
        crlfDelay: Infinity
    });

    let lines: string[] = [];
    rl.on('line', (line) => {
        lines.push(line);
    });
    
    await once(rl, 'close');
    return Promise.resolve(lines);
};

function getCalledNumbers(lines: string[]): number[] {
    return lines[0].split(',').map(x => Number(x));
}

function getBoards(lines: string[]): string[][] {
    lines.splice(0, 2);
    return lines.reduce((previous: string[][], current, i) => {
        if(current) {
            previous[previous.length-1].push(current);
        } else {
            previous.push([]);
        }
        return previous;
    }, [[]]);
}

function getRows(board: string[]): number[][] {
    return board.map(x => x.split(' ').filter(i => i).map(x => parseInt(x)));
}

function getColumns(rows: number[][]): number[][] {
    return rows[0].map((x,i) => rows.map(x => x[i]));
}

function getAllRows(boards: string[][]): number[][][] {
    return boards.map(x => getRows(x));
}

function getAllColumns(boards: string[][]): number[][][] {
    return boards.map(x => getColumns(getRows(x)));
}

const lines = getLinesFromInput('sample.txt');
lines.then(
    result => {
        const calledNumbers = getCalledNumbers(result);
        console.log('called numbers:', calledNumbers);
        const boards = getBoards(result);
        console.log('boards:', boards);
        const rows = getRows(boards[0]);
        console.log('board[0].rows:', rows);
        const columns = getColumns(rows);
        console.log('board[0].columns:', columns);
        const allRows = getAllRows(boards);
        console.log('allRows:', allRows);
        const allColumns = getAllColumns(boards);
        console.log('allColumns:', allColumns);
    }
)
