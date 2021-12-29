import { getLinesFromInput } from '../../core/readInput';
import { doBigBoyReboot } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const answer = doBigBoyReboot(lines);
    console.log('answer:', answer);
    console.timeEnd();
})