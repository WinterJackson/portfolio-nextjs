'use client'

import { useRouter } from 'next/navigation'

export default function AdminMobileNav() {
  const router = useRouter()

  return (
    <div className="admin-mobile-nav">
      <button 
        onClick={() => router.back()} 
        className="nav-arrow-btn"
        aria-label="Go Back"
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
      
      <span className="nav-separator">|</span>

      <button 
        onClick={() => router.forward()} 
        className="nav-arrow-btn"
        aria-label="Go Forward"
      >
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </button>
    </div>
  )
}
