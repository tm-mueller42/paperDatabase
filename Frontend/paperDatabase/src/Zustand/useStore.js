import {create} from 'zustand'

export const useStore = create((set) => ({
  username: null,
  authorities: [],
  loggedIn: false,
  jwt: null,
  setUsername: (newUserName) => set({ username: newUserName }),
  clearUsername: () => set({ username: null }),
  setAuthorities: (newAuthorities) => set({authorities: newAuthorities}),
  clearAuthorities: () => set({authorities: null}),
  setLoggedInTrue: () => set({loggedIn: true}),
  setLoggedInFalse: () => set({loggedIn: false}),
  setJwt: (newJwt) => set({jwt:newJwt}),
  clearJwt: () => set({jwt: null})
}))