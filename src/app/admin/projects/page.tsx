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
                  <td>
                    <div className="project-title-cell">
                      <span>{project.title}</span>
                    </div>
                  </td>
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

      <style jsx>{`
        .admin-page {
          max-width: 1200px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .page-header h1 {
          color: #fff;
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .page-header p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ef4444;
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-btn:hover {
          background: #dc2626;
        }

        .loading {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          padding: 60px;
        }

        .empty-state {
          text-align: center;
          padding: 80px 40px;
          background: #1e293b;
          border-radius: 12px;
          border: 1px dashed rgba(255, 255, 255, 0.2);
        }

        :global(.empty-state ion-icon) {
          font-size: 64px;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: #fff;
          font-size: 20px;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 24px 0;
        }

        .table-container {
          background: #1e293b;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table td {
          padding: 16px 20px;
          color: #fff;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .project-title-cell {
          font-weight: 500;
        }

        .category-badge {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 13px;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 13px;
        }

        .status-badge.active {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }

        .status-badge.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .edit-btn, .delete-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: rgba(255, 255, 255, 0.7);
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        :global(.edit-btn ion-icon), :global(.delete-btn ion-icon) {
          font-size: 18px;
          display: block;
        }
      `}</style>
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

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            padding: 20px;
          }

          .modal-content {
            background: #1e293b;
            border-radius: 12px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .modal-header h2 {
            color: #fff;
            font-size: 20px;
            margin: 0;
          }

          .close-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            padding: 4px;
          }

          :global(.close-btn ion-icon) {
            font-size: 24px;
          }

          .modal-form {
            padding: 24px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
          }

          .form-group input,
          .form-group select,
          .form-group textarea {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-size: 15px;
          }

          .form-group input:focus,
          .form-group select:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #ef4444;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
          }

          .checkbox-group input {
            width: auto;
          }

          .modal-footer {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
          }

          .cancel-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
          }

          .save-btn {
            background: #ef4444;
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
          }

          .save-btn:disabled {
            opacity: 0.6;
          }
        `}</style>
      </div>
    </div>
  )
}
