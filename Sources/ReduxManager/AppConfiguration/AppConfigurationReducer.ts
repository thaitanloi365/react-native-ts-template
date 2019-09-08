import { ActionTypes } from './AppConfigurationActions'
import { AppConfiguration } from 'Models'

type State = AppConfiguration

const initialState: State = {
  firstStart: true,
  language: 'vi'
}

function reducer(
  state: object = initialState,
  action: {
    type: keyof typeof ActionTypes
    payload?: State
  }
) {
  switch (action.type) {
    case 'SAVE_CODEPUSH_VERSION':
      return { ...state, codePushVersion: action.payload }
    case 'SAVE_APP_VERSION':
      return { ...state, appVersion: action.payload }
    case 'SAVE_FIREBASE_TOKEN':
      return { ...state, firebaseToken: action.payload }
    case 'DELETE_FIREBASE_TOKEN':
      return { ...state, firebaseToken: null }
    case 'SET_FIRST_START':
      return { ...state, firstStart: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    default:
      return state
  }
}

export default { initialState, reducer }
