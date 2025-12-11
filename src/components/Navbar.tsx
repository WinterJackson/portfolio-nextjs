'use client'

interface NavbarProps {
  activePage: string
  setActivePage: (page: string) => void
}

const navItems = ['Services', 'About', 'Resume', 'Portfolio', 'Contact']

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const handleNavClick = (page: string) => {
    setActivePage(page.toLowerCase())
    window.scrollTo(0, 0)
  }

  return (
    <nav className="navbar">
      <div className="nav-wrap">
        <ul className="navbar-list">
          {navItems.map((item) => (
            <li key={item} className="navbar-item">
              <button
                className={`navbar-link ${activePage === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
                data-nav-link
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
