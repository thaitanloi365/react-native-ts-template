import { AppConfiguration } from '@Models'
import { getStore } from './Base/Store'
import { LanguageType } from '@Models'

type State = AppConfiguration | null | undefined

type Action = {
  type: keyof typeof ActionTypes
  payload?: State
}

const store = getStore()

const ActionTypes = {
  SAVE_CODEPUSH_VERSION: 'SAVE_CODEPUSH_VERSION',
  SET_FIRST_START: 'SET_FIRST_START',
  SET_LANGUAGE: 'SET_LANGUAGE',
}

const initialState: State = {
  firstStart: true,
  language: 'vi',
  codePushVersion: '',
}

function saveCodePushVersion(codePushVersion: string) {
  store.dispatch({
    type: ActionTypes.SAVE_CODEPUSH_VERSION,
    payload: codePushVersion,
  })
}

function setFirstStart(firstStart: boolean) {
  store.dispatch({ type: ActionTypes.SET_FIRST_START, payload: firstStart })
}

function setLanguage(language: LanguageType) {
  store.dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language })
}

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'SAVE_CODEPUSH_VERSION':
      return { ...state, codePushVersion: action.payload }
    case 'SET_FIRST_START':
      return { ...state, firstStart: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    default:
      return state
  }
}

export default {
  saveCodePushVersion,
  setFirstStart,
  setLanguage,
}
