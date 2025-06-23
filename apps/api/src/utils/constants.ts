import type { StatusCode } from "hono/utils/http-status"

export const ERROR_RESPONSES = {
  notFound: { message: "Resource not found", code: 404 },
  invalidToken: { message: "Invalid token - missing user ID", code: 401 },
  missingAuthHeader: {
    message: "Missing or invalid authorization header",
    code: 401,
  },
} satisfies Record<string, { message: string; code: StatusCode }>
