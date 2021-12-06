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

function getNumbersToCall(lines: string[]): number[] {
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

function hasBoardWon(board: number[][]): boolean {
    return !!board.filter(x => !x.length).length;
}

function getWinningBoard(boards: number[][][]): number[][] {
    const winningBoards = boards.filter(x => hasBoardWon(x));
    if(winningBoards.length > 1) throw new Error("Unexpected tie");
    return winningBoards[0];
}

function callNumber(numberCalled: number, boards: number[][][]) {
    // boards.map(x => x.map(x => x.filter( x => x != numberCalled)));
    boards.forEach(x =>
        x.forEach(y => {
            const i = y.indexOf(numberCalled);
            if(i !== -1) y.splice(i, 1);
        })
    );
}

function callUntilWinner(numbersToCall: number[], allRows: number[][][], allColumns: number[][][]): [number[][], number[]] {
    let winner: number[][];
    for(let i = 0; i < numbersToCall.length; i++) {
        callNumber(numbersToCall[i], allRows);
        winner = getWinningBoard(allRows) || getWinningBoard(allColumns);
        if(winner) return [winner, numbersToCall.slice(0, i+1)];
    }
    throw new Error("No winner");
}

function getRemainingNumbers(board: number[][]): number[] {
    const output: number[] = [];
    return output.concat(...board);
}

function getSolution(remainingNumbers: number[], calledNumbers: number[]) {
    const sum = remainingNumbers.reduce((previous, current) => previous + current);
    const lastNumber = calledNumbers[calledNumbers.length-1];
    console.log('solution:', sum * lastNumber);
}

function solve(lines: string[], debug: boolean = false ) {
    const numbersToCall = getNumbersToCall(lines);
    debug && console.log('called numbers:', numbersToCall);
    
    const boards = getBoards(lines);
    debug && console.log('boards:', boards);
    
    const rows = getRows(boards[0]);
    debug && console.log('board[0].rows:', rows);
    
    const columns = getColumns(rows);
    debug && console.log('board[0].columns:', columns);
    
    const allRows = getAllRows(boards);
    debug && console.log('allRows:', allRows);
    
    const allColumns = getAllColumns(boards);
    debug && console.log('allColumns:', allColumns);
    
    const noOneShouldBeWinning = getWinningBoard(allRows) || getWinningBoard(allColumns);
    debug && console.log(noOneShouldBeWinning);
    
    callNumber(numbersToCall[0], allRows);
    debug && console.log('call[0].allRows:', allRows);
    
    const [winner,calledNumbers] = callUntilWinner(numbersToCall, allRows, allColumns);
    debug && console.log('winner:', winner);
    
    const winnerRemainingNumbers = getRemainingNumbers(winner);
    debug && console.log('winnerRemainingNumbers:', winnerRemainingNumbers);
    
    getSolution(winnerRemainingNumbers, calledNumbers);
}

getLinesFromInput('sample.txt').then(
    result => {
        solve(result, true);
    }
)

getLinesFromInput('input.txt').then(
    result => {
        solve(result);
    }
)