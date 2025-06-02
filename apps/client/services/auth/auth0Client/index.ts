import axios from "axios"
import * as SecureStore from "expo-secure-store"

import refreshInterceptor from "@/services/auth/auth0Client/refreshInterceptor"
import getEnv from "@/utils/env"

class Auth0ClientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Auth0ClientError"
  }
}

const env = getEnv()

type Auth0ClientMethods = "get" | "post" | "put" | "delete" | "patch"

const createAuth0Client =
  (method: Auth0ClientMethods) =>
  (...args: [url: string, config?: object]) => {
    const accessToken = SecureStore.getItem("accessToken")

    const client = axios.create({
      baseURL: `https://${env.auth0.domain}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    client.interceptors.request.use(refreshInterceptor)

    return client[method](...args).catch((error) => {
      throw new Auth0ClientError(`Error in Auth0 client: ${error}`)
    })
  }

const auth0Client = {
  get: createAuth0Client("get"),
  post: createAuth0Client("post"),
  put: createAuth0Client("put"),
  delete: createAuth0Client("delete"),
  patch: createAuth0Client("patch"),
}

export default auth0Client
