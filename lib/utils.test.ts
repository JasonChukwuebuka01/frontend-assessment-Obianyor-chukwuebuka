import { describe, it, expect } from 'vitest';
import { formatDate } from './transformers';

describe('formatDate utility', () => {
    it('returns "N/A" if the date is missing', () => {
        
        expect(formatDate('')).toBe('N/A');
       
    });

    it('returns "Invalid Date" for garbage text', () => {
        
        expect(formatDate('not-a-date')).toBe('Invalid Date');
    });

    it('formats a correct date string', () => {
      
        expect(formatDate('2024-12-25')).toBe('Dec 25, 2024');
    });
});