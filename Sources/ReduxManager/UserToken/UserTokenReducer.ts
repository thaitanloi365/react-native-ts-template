import { UserToken } from "@Models";
import { ActionTypes } from "./UserTokenActions";

type State = UserToken | null;

const initialState: State = null;

const reducer = (
  state: State = initialState,
  action: {
    type: keyof typeof ActionTypes;
    payload?: State;
  }
) => {
  switch (action.type) {
    case "SAVE_USER_TOKEN":
      return { ...state, ...action.payload };
    case "DELETE_USER_TOKEN":
      return null;
    default:
      return state;
  }
};

export default { initialState, reducer };
