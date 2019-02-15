import { createStore, applyMiddleware, Store } from "redux";
import { persistStore } from "redux-persist";
import { middlewares } from "./Middleware";
import { initialState, reducer } from "./Reducer";

type StoreState = typeof initialState;
const store = createStore<StoreState>(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export const configStore = () => {
  const persistor = persistStore(store);
  return { store, persistor };
};

export function getStore(): Store<StoreState> {
  return store;
}
