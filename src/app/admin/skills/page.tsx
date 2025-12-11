'use client'

import { useEffect, useState } from 'react'

interface Skill {
  id: string
  name: string
  percentage: number
  category: string
  iconUrl?: string
  order: number
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Skill | null>(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      if (res.ok) {
        const data = await res.json()
        setSkills(data)
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete skill:', error)
    }
  }

  const handleEdit = (item: Skill) => {
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
          <h1>Skills</h1>
          <p>Manage your skills and proficiency levels</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Skill
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="code-slash-outline"></ion-icon>
          <h3>No skills yet</h3>
          <p>Add your skills to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Skill</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>{item.percentage}%</td>
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
        <SkillModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchSkills()
          }}
        />
      )}
    </div>
  )
}

function SkillModal({ 
  item, 
  onClose, 
  onSave 
}: { 
  item: Skill | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    percentage: item?.percentage || 75,
    category: item?.category || 'main',
    iconUrl: item?.iconUrl || '',
    order: item?.order || 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = item ? `/api/skills/${item.id}` : '/api/skills'
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
      console.error('Failed to save skill:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Skill' : 'Add Skill'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="main">Main Skill</option>
                <option value="language">Programming Language</option>
                <option value="tool">Tool / Framework</option>
              </select>
            </div>
            <div className="form-group">
              <label>Proficiency ({formData.percentage}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={e => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Icon URL (optional)</label>
            <input
              type="text"
              value={formData.iconUrl}
              onChange={e => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="/images/skill-icon.png"
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
