'use client'

import Image from 'next/image'

interface ServicesProps {
  isActive: boolean
}

const services = [
  {
    icon: '/images/front-dev.png',
    webpIcon: '/images/front-dev.webp',
    title: 'Frontend Development',
    description: 'Well thought out User Interfaces for web applications to enhance the User Experience effectively.',
  },
  {
    icon: '/images/back-dev.png',
    webpIcon: '/images/back-dev.webp',
    title: 'Backend Development',
    description: 'Effective backend development for data security and proper data storage.',
  },
  {
    icon: '/images/phone-app.png',
    webpIcon: '/images/phone-app.webp',
    title: 'Mobile apps',
    description: 'Effective development of applications for both iOS and Android systems.',
  },
  {
    icon: '/images/api.png',
    webpIcon: '/images/api.webp',
    title: 'API Development',
    description: 'Development of the Application Programming Interface to enhance effective communication between the servers and the clients.',
  },
]

const clients = [
  { src: '/images/plutus-logo.png', webp: '/images/plutus-logo.webp', alt: 'client logo' },
  { src: '/images/yikes-logo.png', webp: '/images/yikes-logo.webp', alt: 'client logo' },
  { src: '/images/allCurrency-logo.png', webp: '/images/allCurrency-logo.webp', alt: 'client logo' },
  { src: '/images/vepo-logo.png', webp: '/images/vepo-logo.webp', alt: 'client logo' },
]

export default function Services({ isActive }: ServicesProps) {
  return (
    <article className={`services ${isActive ? 'active' : ''}`} data-page="services">
      <header>
        <h2 className="h2 article-title">Services</h2>
      </header>

      <section className="hidden show service">
        <ul className="service-list">
          {services.map((service, index) => (
            <li key={index} className="service-item">
              <div className="service-icon-box">
                <picture>
                  <source srcSet={service.webpIcon} type="image/webp" />
                  <Image src={service.icon} alt={`${service.title} icon`} width={40} height={40} />
                </picture>
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="hidden show clients">
        <h3 className="h3 clients-title">Clients</h3>
        <div className="slider">
          {[0, 1].map((wrapIndex) => (
            <div key={wrapIndex} className="client-items-wrap">
              {clients.map((client, index) => (
                <picture key={index}>
                  <source srcSet={client.webp} type="image/webp" />
                  <Image src={client.src} alt={client.alt} width={150} height={75} />
                </picture>
              ))}
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
