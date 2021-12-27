import { getLinesFromInput } from '../../core/readInput';
import { doReboot, countCubes } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const cuboid = doReboot(lines, [-50,50]);
    const answer = countCubes(cuboid);
    console.log('answer:', answer);
    console.timeEnd();
})