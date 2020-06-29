import {parseError} from '@src/utils/error';
import {createRoutine} from 'redux-saga-routines';

const payloadCreator = {
  trigger: (payload) => ({...payload, trigger: true}), // we may use payload creator to extend payload
  request: ({id}) => ({id}), // or to filter its values
  success: (payload) => ({...payload}), // or to change payload on the fly
  failure: (payload) => ({
    errorMessage: parseError(payload.error),
    error: true,
  }), // or to do all of these at once
  fulfill: () => ({}), // or to completely change/remove payload ...
};

export const actions = createRoutine('LOGIN', payloadCreator);
