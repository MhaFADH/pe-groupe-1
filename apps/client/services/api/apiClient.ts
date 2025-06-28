import axios from "axios"
import { Platform } from "react-native"

import refreshInterceptor from "@/services/auth/auth0Client/refreshInterceptor"
import { getAuthManager } from "@/services/auth/authBridge"
import getEnv from "@/utils/env"

class ApiClientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiClientError"
  }
}

const env = getEnv()

type ApiClientMethods = "get" | "post" | "put" | "delete" | "patch"

const isWeb = Platform.OS === "web"

const createApiClient =
  (method: ApiClientMethods) =>
  async (...args: [url: string, config?: object]) => {
    const authManager = getAuthManager()

    const accessToken = await authManager
      .getTokens()
      .then((tokens) => tokens?.accessToken)

    const client = axios.create({
      baseURL: `${env.api.baseUrl}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!isWeb) {
      client.interceptors.request.use(refreshInterceptor)
    }

    return client[method](...args).catch((error) => {
      throw new ApiClientError(`Error in api client: ${error}`)
    })
  }

const apiClient = {
  get: createApiClient("get"),
  post: createApiClient("post"),
  put: createApiClient("put"),
  delete: createApiClient("delete"),
  patch: createApiClient("patch"),
}

export default apiClient
