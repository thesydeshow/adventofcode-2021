import { getLinesFromInput } from '../../core/readInput';
import { part1 } from './main';

getLinesFromInput('../assets/input.txt').then(result => {
    console.time();
    const answer = part1(result);
    console.log(answer);
    console.timeEnd();
})