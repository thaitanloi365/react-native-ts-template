import { UserProfile } from "@Models";
import { ActionTypes } from "./UserProfileActions";

type State = UserProfile | null;

const initialState: State = null;

const reducer = (
  state: State = initialState,
  action: {
    type: keyof typeof ActionTypes;
    payload?: State;
  }
) => {
  switch (action.type) {
    case "SAVE_USER_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default { initialState, reducer };
