import {actions} from './actions';
import produce, {Draft} from 'immer';

interface IState {
  loading: boolean;
  data: any;
  error: any;
}

const reducer = produce((draft: Draft<IState>, action) => {
  switch (action.type) {
    case actions.TRIGGER:
      draft.loading = true;
    case actions.SUCCESS:
      draft.data = action.payload;
      draft.loading = false;
    case actions.FAILURE:
      draft.error = action.payload;
    case actions.FULFILL:
      draft.data = action.payload;
      draft.loading = false;
  }
}, {});

export default reducer;
