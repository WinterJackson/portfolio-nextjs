'use client'

import { useEffect, useState } from 'react'

interface Experience {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate?: string
  description: string
  order: number
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Experience | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience')
      if (res.ok) {
        const data = await res.json()
        setExperiences(data)
      }
    } catch (error) {
      console.error('Failed to fetch experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setExperiences(experiences.filter(e => e.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete experience:', error)
    }
  }

  const handleEdit = (item: Experience) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setShowModal(true)
  }

  return (
    <div className="admin-page">
      <header className="page-header">
        <div>
          <h1>Experience</h1>
          <p>Manage your work experience</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Experience
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading experience...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="briefcase-outline"></ion-icon>
          <h3>No experience yet</h3>
          <p>Add your work experience to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Experience</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((item) => (
                <tr key={item.id}>
                  <td>{item.jobTitle}</td>
                  <td>{item.company}</td>
                  <td>{item.startDate} — {item.endDate || 'Present'}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(item)} className="edit-btn">
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn">
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ExperienceModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchExperiences()
          }}
        />
      )}
    </div>
  )
}

function ExperienceModal({ 
  item, 
  onClose, 
  onSave 
}: { 
  item: Experience | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    jobTitle: item?.jobTitle || '',
    company: item?.company || '',
    startDate: item?.startDate || '',
    endDate: item?.endDate || '',
    description: item?.description || '',
    order: item?.order || 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = item ? `/api/experience/${item.id}` : '/api/experience'
      const method = item ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Failed to save experience:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Experience' : 'Add Experience'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="e.g., Jan 2023"
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="Leave empty for current"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
