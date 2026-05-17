const BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL

export const auth_api = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  verify_email: async (data: { email: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  resend_otp: async (data: { email: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  get_me: async (token: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.json()
  },

  update_profile: async (
    token: string,
    data: { name?: string; bio?: string; avatar_url?: string }
  ) => {
    const res = await fetch(`${BASE_URL}/api/auth/update-profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  upload_avatar: async (token: string, file: File) => {
    const form_data = new FormData()
    form_data.append('avatar', file)

    const res = await fetch(`${BASE_URL}/api/auth/upload-avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form_data,
    })

    return res.json()
  },

  change_password: async (
    token: string,
    data: { current_password: string; new_password: string }
  ) => {
    const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  forgot_password: async (data: { email: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  reset_password: async (data: { email: string; otp: string; new_password: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  delete_account: async (token: string, data: { password: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/delete-account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  logout: async (refresh_token: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token }),
    })
    return res.json()
  },
}
