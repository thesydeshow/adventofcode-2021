import { getLinesFromInput } from '../../core/readInput';
import { parseInput, enhance, lightPixelCount, enhanceEnhanceEnhance } from './main';

getLinesFromInput('../assets/input.txt').then(lines => {
    console.time();
    const inputs = parseInput(lines);
    const enhanced = enhanceEnhanceEnhance(inputs.image, inputs.algorithm, 50);
    console.log('answer:', lightPixelCount(enhanced));
    console.timeEnd();
})