import jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"

import { Config } from "../../utils/config.js"

const client = jwksClient({
  jwksUri: `https://${Config.auth0.domain}/.well-known/jwks.json`,
  requestHeaders: {},
  timeout: 30000,
  cache: true,
})

const getKey = (
  header: jwt.JwtHeader,
  callback: jwt.SigningKeyCallback,
): void => {
  if (!header.kid) {
    callback(new Error("No key ID found in token header"))

    return
  }

  client.getSigningKey(header.kid, (err, signingKey) => {
    if (err) {
      callback(err)

      return
    }

    const key = signingKey?.getPublicKey()
    callback(null, key)
  })
}

export const verifyToken = (token: string): Promise<jwt.JwtPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: Config.auth0.audience,
        issuer: `https://${Config.auth0.domain}/`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          reject(err)
        } else if (!decoded || typeof decoded === "string") {
          reject(new Error("Invalid token payload"))
        } else {
          resolve(decoded)
        }
      },
    )
  })
