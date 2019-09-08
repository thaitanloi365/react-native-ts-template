import axios, { AxiosPromise } from 'axios'

const BASE_URL = 'http://cms.jelly.city'
// const BASE_URL = "http://192.168.1.232:5000";

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
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
    method: RequestMethod = 'GET',
    data?: object,
    params?: object,
    header?: object
  ): AxiosPromise<T> {
    const response: AxiosPromise<T> = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      params: params,
      timeout: 60000,
      headers: {
        ...header,
        'Content-Type': 'application/json'
      }
    })
    return response
  }

  authorizedRequest<T>(
    url: string,
    method: RequestMethod = 'GET',
    data?: object,
    params?: object,
    header?: object
  ): AxiosPromise<T> {
    const response: AxiosPromise<T> = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      params: params,
      timeout: 60000,
      headers: {
        ...header,
        'Content-Type': 'application/json',
        access_token: this.token
      }
    })
    return response
  }
}

const ErrorCodeMaps = {
  200: 'Success',
  404: 'Page not found',
  422: 'Invalid request',
  500: 'Internal errror'
}

function getError(errorCode: number, fallback: string = 'Unknown Error') {
  let _fallback = 'Unknown Error'
  if (fallback && fallback !== '') {
    _fallback = fallback
  }

  const errorMessage = (ErrorCodeMaps as any)[errorCode] || _fallback

  return {
    errorCode,
    errorMessage
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
      console.log('❌❌❌ Request Error: ', error)
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
    if (__DEV__) {
      console.log('❌❌❌ Response error: ', error.response)
    }
    let status = -1
    let message = ''

    if (error.response) {
      status = error.response.status || -1
      message = error.response.statusText || ''

      if (error.response.data) {
        const { message: errorMessage, status: errorCode } = error.response.data
        const errorObject = getError(errorCode, errorMessage)

        status = errorObject.errorCode
        message = errorObject.errorMessage
      }
    }
    const detailMessage = `Error ${status}: ${message}`
    return Promise.reject({ code: status, message: detailMessage })
  }
)

export default Network.getInstance()
