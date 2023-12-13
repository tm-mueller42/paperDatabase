import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
   persist( (set) => (
    {
    username: null,
    authorities: [],
    loggedIn: false,
    jwt: null,
    setUsername: (newUserName) => set({ username: newUserName }),
    clearUsername: () => set({ username: null }),
    setAuthorities: (newAuthorities) => set({authorities: newAuthorities}),
    clearAuthorities: () => set({authorities: []}),
    setLoggedInTrue: () => set({loggedIn: true}),
    setLoggedInFalse: () => set({loggedIn: false}),
    setJwt: (newJwt) => set({jwt:newJwt}),
    clearJwt: () => set({jwt: null})
    }),
    {
      name: 'paper-storage',
    }
  )
)