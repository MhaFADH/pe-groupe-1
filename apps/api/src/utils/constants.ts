import type { StatusCode } from "hono/utils/http-status"

export const ERROR_RESPONSES = {
  notFound: { message: "Resource not found", code: 404 },
  invalidToken: { message: "Invalid token - missing user ID", code: 401 },
  missingAuthHeader: {
    message: "Missing or invalid authorization header",
    code: 401,
  },
  userNotSynced: { message: "User not synced", code: 404 },
  failedToSync: { message: "Failed to sync user", code: 500 },
} satisfies Record<string, { message: string; code: StatusCode }>
