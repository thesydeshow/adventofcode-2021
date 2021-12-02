import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { once } from 'events';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getArrayFromInput = async (fileName) => {
    const rl = createInterface({
        input: createReadStream(join(__dirname, '/', fileName)),
        crlfDelay: Infinity
    });

    let lines = [];
    rl.on('line', (line) => {
        lines.push(Number(line));
    });
    
    await once(rl, 'close');
    return Promise.resolve(lines);
};

const getPositiveDeltaCount = (data) => {
    let positiveDeltas = 0;
    for(let i = 1; i < data.length; i++) {
        if(data[i-1] < data[i]) positiveDeltas++;
    }
    console.log("positiveDeltas:", positiveDeltas );
}

getArrayFromInput('input.txt').then(result => getPositiveDeltaCount(result));
