'use client'

import { useEffect, useState } from 'react'

interface Project {
  id: string
  title: string
  category: string
  categories: string[]
  description: string
  imageUrl: string
  demoUrl?: string
  githubUrl?: string
  isActive: boolean
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingProject(null)
    setShowModal(true)
  }

  return (
    <div className="admin-page">
      <header className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <button onClick={handleAdd} className="add-btn">
          <ion-icon name="add-outline"></ion-icon>
          Add Project
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <ion-icon name="folder-open-outline"></ion-icon>
          <h3>No projects yet</h3>
          <p>Add your first project to get started</p>
          <button onClick={handleAdd} className="add-btn">Add Project</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>
                    <span className="category-badge">{project.category}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${project.isActive ? 'active' : 'inactive'}`}>
                      {project.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(project)} className="edit-btn">
                        <ion-icon name="create-outline"></ion-icon>
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="delete-btn">
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
        <ProjectModal
          project={editingProject}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false)
            fetchProjects()
          }}
        />
      )}
    </div>
  )
}

function ProjectModal({ 
  project, 
  onClose, 
  onSave 
}: { 
  project: Project | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || 'web development',
    categories: project?.categories || ['web development'],
    description: project?.description || '',
    imageUrl: project?.imageUrl || '',
    demoUrl: project?.demoUrl || '',
    githubUrl: project?.githubUrl || '',
    isActive: project?.isActive ?? true,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects'
      const method = project ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Failed to save project:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{project ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onClose} className="close-btn">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="web development">Web Development</option>
              <option value="applications">Applications</option>
              <option value="personal projects">Personal Projects</option>
            </select>
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
            <label>Image URL</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Demo URL</label>
              <input
                type="text"
                value={formData.demoUrl}
                onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
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
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
