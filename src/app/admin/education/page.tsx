'use client'

import { useEffect, useState } from 'react'

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  order: number
}

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)

  useEffect(() => {
    fetchEducations()
  }, [])

  const fetchEducations = async () => {
    try {
      const res = await fetch('/api/education')
      if (res.ok) {
        const data = await res.json()
        setEducations(data)
      }
    } catch (error) {
      console.error('Failed to fetch education:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education?')) return

    try {
      const res = await fetch(`/api/education/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setEducations(educations.filter(e => e.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete education:', error)
    }
  }

  const handleEdit = (item: Education) => {
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
          <h1>Education</h1>
          <p>Manage your educational background</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Education
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading education...</div>
      ) : educations.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="school-outline"></ion-icon>
          <h3>No education yet</h3>
          <p>Add your educational background to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Education</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Degree</th>
                <th>Field</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((item) => (
                <tr key={item.id}>
                  <td>{item.institution}</td>
                  <td>{item.degree}</td>
                  <td>{item.field}</td>
                  <td>{item.startDate} — {item.endDate}</td>
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
        <EducationModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchEducations()
          }}
        />
      )}
    </div>
  )
}

function EducationModal({ 
  item, 
  onClose, 
  onSave 
}: { 
  item: Education | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    institution: item?.institution || '',
    degree: item?.degree || '',
    field: item?.field || '',
    startDate: item?.startDate || '',
    endDate: item?.endDate || '',
    order: item?.order || 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = item ? `/api/education/${item.id}` : '/api/education'
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
      console.error('Failed to save education:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Education' : 'Add Education'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={e => setFormData({ ...formData, institution: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={formData.degree}
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g., Bachelor's"
                required
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                value={formData.field}
                onChange={e => setFormData({ ...formData, field: e.target.value })}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="e.g., 2019"
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="e.g., 2023"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
