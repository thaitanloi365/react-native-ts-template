import { getStore } from './Base/Store'
import { UserProfile } from '@Models'

type State = UserProfile | null | undefined

type Action = {
  type: keyof typeof ActionTypes
  payload?: State
}

const store = getStore()

const ActionTypes = {
  SAVE_USER_PROFILE: 'SAVE_USER_PROFILE',
  DELETE_USER_PROFILE: 'DELETE_USER_PROFILE',
}

function saveUserProfile(userProfile: UserProfile) {
  store.dispatch({
    type: ActionTypes.SAVE_USER_PROFILE,
    payload: userProfile,
  })
}

function deleteUserProfile() {
  store.dispatch({ type: ActionTypes.DELETE_USER_PROFILE })
}

export function reducer(state: State = null, action: Action) {
  switch (action.type) {
    case 'SAVE_USER_PROFILE':
      return { ...state, ...action.payload }
    case 'DELETE_USER_PROFILE':
      return null
    default:
      return state
  }
}

export default {
  saveUserProfile,
  deleteUserProfile,
}
