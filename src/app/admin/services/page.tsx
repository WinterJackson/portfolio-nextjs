'use client'

import { useEffect, useState } from 'react'

interface Service {
  id: string
  title: string
  description: string
  iconUrl: string
  order: number
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Service | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServices(services.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }

  const handleEdit = (item: Service) => {
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
          <h1>Services</h1>
          <p>Manage services you offer</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Service
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="construct-outline"></ion-icon>
          <h3>No services yet</h3>
          <p>Add the services you offer to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Service</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description.substring(0, 60)}...</td>
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
        <ServiceModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchServices()
          }}
        />
      )}
    </div>
  )
}

function ServiceModal({ 
  item, 
  onClose, 
  onSave 
}: { 
  item: Service | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    iconUrl: item?.iconUrl || '',
    order: item?.order || 0,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = item ? `/api/services/${item.id}` : '/api/services'
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
      console.error('Failed to save service:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Service' : 'Add Service'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label>Icon URL</label>
            <input
              type="text"
              value={formData.iconUrl}
              onChange={e => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="/images/service-icon.png"
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
