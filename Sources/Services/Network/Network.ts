import axios, { AxiosPromise } from 'axios'

const BASE_URL = 'http://cms.jelly.city'

class Network {
  private static instance = new Network()
  private token: string = ''
  constructor() {
    if (Network.instance) {
      throw new Error('Error: Instantiation failed: Use Network.getInstance() instead of new.')
    }
    Network.instance = this
  }
  public static getInstance(): Network {
    return Network.instance
  }

  getBaseUrl(): string {
    return BASE_URL
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  unAuthorizedRequest<T>(
    url: string,
    method: 'POST' | 'GET' = 'GET',
    data?: object,
    header?: object
  ): AxiosPromise<T> {
    const response: AxiosPromise<T> = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      timeout: 20000,
      headers: {
        ...header,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  authorizedRequest<T>(
    url: string,
    method: 'POST' | 'GET' = 'GET',
    data?: object,
    header?: object
  ): AxiosPromise<T> {
    const response: AxiosPromise<T> = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      timeout: 20000,
      headers: {
        ...header,
        'Content-Type': 'application/json',
        access_token: this.token,
      },
    })
    return response
  }
}

export const NetWorkError = {
  200: 'Success',
  404: 'Page not found',
  422: 'Invalid request',
  500: 'Internal errror',
}

export function getError(errorCode: number, fallback: string = 'Unknown Error') {
  let _fallback = 'Unknown Error'
  if (fallback && fallback !== '') {
    _fallback = fallback
  }

  const errorMessage = (NetWorkError as any)[errorCode] || _fallback

  return {
    errorCode,
    errorMessage,
  }
}

axios.interceptors.request.use(
  function(config) {
    if (__DEV__) {
      const { url, method, data, params, baseURL } = config
      const message = `👉👉👉
  Request Info: ${baseURL}${url}
    - Method : ${method}
    - Data   : ${JSON.stringify(data)}
    - Params : ${params}
  
    `
      console.log(message)
    }

    return config
  },
  function(error) {
    if (__DEV__) {
      console.log('Request Error: ', error)
    }
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    if (__DEV__) {
      const { data: responseData, config } = response
      const { url, method, data, params } = config
      const message = `👉👉👉
  Response info: ${url}
    - Method : ${method}
    - Data   : ${JSON.stringify(responseData)}
    - Params : ${params}
    - Response Data: ${data}
    `
      console.log(message)
    }

    return response.data
  },
  function(error) {
    const { config, data } = error.response

    const { status = -1, message = '' } = data
    const { errorCode = status, errorMessage } = getError(status) || message
    if (__DEV__) {
      console.log('config', config)
      const { url, method, data: requestData, params } = config
      const log = `❌❌❌
  Request Info: ${url}
    - Method : ${method}
    - Data   : ${requestData}
    - Params : ${params}
  Server response
    - ErrorCode   : ${status}
    - ErrorMessage: ${message}
    `
      console.log(log)
    }
    return Promise.reject(`Error ${errorCode}: ${errorMessage}`)
  }
)

export default Network.getInstance()
