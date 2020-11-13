import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export function useSyncState<T>(value: T, onChange?: (value: T) => void): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    onChange && onChange(state);
  }, [state, onChange]);

  return [state, setState];
}
