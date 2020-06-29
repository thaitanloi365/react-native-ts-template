import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import saga from './saga';

const logger = createLogger({
  collapsed: true,
  duration: true,
});
const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);
export {store};
