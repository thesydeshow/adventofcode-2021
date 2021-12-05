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

function mostCommonBit(input: string[], position: number): Promise<string> {
    const sortedInput = input.sort((a,b) => (Number(a.charAt(position)) - Number(b.charAt(position))));
    const median = sortedInput[Math.ceil(input.length / 2)];
    return Promise.resolve(median.charAt(position));
}

async function diagnose(input: string[], doLeastMost: boolean = false): Promise<string> {
    let output: string[] = [];
    let promises = [];
    for(let i = 0; i < input[0].length; i++) {
        promises.push(
            mostCommonBit(input, i).then(
                async result => {
                    output[i] = doLeastMost ? (result == '0' ? '1' : '0') : result;
                    return result;
                }
            )
        );
    }

    const results = await Promise.all(promises);
    return output.join('');
}

function getDiagnosticValue(binary: string): number {
    return parseInt(binary, 2);
}

export {
    mostCommonBit,
    diagnose,
    getDiagnosticValue
}

const controlTest = ['00100','11110','10110','10111','10101','01111','00111','11100','10000','11001','00010','01010'];
diagnose(controlTest).then(
    result => {
        console.log('test-gamma.diagnose.result:',result);
        console.log('test-gamma.getDiagnosticValue.result:', getDiagnosticValue(result));
    }
);
diagnose(controlTest, true).then(
    result => {
        console.log('test-epsilon.diagnose.result:',result);
        console.log('test-epsilon.getDiagnosticValue.result:', getDiagnosticValue(result));
    }
);


const lines = getLinesFromInput('input.txt');
lines.then(
    result => {
        console.log('==============================');
        return diagnose(result);
    }
).then(
    result => {
        console.log('gamma.diagnose.result:', result);
        console.log('gamma.getDiagnosticValue.result:', getDiagnosticValue(result));
    }
);

lines.then(
    result => {
        return diagnose(result, true);
    }
).then(
    result => {
        console.log('epsilon.diagnose.result:', result);
        console.log('epsilon.getDiagnosticValue.result:', getDiagnosticValue(result));
    }
);
