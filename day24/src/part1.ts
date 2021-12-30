import { getLinesFromInput } from '../../core/readInput';
import { bruteForceMONAD } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const answer = bruteForceMONAD(lines);
    console.log('answer:', answer);
    console.timeEnd();
})