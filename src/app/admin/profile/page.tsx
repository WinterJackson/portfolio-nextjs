'use client'

import { useEffect, useState } from 'react'

interface Profile {
  id: string
  name: string
  title: string
  email: string
  phone: string
  altPhone?: string
  location: string
  bio: string
  avatarUrl?: string
  github?: string
  linkedin?: string
  whatsapp?: string
  cvUrl?: string
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setMessage('Profile updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
      setMessage('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="admin-page">
        <div className="empty-state">
          <ion-icon name="person-outline"></ion-icon>
          <h3>No profile found</h3>
          <p>Run the seed script to create initial profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Update your personal information</p>
        </div>
      </header>

      {message && (
        <div className="success-message">
          <ion-icon name="checkmark-circle-outline"></ion-icon>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={e => setProfile({ ...profile, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="text"
              value={profile.avatarUrl || ''}
              onChange={e => setProfile({ ...profile, avatarUrl: e.target.value })}
              placeholder="/images/my-avatar.png"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Alternative Phone</label>
              <input
                type="text"
                value={profile.altPhone || ''}
                onChange={e => setProfile({ ...profile, altPhone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={e => setProfile({ ...profile, location: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Social Links</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="text"
                value={profile.github || ''}
                onChange={e => setProfile({ ...profile, github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="text"
                value={profile.linkedin || ''}
                onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>WhatsApp Number</label>
              <input
                type="text"
                value={profile.whatsapp || ''}
                onChange={e => setProfile({ ...profile, whatsapp: e.target.value })}
                placeholder="+254795213399"
              />
            </div>
            <div className="form-group">
              <label>CV URL</label>
              <input
                type="text"
                value={profile.cvUrl || ''}
                onChange={e => setProfile({ ...profile, cvUrl: e.target.value })}
                placeholder="/docs/resume.pdf"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
