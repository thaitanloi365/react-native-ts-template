import * as Actions from './actionTypes';
import produce, {Draft} from 'immer';
import {IAppState} from './initialState';

const initialState: IAppState = {
  hasInternet: true,
  loading: false,
  token: '',
  user: null,
  error: null,
};

const reducer = produce((draft: Draft<IAppState> = initialState, action) => {
  switch (action.type) {
    case Actions.SET_TOKEN:
      draft.token = action.payload;
    case Actions.SET_USER_PROFILE:
      draft.user = action.payload;
    case Actions.SET_INTERNET:
      draft.hasInternet = action.payload;
    case Actions.SET_LOADING:
      draft.loading = action.payload;
    case Actions.SET_ERROR:
      draft.error = action.payload;
    case Actions.LOG_OUT:
      draft = initialState;
  }
}, {});

export default reducer;
