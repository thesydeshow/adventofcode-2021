import { getLinesFromInput } from '../../core/readInput';
import { part2 } from './main';

getLinesFromInput('../assets/input.txt').then(result => {
    console.time();
    const answer = part2(result);
    console.log(answer);
    console.timeEnd();
})