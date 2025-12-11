'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <aside className={`sidebar slide-in-right ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        {/* Avatar Section */}
        <div className="container">
          <div className="box">
            <div className="spin-container">
              <div className="shape">
                <div className="avatar-box"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-content">
          <h1 className="name" title="Winter Jackson">Winter Jackson.</h1>
          <p className="title">Software Developer.</p>
        </div>

        <button
          className="info_more-btn"
          onClick={() => setIsActive(!isActive)}
          data-sidebar-btn
        >
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          {/* Email */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">E-mail</p>
              <a href="mailto:winterjacksonwj@gmail.com" className="contact-link">
                winterjacksonwj@gmail.com
              </a>
            </div>
          </li>

          {/* Phone */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+254795213399" className="contact-link">
                +254 (795) 213-399
              </a>
            </div>
          </li>

          {/* Alt Phone */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Alt. Phone</p>
              <a href="tel:+254772393864" className="contact-link">
                +254 (772) 393-864
              </a>
            </div>
          </li>

          {/* Location */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Nairobi, Kenya.</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href="https://github.com/WinterJackson" className="social-link" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://www.linkedin.com/in/winter-jackson-454843178/" className="social-link" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://wa.me/+254795213399" className="social-link" target="_blank" rel="noopener noreferrer">
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
