let signOutHolder: (() => Promise<void>) | null = null

export const registerSignOut = (fn: () => Promise<void>) => {
  signOutHolder = fn
}

export const signOut = () => {
  if (!signOutHolder) {
    throw new Error("signOut not registered")
  }

  return signOutHolder()
}
