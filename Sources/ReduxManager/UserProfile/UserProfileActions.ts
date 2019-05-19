import { UserProfile } from "@Models";
import { getStore } from "../Base/Store";

const store = getStore();

export const ActionTypes = {
  SAVE_USER_PROFILE: "SAVE_USER_PROFILE",
  DELETE_USER_PROFILE: "DELETE_USER_PROFILE"
};

function saveUserProfile(userProfile: UserProfile) {
  store.dispatch({ type: ActionTypes.SAVE_USER_PROFILE, payload: userProfile });
}

function deleteUserProfile() {
  store.dispatch({ type: ActionTypes.DELETE_USER_PROFILE });
}

export default {
  saveUserProfile,
  deleteUserProfile
};
