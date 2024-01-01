import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
   persist( (set) => (
    {
    username: "",
    authorities: [],
    loggedIn: false,
    jwt: "",
    setUsername: (newUserName) => set({ username: newUserName }),
    clearUsername: () => set({ username: "" }),
    setAuthorities: (newAuthorities) => set({authorities: newAuthorities}),
    clearAuthorities: () => set({authorities: []}),
    setLoggedInTrue: () => set({loggedIn: true}),
    setLoggedInFalse: () => set({loggedIn: false}),
    setJwt: (newJwt) => set({jwt:newJwt}),
    clearJwt: () => set({jwt: ""})
    }),
    {
      name: 'paper-storage',
    }
  )
)

export const useFilter = create(
  persist( (set, get) => (
    {
      filters: {
        title: {field: "title", operator : "LIKE", value : ""},
        before: {field: "yearOfPublication", operator : "LESS_THAN", value : ""},
        after: {field: "yearOfPublication", operator : "GREATER_THAN", value : ""},
        journal: {field: "journal", operator : "LIKE", value : ""}
      },
      setFilters: (newFilters) => set({filters: newFilters}),
      clearAll: () => {
        let newFilters = Object.keys(get().filters).reduce((acc, key) => {
          return {...acc, [key] : {...get().filters[key], value: ""}}
        }, []);
        set({filters: newFilters});
      }
    }),
    {
      name: 'filter-storage',
    }
  )
)