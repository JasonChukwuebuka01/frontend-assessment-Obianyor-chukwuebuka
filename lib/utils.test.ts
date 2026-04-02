import { describe, it, expect } from 'vitest';
import { formatDate } from './transformers';

describe('formatDate utility', () => {
    it('returns "N/A" if the date is missing', () => {
        // This tests Path A
        expect(formatDate('')).toBe('N/A');
        //expect(formatDate(null)).toBe('N/A');
    });

    it('returns "Invalid Date" for garbage text', () => {
        // This tests Path B
        expect(formatDate('not-a-date')).toBe('Invalid Date');
    });

    it('formats a correct date string', () => {
        // This tests Path C
        expect(formatDate('2024-12-25')).toBe('Dec 25, 2024');
    });
});