import Network from '../Network/Network'

export type NetworkPromiseResponse<T> = Promise<T>

function login<T>(apartment_id: string, password: string): NetworkPromiseResponse<T> {
  const body = { apartment_id, password }
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest<T>('/app/api/login', 'POST', body)
      .then(response => {
        resolve(response as any)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function extendToken<T>(token: string): NetworkPromiseResponse<T> {
  const body = { token }
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest<T>('/app/api/login', 'POST', body)
      .then(response => {
        resolve(response as any)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function getProfile<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>('/app/api/profile', 'GET')
      .then(response => {
        resolve(response as any)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  login,
  extendToken,
  getProfile
}
