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

  // Don't render admin layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

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
            <Link href="/" className="admin-nav-link view-site" target="_blank">
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
      </div>
    </SessionProvider>
  )
}
