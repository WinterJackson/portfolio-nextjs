'use client'

import { SessionProvider, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'home-outline' },
  { href: '/admin/projects', label: 'Projects', icon: 'folder-outline' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: 'chatbubbles-outline' },
  { href: '/admin/experience', label: 'Experience', icon: 'briefcase-outline' },
  { href: '/admin/education', label: 'Education', icon: 'school-outline' },
  { href: '/admin/skills', label: 'Skills', icon: 'code-slash-outline' },
  { href: '/admin/services', label: 'Services', icon: 'construct-outline' },
  { href: '/admin/profile', label: 'Profile', icon: 'person-outline' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SessionProvider>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Portfolio Admin</h2>
          </div>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              <ion-icon name={item.icon}></ion-icon>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-nav-link view-site">
            <ion-icon name="eye-outline"></ion-icon>
            <span>View Site</span>
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="admin-logout-btn">
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #0f172a;
        }

        .admin-sidebar {
          width: 260px;
          background: #1e293b;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .admin-sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-sidebar-header h2 {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .admin-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        :global(.admin-nav-link) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s;
        }

        :global(.admin-nav-link:hover) {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        :global(.admin-nav-link.active) {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        :global(.admin-nav-link ion-icon) {
          font-size: 20px;
        }

        .admin-sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        :global(.view-site) {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.7);
          background: none;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .admin-logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        :global(.admin-logout-btn ion-icon) {
          font-size: 20px;
        }

        .admin-main {
          flex: 1;
          margin-left: 260px;
          padding: 32px;
          min-height: 100vh;
        }
      `}</style>
      </div>
    </SessionProvider>
  )
}
