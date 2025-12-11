'use client'

import Navbar from '@/components/Navbar'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Portfolio from '@/components/sections/Portfolio'
import Resume from '@/components/sections/Resume'
import Services from '@/components/sections/Services'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activePage, setActivePage] = useState('services')
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <main>
      <div className="wrap">
        <Sidebar />
        <div className="separator2"></div>

        <div className="main-content fade-in">
          <Navbar activePage={activePage} setActivePage={setActivePage} />

          <Services isActive={activePage === 'services'} />
          <About isActive={activePage === 'about'} />
          <Resume isActive={activePage === 'resume'} />
          <Portfolio isActive={activePage === 'portfolio'} />
          <Contact isActive={activePage === 'contact'} />
        </div>
      </div>

      <div className="copyright">
        <div className="cc-text">
          <p>All Rights Reserved. &copy; <em id="currentYear">{currentYear}</em> | Winter Jackson</p>
        </div>
      </div>
    </main>
  )
}
