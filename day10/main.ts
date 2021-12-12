import { getLinesFromInput } from '../core/readInput';

function syntaxCheck(line: string): number {
    let stack: string[] = [];
    for(let i = 0; i < line.length; i++) {
        switch(line[i]) {
            case ')':
                if(stack.pop() !== '(') return 3;
                break;
            case ']':
                if(stack.pop() !== '[') return 57;
                break;
            case '}':
                if(stack.pop() !== '{') return 1197;
                break;
            case '>':
                if(stack.pop() !== '<') return 25137;
                break;
            default:
                stack.push(line[i]);
        }
    }
    return 0;
}

function part1(inputPath: string) {
    getLinesFromInput(inputPath).then(results => {
        const syntaxScores = results.map(x => syntaxCheck(x));
        console.log('syntaxScores:', syntaxScores);
        const answer = syntaxScores.reduce((p,c) => p + c);
        console.log('answer:', answer);
    })
}

part1('../day10/input.txt')