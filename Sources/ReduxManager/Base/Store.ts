import { createStore, applyMiddleware, Store } from 'redux'
import { persistStore } from 'redux-persist'
import { middlewares } from './Middleware'
import { reducer } from './Reducer'
import { UserProfile, UserToken, AppConfiguration } from '@Models'

export type StoreState = {
  userProfile?: UserProfile
  userToken?: UserToken
  appConfiguration?: AppConfiguration
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export const configStore = () => {
  const persistor = persistStore(store)
  return { store, persistor }
}

export function getStore(): Store<StoreState> {
  return store
}
