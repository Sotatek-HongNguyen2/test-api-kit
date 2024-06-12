import { useState, useEffect, useMemo } from 'react';

export function useDebounce<T>(initialValue: T, time = 600): [T, React.Dispatch<T>, T] {
  const [valueInput, setValueInput] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(valueInput);
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [valueInput, time]);

  return useMemo(() => [debouncedValue, setValueInput, valueInput], [debouncedValue, valueInput]);
}
