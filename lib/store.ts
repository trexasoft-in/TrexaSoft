'use client'

import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
}

interface AuthStore {
  user: User | null
  access_token: string | null
  refresh_token: string | null
  hydrated: boolean
  hydrate_auth: () => void
  set_auth: (user: User, access_token: string, refresh_token: string) => void
  update_user: (updates: Partial<User>) => void
  clear_auth: () => void
}

export const use_auth_store = create<AuthStore>((set) => ({
  user: null,
  access_token: null,
  refresh_token: null,
  hydrated: false,

  hydrate_auth: () => {
    if (typeof window === 'undefined') return

    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    set({
      access_token,
      refresh_token,
      hydrated: true,
    })
  },

  set_auth: (user, access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)

    set({
      user,
      access_token,
      refresh_token,
      hydrated: true,
    })
  },

  update_user: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  clear_auth: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    set({
      user: null,
      access_token: null,
      refresh_token: null,
      hydrated: true,
    })
  },
}))
