import { expect } from '@jest/globals';
import { test } from 'jest-circus';
import { diagnose, getDiagnosticValue, mostCommonBit } from './main';

const control = ['00100','11110','10110','10111','10101','01111','00111','11100','10000','11001','00010','01010'];

test('the most common first bit', async () => {
    const result = await mostCommonBit(control, 0);
    expect(result).toBe('1');
});

test('the most common second bit', async () => {
    const result = await mostCommonBit(control, 1);
    expect(result).toBe('0');
});

test('the most common binary', async () => {
    const result = await diagnose(control);
    expect(result).toBe('10110');
});

test('the most common binary in decimal', async () => {
    const result = await diagnose(control);
    expect(getDiagnosticValue(result)).toBe(198);
});
