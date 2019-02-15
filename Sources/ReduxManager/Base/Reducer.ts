import { combineReducers, Reducer } from "redux";

import UserStorageReducer from "../UserStorage/UserStorageReducer";

export const initialState = {
  userStorage: UserStorageReducer.initialState
};

export const reducer: Reducer<{ userStorage: any }> = combineReducers({
  userStorage: UserStorageReducer.reducer
});
