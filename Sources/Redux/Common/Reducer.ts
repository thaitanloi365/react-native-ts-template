import { combineReducers } from "redux";

import UserStorageReducer from "../Services/UserStorage/UserStorageReducer";

export const initialState = {
  userStorage: UserStorageReducer.initialState
};

export const reducer = combineReducers({
  userStorage: UserStorageReducer.reducer
});
