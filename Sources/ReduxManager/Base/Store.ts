import { createStore, applyMiddleware, Store } from 'redux'
import { persistStore } from 'redux-persist'
import { middlewares } from './Middleware'
import { reducer } from './Reducer'
import { AppConfiguration, UserProfile, UserToken } from '@Models'

export type StoreState = Partial<{
  appConfiguration: AppConfiguration
  userProfile: UserProfile
  userToken: UserToken
}>

const store = createStore(reducer, applyMiddleware(...middlewares))

export const configStore = () => {
  const persistor = persistStore(store)
  return { store, persistor }
}

export function getStore(): Store<StoreState> {
  return store
}
