import Api from '../Api/Api'
import Network from '../Network/Network'
import { UserToken, UserProfile } from '@Models'
import { getStore, UserTokenActions, UserProfileActions } from '@ReduxManager'

function logout(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    UserTokenActions.deleteUserToken()
    resolve(true)
  })
}

function loginAndCreateSession(email: string, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Api.login<UserToken>(email, password)
      .then(response => {
        const { access_token } = response

        Network.setToken(access_token)
        UserTokenActions.saveUserToken(response)
        const promises = Promise.all([Api.getProfile<UserProfile>()])

        return promises
      })
      .then(values => {
        const [userProfile] = values

        UserProfileActions.saveUserProfile(userProfile)

        resolve(true)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function createSession(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const store = getStore()
    const { userToken } = store.getState()

    if (userToken) {
      const { access_token } = userToken
      Network.setToken(access_token)

      Promise.all([Api.getProfile<UserProfile>()])
        .then(values => {
          const [userProfile] = values

          UserProfileActions.saveUserProfile(userProfile)
          resolve(true)
        })
        .catch(error => {
          reject(error)
        })
    } else {
      reject('User not logged')
    }
  })
}

export default {
  logout,
  loginAndCreateSession,
  createSession
}
