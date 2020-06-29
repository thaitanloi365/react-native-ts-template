import {useSelector, shallowEqual} from 'react-redux';

export function createSelector<T>(
  selector: (state: any) => T,
  equalityFn = shallowEqual,
): T {
  const state = useSelector((x: any) => x.toJS(), equalityFn);
  return selector(state);
}
