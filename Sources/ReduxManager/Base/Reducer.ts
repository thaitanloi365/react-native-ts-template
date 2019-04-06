import { reducer as appConfigReducer } from '../AppConfigRedux'
import { reducer as userTokenReducer } from '../UserTokenRedux'
import { reducer as userProfileReducer } from '../UserProfileRedux'
import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { combineReducers } from 'redux'

const reducers = combineReducers<any>({
  userProfile: userTokenReducer,
  userToken: userProfileReducer,
  appConfiguration: appConfigReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['userToken'],
}

export const reducer = persistReducer(persistConfig, reducers)
