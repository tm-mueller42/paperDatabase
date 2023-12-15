import {create} from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
   persist( (set) => (
    {
    username: null,
    authorities: [],
    loggedIn: false,
    jwt: null,
    filters: [],
    setUsername: (newUserName) => set({ username: newUserName }),
    clearUsername: () => set({ username: null }),
    setAuthorities: (newAuthorities) => set({authorities: newAuthorities}),
    clearAuthorities: () => set({authorities: []}),
    setLoggedInTrue: () => set({loggedIn: true}),
    setLoggedInFalse: () => set({loggedIn: false}),
    setJwt: (newJwt) => set({jwt:newJwt}),
    clearJwt: () => set({jwt: null}),
    setFilters: (newFilters) => set({filters: newFilters}),
    clearFilters: () => set({filters: []})
    }),
    {
      name: 'paper-storage',
    }
  )
)

export const useFilter = create(
  persist( (set) => (
    {
      title: {field: "title", operator : "LIKE", value : ""},
      before: {field: "yearOfPublication", operator : "LESS_THAN", value : null},
      after: {field: "yearOfPublication", operator : "GREATER_THAN", value : null},
      journal: {field: "journal", operator : "LIKE", value : ""},
      setTitle: (newTitle) => set({title: {field: "title", operator : "LIKE", value : newTitle}}),
      setBefore: (newBefore) => set({before: {field: "yearOfPublication", operator : "LESS_THAN", value : newBefore}}),
      setAfter: (newAfter) => set({after: {field: "yearOfPublication", operator : "GREATER_THAN", value : newAfter}}),
      setJournal: (newJournal) => set({journal: {field: "journal", operator : "LIKE", value : newJournal}}),
      clearAll: () => set({
        title: {field: "title", operator : "LIKE", value : ""}, 
        before: {field: "yearOfPublication", operator : "LESS_THAN", value : ""}, 
        after: {field: "yearOfPublication", operator : "GREATER_THAN", value : ""}, 
        journal: {field: "journal", operator : "LIKE", value : ""}
      })
    }),
    {
      name: 'filter-storage',
    }
  )
)