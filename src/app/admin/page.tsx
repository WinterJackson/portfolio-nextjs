'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

const stats = [
  { label: 'Projects', href: '/admin/projects', icon: 'folder-outline', color: '#3b82f6' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: 'chatbubbles-outline', color: '#10b981' },
  { label: 'Experience', href: '/admin/experience', icon: 'briefcase-outline', color: '#f59e0b' },
  { label: 'Skills', href: '/admin/skills', icon: 'code-slash-outline', color: '#8b5cf6' },
]

export default function AdminDashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {session?.user?.name || session?.user?.email || 'Admin'}</p>
      </header>

      <section className="dashboard-stats">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              <ion-icon name={stat.icon}></ion-icon>
            </div>
            <div className="stat-info">
              <h3>{stat.label}</h3>
              <p>Manage {stat.label.toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link href="/admin/projects" className="action-btn">
            <ion-icon name="add-circle-outline"></ion-icon>
            Add New Project
          </Link>
          <Link href="/admin/testimonials" className="action-btn">
            <ion-icon name="add-circle-outline"></ion-icon>
            Add Testimonial
          </Link>
          <Link href="/admin/profile" className="action-btn">
            <ion-icon name="create-outline"></ion-icon>
            Edit Profile
          </Link>
          <Link href="/" className="action-btn" target="_blank">
            <ion-icon name="eye-outline"></ion-icon>
            View Portfolio
          </Link>
        </div>
      </section>

      <style jsx>{`
        .admin-dashboard {
          max-width: 1200px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          color: #fff;
          font-size: 32px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .dashboard-header p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-info h3 {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .stat-info p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin: 0;
        }

        .dashboard-quick-actions {
          background: #1e293b;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px;
        }

        .dashboard-quick-actions h2 {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 20px 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }
      `}</style>
    </div>
  )
}
