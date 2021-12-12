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
    
    console.log(stack);
    let incompleteScore = 0;
    do {
        incompleteScore *= 5;
        switch(stack.pop()) {
            case '(':
                incompleteScore -= 1;
                break;
            case '[':
                incompleteScore -= 2;
                break;
            case '{':
                incompleteScore -= 3;
                break;
            case '<':
                incompleteScore -= 4;
                break;
        }
        console.log(incompleteScore);
    } while(stack.length);
    return incompleteScore;
}

function part1(inputPath: string) {
    getLinesFromInput(inputPath).then(results => {
        const syntaxScores = results.map(x => syntaxCheck(x)).filter(x => x > 0);
        console.log('syntaxScores:', syntaxScores);
        const answer = syntaxScores.reduce((p,c) => p + c);
        console.log('answer:', answer);
    })
}

function part2(inputPath: string) {
    getLinesFromInput(inputPath).then(results => {
        const syntaxScores = results.map(x => syntaxCheck(x)).filter(x => x < 0);
        console.log('syntaxScores:', syntaxScores);
        const answer = syntaxScores.sort((a,b) => a - b)[Math.floor(syntaxScores.length/2)] * -1;
        console.log('answer:', answer);
    })
}

part2('../day10/input.txt')