import { getLinesFromInput } from '../../core/readInput';
import { doBigBoyReboot } from './main';

getLinesFromInput('../assets/sample-2758514936282235.txt').then(lines => {
    console.time();
    const answer = doBigBoyReboot(lines);
    console.log('answer:', answer);
    console.timeEnd();
})