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

const getPositiveDeltaCount = async (data, increment = 1) => {
    const debug = data.length < 10;
    let positiveDeltas = 0;
    for(let i = increment; i < data.length; i++) {
        const start = data.slice(i-increment, i).reduce((total, addend) => total + addend, 0);
        const end = data.slice(i-increment+1, i+1).reduce((total, addend) => total + addend, 0);

        if(i===increment) debug && console.log(start);
        debug && console.log(end);

        if(start < end){
            positiveDeltas++;
            debug && console.log('increased, was', start);
        }
    }
    console.log('positiveDeltas:', positiveDeltas );
    console.log('------------------------------');
}

getPositiveDeltaCount([1,1,5,3,9,6]);     //should result in 2 -- 1->5, 3->9
getPositiveDeltaCount([1,1,5,3,9,6], 3);  //should result in 3 -- 1+1+5=7->1+5+3=9, 9->5+3+9=17, 17->3+9+6=18
getArrayFromInput('input.txt').then(result => getPositiveDeltaCount(result));
getArrayFromInput('input.txt').then(result => getPositiveDeltaCount(result, 3));
