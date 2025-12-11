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
    </div>
  )
}
