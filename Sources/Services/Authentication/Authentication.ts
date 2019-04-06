import { UserTokenRedux } from '@ReduxManager'
import { UserToken } from '@Models'
import Api from '../Api/Api'

async function logout() {
  UserTokenRedux.deleteUserToken()
}

async function loginAndCreateSession(username: string, password: string) {}

async function createSession(token?: string) {
  try {
    // @ts-ignore
    UserTokenRedux.saveUserToken({ access_token: '111', errors: 'sss', message: 'sss' })
    return await Api.login<UserToken>('tst', '1')
  } catch (error) {
    return error
  }
}

export default {
  logout,
  loginAndCreateSession,
  createSession,
}
