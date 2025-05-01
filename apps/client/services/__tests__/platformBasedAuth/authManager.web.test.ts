import { act, renderHook } from "@testing-library/react-hooks"
import "jest"

import useAuthManagerWeb, {
  AuthManagerError,
} from "@/services/auth/platformBasedAuth/authManager.web"

const mockLoginWithRedirect = jest.fn(async () => {})
const mockLogout = jest.fn(async () => {})
const mockGetAccessTokenSilently = jest.fn()
const mockGetIdTokenClaims = jest.fn()
const mockUser = { name: "Test User", email: "test@example.com" }
const mockUseAuth0 = {
  loginWithRedirect: mockLoginWithRedirect,
  logout: mockLogout,
  user: mockUser,
  getAccessTokenSilently: mockGetAccessTokenSilently,
  getIdTokenClaims: mockGetIdTokenClaims,
  isAuthenticated: true,
  error: null,
}

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(() => mockUseAuth0),
}))

describe("useAuthManagerWeb", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns the expected hook functions/data", () => {
    const {
      result: { current: hook },
    } = renderHook(() => useAuthManagerWeb())
    expect(hook.user).toEqual(mockUser)
    expect(hook.isAuthenticated).toBe(true)
    expect(hook.error).toBeNull()
    expect(typeof hook.signIn).toBe("function")
    expect(typeof hook.signOut).toBe("function")
    expect(typeof hook.getUser).toBe("function")
    expect(typeof hook.getTokens).toBe("function")
  })

  it("calls signIn function", async () => {
    const { result } = renderHook(() => useAuthManagerWeb())
    await act(async () => {
      await result.current.signIn()
    })
    expect(mockLoginWithRedirect).toHaveBeenCalled()
  })

  it("calls signOut function", async () => {
    const { result } = renderHook(() => useAuthManagerWeb())
    await act(async () => {
      await result.current.signOut()
    })
    expect(mockLogout).toHaveBeenCalled()
  })

  it("returns user from getUser", () => {
    const { result } = renderHook(() => useAuthManagerWeb())
    expect(result.current.getUser()).toEqual(mockUser)
  })

  it("throws authManagerError if user is not found in getUser fn", () => {
    require("@auth0/auth0-react").useAuth0.mockReturnValueOnce({
      ...require("@auth0/auth0-react").useAuth0(),
      user: null,
    })
    const { result } = renderHook(() => useAuthManagerWeb())
    expect(() => result.current.getUser()).toThrow(AuthManagerError)
  })

  it("returns tokens from getTokens", async () => {
    mockGetAccessTokenSilently.mockResolvedValue("access-token")
    mockGetIdTokenClaims.mockResolvedValue({ __raw: "id-token" })
    const { result } = renderHook(() => useAuthManagerWeb())
    await expect(result.current.getTokens()).resolves.toEqual({
      accessToken: "access-token",
      idToken: "id-token",
      refreshToken: "",
    })
  })

  it("throws if access token is missing in getTokens", async () => {
    mockGetAccessTokenSilently.mockResolvedValue(undefined)
    const { result } = renderHook(() => useAuthManagerWeb())
    await expect(result.current.getTokens()).rejects.toThrow(AuthManagerError)
  })

  it("throws if id token is missing in getTokens", async () => {
    mockGetAccessTokenSilently.mockResolvedValue("access-token")
    mockGetIdTokenClaims.mockResolvedValue(undefined)
    const { result } = renderHook(() => useAuthManagerWeb())
    await expect(result.current.getTokens()).rejects.toThrow(AuthManagerError)
  })
})
