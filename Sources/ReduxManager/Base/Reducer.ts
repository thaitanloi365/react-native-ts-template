import { combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistReducer } from 'redux-persist'
import AppConfigurationReducer from '../AppConfiguration/AppConfigurationReducer'
import UserProfileReducer from '../UserProfile/UserProfileReducer'
import UserTokenReducer from '../UserToken/UserTokenReducer'

export const initialState = {
  appConfiguration: AppConfigurationReducer.initialState,
  userProfile: UserProfileReducer.initialState,
  userToken: UserTokenReducer.initialState
}

const reducers = combineReducers<any>({
  appConfiguration: AppConfigurationReducer.reducer,
  userProfile: UserProfileReducer.reducer,
  userToken: UserTokenReducer.reducer
})

const persistConfig = {
  key: 'userStorage',
  storage: AsyncStorage,
  whitelist: ['userToken', 'appConfiguration']
}

export const reducer = persistReducer(persistConfig, reducers)
