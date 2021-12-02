import { getPositiveDeltaCount } from './delta.mjs';

test('small array with default increment', () => {
    expect(getPositiveDeltaCount([1,1,5,3,9,6])).toBe(2); // 2 => 1-->5, 3-->9
});

test('small array with increment of 3', () => {
    expect(getPositiveDeltaCount([1,1,5,3,9,6])).toBe(3); // 3 => 1+1+5=7->1+5+3=9, 9->5+3+9=17, 17->3+9+6=18
});