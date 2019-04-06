import { getStore } from './Base/Store'
import { UserToken } from '@Models'

type State = UserToken | null | undefined

type Action = {
  type: keyof typeof ActionTypes
  payload?: State
}

const store = getStore()

const ActionTypes = {
  SAVE_USER_TOKEN: 'SAVE_USER_TOKEN',
  DELETE_USER_TOKEN: 'DELETE_USER_TOKEN',
}

function saveUserToken(userToken: UserToken) {
  store.dispatch({
    type: ActionTypes.SAVE_USER_TOKEN,
    payload: userToken,
  })
}

function deleteUserToken() {
  store.dispatch({ type: ActionTypes.DELETE_USER_TOKEN })
}

export function reducer(state: State = null, action: Action) {
  switch (action.type) {
    case 'SAVE_USER_TOKEN':
      return { ...state, ...action.payload }
    case 'DELETE_USER_TOKEN':
      return null
    default:
      return state
  }
}

export default {
  saveUserToken,
  deleteUserToken,
}
