import { setCourse, takeAim } from './dive.mjs';
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
        const direction = line.split(' ')[0];
        const magnatude = Number(line.split(' ')[1]);
        lines.push(new Array(direction,magnatude));
    });
    
    await once(rl, 'close');
    return Promise.resolve(lines);
};

takeAim([['forward',5],['down',5],['forward',8],['up',3],['down',8],['forward',2]]); // expected to be 900 (15 * 60)
getArrayFromInput('input.txt').then(results => setCourse(results));
getArrayFromInput('input.txt').then(results => takeAim(results));