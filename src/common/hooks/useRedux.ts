import {useDispatch} from 'react-redux';
import {createSelector} from './createSelector';

export function useRedux() {
  const dispatch = useDispatch();
  return {dispatch, createSelector};
}
