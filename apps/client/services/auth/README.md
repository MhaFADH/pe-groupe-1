# Auth Service

## 1. AuthManager

The AuthManager provides a unified authentication API for both web and mobile platforms. The `index.ts` file exports a `useAuthManager` hook that automatically selects the correct implementation (`authManager.web` or `authManager.mobile`) based on the current platform. This allows you to use authentication logic seamlessly across the app, regardless of the environment.

### Main Functions in AuthManager

- **signIn**: Initiates the login process and stores tokens after successful authentication.
- **signOut**: Logs out the user, clears tokens, and updates authentication state.
- **getUser**: Fetches the current authenticated user's profile from Auth0.
- **getTokens**: Retrieves the current access, ID, and refresh tokens from secure storage.
- **isAuthenticated**: Boolean indicating if the user is currently authenticated.
- **user**: The current authenticated user object.
- **error**: Any error encountered during authentication.

## 2. Auth0Client

The `auth0Client` is a custom Axios-based client for communicating with Auth0. It was created because the `react-native-auth0` SDK does not manage sessions automatically. This client handles all Auth0 API requests and includes a robust interceptor for session management.

### Interceptor Features

- **Token Expiry Check**: Before each request, the interceptor `refreshInterceptor.ts` checks if the access token is expired.
- **Automatic Refresh**: If the token is expired, it refreshes the token and updates the Authorization header.
- **Sign Out on Failure**: If refreshing the token fails, it automatically signs out the user and clears all tokens.
- **Reusable**: The interceptor can be used in other Axios clients in the future for consistent session management.

---

This setup ensures robust, cross-platform authentication and seamless integration with Auth0 in the project.
