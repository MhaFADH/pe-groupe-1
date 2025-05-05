import { act, renderHook } from "@testing-library/react-hooks"

import useAuthManagerMobile from "@/services/auth/platformBasedAuth/authManager.native"
import { AuthManagerError } from "@/services/auth/platformBasedAuth/authManager.web"

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
  getItem: jest.fn(),
}))

jest.mock("@/services/auth/auth0Client", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: mockUser })),
  },
}))

jest.mock("@/utils/env", () => () => ({
  auth0: {
    audience: "test-audience",
    domain: "test-domain",
    clientId: "test-client-id",
  },
}))

const mockAuthorize = jest.fn(async () => {})
const mockClearSession = jest.fn(async () => {})
const mockGetCredentials = jest.fn().mockResolvedValue({
  accessToken: "access-token",
  idToken: "id-token",
  refreshToken: "refresh-token",
})
const mockUser = { name: "Test User", email: "test@example.com" }
const mockError = null

jest.mock("react-native-auth0", () => ({
  useAuth0: jest.fn(() => ({
    authorize: mockAuthorize,
    clearSession: mockClearSession,
    getCredentials: mockGetCredentials,
    error: mockError,
  })),
}))

describe("useAuthManagerMobile", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    require("expo-secure-store").getItem.mockReturnValue("token")
    require("expo-secure-store").getItemAsync.mockResolvedValue("token")
  })

  it("returns the expected hook functions/data", async () => {
    const {
      result: { current: hook },
    } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      expect(typeof hook.signIn).toBe("function")
      expect(typeof hook.signOut).toBe("function")
      expect(typeof hook.getUser).toBe("function")
      expect(typeof hook.getTokens).toBe("function")
      expect(typeof hook.isAuthenticated).toBe("boolean")
      expect([null, expect.any(Object)]).toContain(hook.user)
      expect(hook.error).toBeNull()
    })
  })

  it("calls signIn and stores tokens", async () => {
    const { result } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      await result.current.signIn()
    })
    expect(mockAuthorize).toHaveBeenCalled()
    expect(mockGetCredentials).toHaveBeenCalled()
    expect(require("expo-secure-store").setItemAsync).toHaveBeenCalledWith(
      "accessToken",
      "access-token",
    )
    expect(require("expo-secure-store").setItemAsync).toHaveBeenCalledWith(
      "idToken",
      "id-token",
    )
    expect(require("expo-secure-store").setItemAsync).toHaveBeenCalledWith(
      "refreshToken",
      "refresh-token",
    )
  })

  it("calls signOut and removes tokens", async () => {
    const { result } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      await result.current.signOut()
    })
    expect(mockClearSession).toHaveBeenCalled()
    expect(require("expo-secure-store").deleteItemAsync).toHaveBeenCalledWith(
      "accessToken",
    )
    expect(require("expo-secure-store").deleteItemAsync).toHaveBeenCalledWith(
      "idToken",
    )
    expect(require("expo-secure-store").deleteItemAsync).toHaveBeenCalledWith(
      "refreshToken",
    )
  })

  it("returns user from getUser", async () => {
    const { result } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      await expect(result.current.getUser()).resolves.toEqual(mockUser)
    })
  })

  it("returns tokens from getTokens", async () => {
    const { result } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      await expect(result.current.getTokens()).resolves.toEqual({
        accessToken: "token",
        idToken: "token",
        refreshToken: "token",
      })
    })
  })

  it("throws if tokens are missing in getTokens", async () => {
    require("expo-secure-store").getItemAsync.mockResolvedValueOnce(null)
    const { result } = renderHook(() => useAuthManagerMobile())
    await act(async () => {
      await expect(result.current.getTokens()).rejects.toThrow(AuthManagerError)
    })
  })
})
