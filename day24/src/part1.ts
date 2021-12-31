import { getLinesFromInput } from '../../core/readInput';
import { bruteForceMONAD, segmentedBruteForceMONAD } from './main';

getLinesFromInput('../assets/input.txt').then(async lines => {
    console.time();
    const answer = await segmentedBruteForceMONAD(lines);
    console.log('answer:', answer);
    console.timeEnd();
})