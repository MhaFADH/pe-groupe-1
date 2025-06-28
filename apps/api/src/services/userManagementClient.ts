/* eslint-disable camelcase */
import axios, { type AxiosInstance } from "axios"

import { Config } from "../../utils/config.js"

const env = Config

//Seconds
const TIME_EXPIRATION_BUFFER = 30

type TokenResponse = {
  access_token: string
  expires_in: number
  token_type: string
}

let cachedToken: string | null = null
let tokenExpiresAt = 0

const isTokenExpired = (): boolean => {
  const now = Math.floor(Date.now() / 1000) + TIME_EXPIRATION_BUFFER

  return !cachedToken || !tokenExpiresAt || tokenExpiresAt < now
}

const fetchManagementToken = async (): Promise<string> => {
  const response = await axios.post<TokenResponse>(
    `https://${env.auth0.domain}/oauth/token`,
    {
      grant_type: "client_credentials",
      client_id: env.auth0ManagementApi.clientId,
      client_secret: env.auth0ManagementApi.clientSecret,
      audience: `https://${env.auth0.domain}/api/v2/`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  const { access_token, expires_in } = response.data

  cachedToken = access_token
  tokenExpiresAt = Math.floor(Date.now() / 1000) + expires_in

  return access_token
}

const getValidToken = async (): Promise<string> => {
  if (!isTokenExpired()) {
    return cachedToken!
  }

  return await fetchManagementToken()
}

const auth0ManagementClient: AxiosInstance = axios.create({
  baseURL: `https://${env.auth0.domain}/api/v2/`,
})

auth0ManagementClient.interceptors.request.use(async (config) => {
  const token = await getValidToken()
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default auth0ManagementClient
