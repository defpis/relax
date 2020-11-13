import { isUndefined } from 'lodash';
import { useCallback, useState } from 'react';

export function useToggle(initial: boolean): [boolean, (newState?: boolean) => void] {
  const [on, setOn] = useState(initial);

  const toggle = useCallback((newState) => setOn((oldState) => (isUndefined(newState) ? !oldState : newState)), []);

  return [on, toggle];
}
