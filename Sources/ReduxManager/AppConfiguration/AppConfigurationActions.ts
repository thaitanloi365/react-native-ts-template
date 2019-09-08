import { getStore } from '../Base/Store'
import { LanguageType } from 'Models'

const store = getStore()

export const ActionTypes = {
  SAVE_APP_VERSION: 'SAVE_APP_VERSION',
  SAVE_CODEPUSH_VERSION: 'SAVE_CODEPUSH_VERSION',
  SAVE_FIREBASE_TOKEN: 'SAVE_FIREBASE_TOKEN',
  DELETE_FIREBASE_TOKEN: 'DELETE_FIREBASE_TOKEN',
  SET_FIRST_START: 'SET_FIRST_START',
  SET_LANGUAGE: 'SET_LANGUAGE'
}

function saveAppVersion(appVersion: string) {
  store.dispatch({
    type: ActionTypes.SAVE_APP_VERSION,
    payload: appVersion
  })
}

function saveCodePushVersion(codePushVersion: string) {
  store.dispatch({
    type: ActionTypes.SAVE_CODEPUSH_VERSION,
    payload: codePushVersion
  })
}

function saveFirebaseToken(firebaseToken: string) {
  store.dispatch({
    type: ActionTypes.SAVE_FIREBASE_TOKEN,
    payload: firebaseToken
  })
}

function deleteFirebaseToken() {
  store.dispatch({ type: ActionTypes.DELETE_FIREBASE_TOKEN })
}

function setFirstStart(firstStart: boolean) {
  store.dispatch({ type: ActionTypes.SET_FIRST_START, payload: firstStart })
}

function setLanguage(language: LanguageType) {
  store.dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language })
}

export default {
  saveCodePushVersion,
  saveAppVersion,
  saveFirebaseToken,
  deleteFirebaseToken,
  setFirstStart,
  setLanguage
}
