import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join } from 'path';
import { once } from 'events';
import { flipMatrix } from '../core/twoDimensionalUtils';

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
    return flipMatrix(rows);
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

function getIndexOfWinningBoard(boards: number[][][]): number {
    const winningBoards = boards.filter(x => hasBoardWon(x));
    return boards.indexOf(winningBoards[0]);
}

function getLosingBoard(boards: number[][][]): [number[][],number] {
    const losingBoards = boards.filter(x => !hasBoardWon(x));
    if(!losingBoards.length) throw new Error("Unexpected lack of losers");
    if(losingBoards.length === 1) return [losingBoards[0],boards.indexOf(losingBoards[0])];
    return [losingBoards[-1],-1];
}

function callNumber(numberCalled: number, boards: number[][][]) {
    boards.forEach(x =>
        x.forEach(y => {
            const i = y.indexOf(numberCalled);
            if(i !== -1) y.splice(i, 1);
        })
    );
}

function callUntilWinner(numbersToCall: number[], allRows: number[][][], allColumns: number[][][]): [number[][], number[], number] {
    for(let i = 0; i < numbersToCall.length; i++) {
        callNumber(numbersToCall[i], allRows);
        callNumber(numbersToCall[i], allColumns);

        const winnerIndex = Math.max(getIndexOfWinningBoard(allRows), getIndexOfWinningBoard(allColumns));
        if(winnerIndex !== -1) return [allRows[winnerIndex], numbersToCall.slice(0, i+1), winnerIndex];
    }
    throw new Error("No winner");
}

function callUntilLoser(numbersToCall: number[], allRows: number[][][], allColumns: number[][][]): [number[][], number[][]] {
    do {
        const [,,winnerIndex] = callUntilWinner(numbersToCall, allRows, allColumns);
        if(winnerIndex === -1) throw new Error('Missing winners');
        allRows.splice(winnerIndex, 1);
        allColumns.splice(winnerIndex, 1);
    } while(allRows.length > 1)
    
    if(!allRows.length) throw new Error("No loser");

    return [allRows[0], allColumns[0]];
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
    
    const allRows = getAllRows(boards);
    debug && console.log('allRows:', allRows);
    
    const allColumns = getAllColumns(boards);
    debug && console.log('allColumns:', allColumns);
    
    const [winner,calledNumbers] = callUntilWinner(numbersToCall, allRows, allColumns);
    debug && console.log('winner:', winner);
    
    const winnerRemainingNumbers = getRemainingNumbers(winner);
    debug && console.log('winnerRemainingNumbers:', winnerRemainingNumbers);
    
    getSolution(winnerRemainingNumbers, calledNumbers);
}

function unsolve(lines: string[], debug: boolean = false ) {
    const numbersToCall = getNumbersToCall(lines);
    debug && console.log('called numbers:', numbersToCall);
    
    const boards = getBoards(lines);
    debug && console.log('boards:', boards);
        
    const allRows = getAllRows(boards);
    debug && console.log('allRows:', allRows);
    
    const allColumns = getAllColumns(boards);
    debug && console.log('allColumns:', allColumns);
    
    const [loserRows,loserColumns] = callUntilLoser(numbersToCall, allRows, allColumns);
    debug && console.log('loserRows:', loserRows);
    debug && console.log('loserColumns:', loserColumns);

    const [loser,calledNumbers] = callUntilWinner(numbersToCall, [loserRows], [loserColumns]);
    debug && console.log('loser:', loser);
    
    const loserRemainingNumbers = getRemainingNumbers(loser);
    debug && console.log('loserRemainingNumbers:', loserRemainingNumbers);
    
    getSolution(loserRemainingNumbers, calledNumbers);
}


function part1sample() {
    getLinesFromInput('sample.txt').then(
        result => {
            solve(result, true);
            console.log('==============================');
        }
    );
}

function part1answer() {
    getLinesFromInput('input.txt').then(
        result => {
            solve(result);
            console.log('==============================');
        }
    );
}

function part2sample() {
    getLinesFromInput('sample.txt').then(
        result => {
            unsolve(result, true);
            console.log('==============================');
        }
    );
}

function part2answer() {
    getLinesFromInput('input.txt').then(
        result => {
            unsolve(result, true);
            console.log('==============================');
        }
    );
}

part2answer()
