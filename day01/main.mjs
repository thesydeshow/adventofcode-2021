import { getPositiveDeltaCount } from './delta.mjs';
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

getArrayFromInput('input.txt').then(result => getPositiveDeltaCount(result));
getArrayFromInput('input.txt').then(result => getPositiveDeltaCount(result, 3));
