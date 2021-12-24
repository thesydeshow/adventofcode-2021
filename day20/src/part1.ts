import { getLinesFromInput } from '../../core/readInput';
import { parseInput, enhance, lightPixelCount, print } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const inputs = parseInput(lines);
    const enhanced = enhance(inputs.image, inputs.algorithm, 1000, 1);
    const enhancedEnhanced = enhance(enhanced, inputs.algorithm, 0, 0);
    console.log('answer:', lightPixelCount(enhancedEnhanced));
    console.timeEnd();
})