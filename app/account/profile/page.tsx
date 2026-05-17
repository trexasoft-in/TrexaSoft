'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Save,
  AlertCircle,
  CheckCircle2,
  Pencil,
  X,
  Camera,
  Mail,
  User2
} from 'lucide-react'
import { auth_api } from '@/lib/auth_api'
import { use_auth_store } from '@/lib/store'

type ProfileDraft = {
  name: string
  bio: string
  avatar_url: string
}

export default function ProfilePage() {
  const { user, access_token, update_user } = use_auth_store()

  const [profile, set_profile] = useState<ProfileDraft>({
    name: '',
    bio: '',
    avatar_url: '',
  })

  const [draft, set_draft] = useState<ProfileDraft>({
    name: '',
    bio: '',
    avatar_url: '',
  })

  const [editing, set_editing] = useState(false)
  const [loading, set_loading] = useState(false)
  const [fetching, set_fetching] = useState(true)
  const [error, set_error] = useState('')
  const [success, set_success] = useState('')
  const [selected_file, set_selected_file] = useState<File | null>(null)
  const [preview_url, set_preview_url] = useState('')

  useEffect(() => {
    const fetch_me = async () => {
      if (!access_token) return

      try {
        const res = await auth_api.get_me(access_token)
        const u = res.user || res

        const next_profile = {
          name: u.name || '',
          bio: u.bio || '',
          avatar_url: u.avatar_url || '',
        }

        set_profile(next_profile)
        set_draft(next_profile)
        update_user(u)
      } catch {
      } finally {
        set_fetching(false)
      }
    }

    fetch_me()
  }, [access_token, update_user])

  useEffect(() => {
    if (!selected_file) {
      set_preview_url('')
      return
    }

    const object_url = URL.createObjectURL(selected_file)
    set_preview_url(object_url)

    return () => URL.revokeObjectURL(object_url)
  }, [selected_file])

  const display_avatar =
    preview_url || draft.avatar_url || profile.avatar_url || user?.avatar_url || ''

  const initials = useMemo(() => {
    const source_name = (editing ? draft.name : profile.name) || user?.name || ''
    return source_name
      ? source_name
          .split(' ')
          .map((w: string) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '?'
  }, [draft.name, editing, profile.name, user?.name])

  const handle_change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    set_draft((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    set_error('')
    set_success('')
  }

  const handle_file_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      set_error('Please select a valid image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      set_error('Please choose an image smaller than 2 MB.')
      return
    }

    set_selected_file(file)
    set_error('')
    set_success('')
  }

  const handle_edit = () => {
    set_draft(profile)
    set_selected_file(null)
    set_preview_url('')
    set_editing(true)
    set_error('')
    set_success('')
  }

  const handle_cancel = () => {
    set_draft(profile)
    set_selected_file(null)
    set_preview_url('')
    set_editing(false)
    set_error('')
    set_success('')
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!draft.name.trim()) {
      set_error('Name cannot be empty.')
      return
    }

    set_loading(true)
    set_error('')
    set_success('')

    try {
      let final_avatar_url = profile.avatar_url

      if (selected_file) {
        const upload_res = await auth_api.upload_avatar(access_token!, selected_file)

        if (upload_res.error) {
          set_error(upload_res.error)
          set_loading(false)
          return
        }

        final_avatar_url = upload_res.avatar_url
      }

      const payload = {
        name: draft.name.trim(),
        bio: draft.bio.trim(),
        avatar_url: final_avatar_url,
      }

      const res = await auth_api.update_profile(access_token!, payload)

      if (res.error) {
        set_error(res.error)
      } else {
        const updated_user = res.user || {
          ...user,
          ...payload,
        }

        const updated_profile = {
          name: updated_user.name || '',
          bio: updated_user.bio || '',
          avatar_url: updated_user.avatar_url || '',
        }

        set_profile(updated_profile)
        set_draft(updated_profile)
        update_user(updated_user)
        set_selected_file(null)
        set_preview_url('')
        set_editing(false)
        set_success('Profile updated successfully.')
      }
    } catch {
      set_error('Unable to connect. Please try again.')
    } finally {
      set_loading(false)
    }
  }

  if (fetching) {
    return (
      <div style={{ maxWidth: '980px', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[100, 100, 100, 100].map((_, i) => (
            <div
              key={i}
              style={{
                height: i === 3 ? '240px' : '56px',
                width: '100%',
                borderRadius: '16px',
                background: 'linear-gradient(90deg, #f0ebf8 25%, #e8dff5 50%, #f0ebf8 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '980px',
        padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0f0a1a',
              marginBottom: '8px',
            }}
          >
            Profile
          </h1>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#4a4458', maxWidth: '620px' }}>
            Manage your personal details and profile photo across your TrexaSoft account.
          </p>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={handle_edit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#9D00FF',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '11px 16px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(157,0,255,0.18)',
            }}
          >
            <Pencil size={15} />
            Edit profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handle_cancel}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                color: '#4a4458',
                border: '1px solid rgba(157,0,255,0.18)',
                borderRadius: '10px',
                padding: '11px 16px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              <X size={15} />
              Cancel
            </button>

            <button
              form="profile-form"
              type="submit"
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: loading ? '#c97dff' : '#9D00FF',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '11px 16px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(157,0,255,0.18)',
              }}
            >
              <Save size={15} />
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 320px) minmax(0, 1fr)',
          gap: '20px',
        }}
        className="profile-grid"
      >
        <div
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #faf7ff 100%)',
            border: '1px solid rgba(157,0,255,0.1)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 12px 30px rgba(157,0,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {display_avatar ? (
              <img
                src={display_avatar}
                alt="Profile avatar"
                width={104}
                height={104}
                style={{
                  width: '104px',
                  height: '104px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid rgba(157,0,255,0.12)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '104px',
                  height: '104px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9D00FF 0%, #7b2ff7 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  border: '4px solid rgba(157,0,255,0.12)',
                }}
              >
                {initials}
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#0f0a1a',
                marginBottom: '6px',
              }}
            >
              {profile.name || 'Your profile'}
            </h2>
            <p style={{ fontSize: '14px', color: '#6b647a', lineHeight: 1.6 }}>
              {user?.email}
            </p>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(157,0,255,0.08)',
              paddingTop: '16px',
              display: 'grid',
              gap: '12px',
            }}
          >
            <InfoRow
              icon={<User2 size={16} />}
              label="Display name"
              value={profile.name || 'Not set'}
            />
            <InfoRow
              icon={<Mail size={16} />}
              label="Email address"
              value={user?.email || 'Not available'}
            />

          </div>
        </div>

        <form
          id="profile-form"
          onSubmit={handle_submit}
          style={{
            background: '#fff',
            border: '1px solid rgba(157,0,255,0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(157,0,255,0.06)',
          }}
        >
          <div
            style={{
              padding: '22px 24px',
              borderBottom: '1px solid rgba(157,0,255,0.08)',
              background: '#fcfbfe',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 800,
                color: '#0f0a1a',
                marginBottom: '6px',
              }}
            >
              Personal information
            </h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#6b647a' }}>
              Review and update your account details here.
            </p>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: '#fff0f3',
                  border: '1px solid rgba(225,29,72,0.2)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: '#be123c',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{error}</span>
              </div>
            ) : null}

            {success ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: '#f0fdf4',
                  border: '1px solid rgba(22,163,74,0.2)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: '#15803d',
                }}
              >
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{success}</span>
              </div>
            ) : null}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1fr)',
                gap: '18px',
                alignItems: 'start',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(157,0,255,0.08)',
              }}
              className="profile-photo-row"
            >
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f0a1a', marginBottom: '4px' }}>
                  Photo
                </p>
                <p style={{ fontSize: '12px', color: '#8a7fa0', lineHeight: 1.6 }}>
                  JPG, PNG or WEBP up to 2 MB.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {display_avatar ? (
                  <img
                    src={display_avatar}
                    alt="Avatar preview"
                    width={72}
                    height={72}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(157,0,255,0.12)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: '#f3e6ff',
                      color: '#9D00FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                    }}
                  >
                    {initials}
                  </div>
                )}

                {editing ? (
                  <label
                    htmlFor="avatar-upload"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#fff',
                      color: '#4a4458',
                      border: '1px solid rgba(157,0,255,0.18)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={15} />
                    Choose photo
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handle_file_change}
                      style={{ display: 'none' }}
                    />
                  </label>
                ) : (
                  <div style={{ fontSize: '13px', color: '#6b647a', lineHeight: 1.6 }}>
                    Your profile photo is shown across the account interface.
                  </div>
                )}
              </div>
            </div>

            <Field
              label="Full name"
              hint="This name appears across TrexaSoft products."
              id="name"
            >
              <input
                id="name"
                name="name"
                type="text"
                value={editing ? draft.name : profile.name}
                onChange={handle_change}
                disabled={!editing || loading}
                placeholder="Your full name"
                style={input_style(!editing || loading)}
              />
            </Field>



            <Field
              label="Email"
              hint="Email cannot be edited here."
              id="email"
            >
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                style={input_style(true)}
              />
            </Field>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .profile-photo-row,
          .profile-field {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

function Field({
  label,
  hint,
  id,
  children,
}: {
  label: string
  hint?: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div
      className="profile-field"
      style={{
        display: 'grid',
        gridTemplateColumns: '180px minmax(0, 1fr)',
        gap: '18px',
        alignItems: 'start',
      }}
    >
      <div>
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0f0a1a',
            marginBottom: '4px',
          }}
        >
          {label}
        </label>
        {hint ? (
          <p style={{ fontSize: '12px', color: '#8a7fa0', lineHeight: 1.6 }}>{hint}</p>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: '#f3e6ff',
          color: '#9D00FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#8a7fa0', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '14px', color: '#0f0a1a', lineHeight: 1.5 }}>{value}</p>
      </div>
    </div>
  )
}

function input_style(disabled: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid rgba(157,0,255,0.18)',
    borderRadius: '12px',
    fontSize: '15px',
    color: disabled ? '#6b647a' : '#0f0a1a',
    background: disabled ? '#fafafa' : '#fff',
    outline: 'none',
    fontFamily: 'Satoshi, sans-serif',
    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
    cursor: disabled ? 'not-allowed' : 'text',
  }
}
