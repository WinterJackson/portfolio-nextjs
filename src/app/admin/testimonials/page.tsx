'use client'

import { useEffect, useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  text: string
  linkedinUrl?: string
  avatarUrl?: string
  isActive: boolean
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  const handleEdit = (item: Testimonial) => {
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
          <h1>Testimonials</h1>
          <p>Manage client testimonials</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Testimonial
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="chatbubbles-outline"></ion-icon>
          <h3>No testimonials yet</h3>
          <p>Add your first testimonial to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Testimonial</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.company || '—'}</td>
                  <td>
                    <span className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                      {item.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
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
        <TestimonialModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchTestimonials()
          }}
        />
      )}
    </div>
  )
}

function TestimonialModal({ 
  item, 
  onClose, 
  onSave 
}: { 
  item: Testimonial | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    role: item?.role || '',
    company: item?.company || '',
    text: item?.text || '',
    linkedinUrl: item?.linkedinUrl || '',
    avatarUrl: item?.avatarUrl || '',
    isActive: item?.isActive ?? true,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = item ? `/api/testimonials/${item.id}` : '/api/testimonials'
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
      console.error('Failed to save testimonial:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Testimonial Text</label>
            <textarea
              value={formData.text}
              onChange={e => setFormData({ ...formData, text: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Avatar URL</label>
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Active (visible on portfolio)
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
