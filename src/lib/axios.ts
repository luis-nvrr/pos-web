import Axios, { AxiosRequestConfig } from 'axios'
import { showErrorNotification } from '~/components/Notification'

import { API_URL } from '~/config'
import storage from '~/utils/storage'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken()

  if (!config.headers) {
    return config
  }

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `${token}`
  }
  // eslint-disable-next-line no-param-reassign
  config.headers.Accept = 'application/json'
  return config
}

const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message
    showErrorNotification(message)
    return Promise.reject(error)
  },
)

export default axios
