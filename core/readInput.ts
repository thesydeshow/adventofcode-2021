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

export {
    getLinesFromInput
};
