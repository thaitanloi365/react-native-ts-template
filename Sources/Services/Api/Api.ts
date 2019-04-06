import Network from '../Network/Network'

async function login<T>(email: string, password: string) {
  try {
    const body = { email, password }
    const response = await Network.unAuthorizedRequest<T>('/app/api/login', 'POST', body)
    return response.data
  } catch (error) {
    return error
  }
}

async function extendToken<T>(token: string) {
  try {
    const body = { token }
    const response = await Network.unAuthorizedRequest<T>('/app/api/login', 'POST', body)
    return response.data
  } catch (error) {
    return error
  }
}

export default {
  login,
  extendToken,
}
