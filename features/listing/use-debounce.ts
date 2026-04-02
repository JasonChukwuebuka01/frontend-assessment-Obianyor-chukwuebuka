import { useEffect, useState } from 'react';


export function useDebounce(value: string, delay: number = 300) {
    
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // If the user types again before the timer finishes, this "cleanup" 
        // function runs and cancels the previous timer.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}