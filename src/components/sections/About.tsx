import { Profile, Service, Skill, Testimonial } from '@prisma/client'
import { Linkedin, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface AboutProps {
  isActive: boolean
  profile: Profile
  testimonials: Testimonial[]
  services: Service[]
  skills: Skill[]
}

export default function About({ isActive, profile, testimonials, services, skills }: AboutProps) {
  const [activeModal, setActiveModal] = useState<Testimonial | null>(null)

  // Static lists as per user request for accurate implementation
  const languagesData = [
    { name: 'CSS3', icon: '/images/CSS3.png' },
    { name: 'HTML5', icon: '/images/HTML5.png' },
    { name: 'JavaScript', icon: '/images/javascript.svg' },
    { name: 'React', icon: '/images/react.svg' },
    { name: 'Tailwind CSS', icon: '/images/Tailwind.png' },
    { name: 'Next.js', icon: '/images/nextjs-dark.svg' },
    { name: 'Node.js', icon: '/images/nodejs.svg' },
    { name: 'Python', icon: '/images/python.svg' },
    { name: 'Flask', icon: '/images/flask.svg' },
    { name: 'MySQL', icon: '/images/mysql.svg' },
    { name: 'SQLite', icon: '/images/sqlite.png' },
    { name: 'SQLAlchemy', icon: '/images/sqlalchemy.png' },
    { name: 'Ruby', icon: '/images/Ruby.png' },
    { name: 'MongoDB', icon: '/images/MongoDB.svg' },
    { name: 'Jest', icon: '/images/Jest.svg' },
  ]

  const toolsData = [
    { name: 'Linux', icon: '/images/Linux.png' },
    { name: 'Postman', icon: '/images/Postman.svg' },
    { name: 'PostgreSQL', icon: '/images/postgresql.svg' },
    { name: 'Heroku', icon: '/images/Heroku.png' },
    { name: 'Git', icon: '/images/Git.png' },
    { name: 'Figma', icon: '/images/Figma.png' },
  ]

  // Filter Services
  const whatIDo = services.filter(s => s.category === 'service' || !s.category)
  const personalVentures = services.filter(s => s.category === 'venture')

  return (
    <article className={`about ${isActive ? 'active' : ''}`} data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="hidden show about-text">
        <div dangerouslySetInnerHTML={{ __html: profile.bio.replace(/\n/g, '<br/>') }} />
      </section>

      {/* What I Do */}
      <section className="hidden show service">
        <h3 className="h3 service-title">What I Do</h3>
        <ul className="service-list">
          {whatIDo.map((item) => (
            <li key={item.id} className="service-item">
              <div className="service-icon-box">
                <picture>
                  <Image src={item.iconUrl} alt={`${item.title} icon`} width={40} height={40} />
                </picture>
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{item.title}</h4>
                <p className="service-item-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Languages & Tools */}
      <section className="hidden languages show">
        <h3 className="h3 languages-title">Languages &amp; Other Tools</h3>
        <div className="lang-text">
          <p>Below are some of the Languages and web development tools am well conversant with.</p>
        </div>
        <div className="slider-wrap">
          <div className="slider-lang">
            <div className="slider-title1">
              <p>Languages</p>
            </div>
            {[0, 1].map((wrapIndex) => (
              <div key={wrapIndex} className="languages-items-wrap">
                {languagesData.map((lang, index) => (
                  <div key={index} className="slider-item">
                    <div className="slider-img-container">
                      <Image 
                        src={lang.icon} 
                        alt={`${lang.name} logo`} 
                        width={60} 
                        height={60}
                        unoptimized
                        style={{ objectFit: 'contain', width: '60px', height: '60px' }}
                      />
                    </div>
                    <p>{lang.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="slider-others">
            <div className="slider-title2">
              <p>Other tools</p>
            </div>
            {[0, 1].map((wrapIndex) => (
              <div key={wrapIndex} className="others-items-wrap">
                {toolsData.map((tool, index) => (
                  <div key={index} className="slider-item">
                    <div className="slider-img-container">
                       <Image 
                          src={tool.icon} 
                          alt={`${tool.name} logo`} 
                          width={60} 
                          height={60}
                          unoptimized
                          style={{ objectFit: 'contain', width: '60px', height: '60px' }}
                        />
                    </div>
                    <p>{tool.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Ventures */}
      <section className="hidden show service">
        <h3 className="h3 service-title">Personal Ventures</h3>
        <ul className="service-list">
          {personalVentures.map((item) => (
            <li key={item.id} className="service-item">
              <div className="service-icon-box">
                <picture>
                  <Image src={item.iconUrl} alt={`${item.title} icon`} width={40} height={40} />
                </picture>
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{item.title}</h4>
                <p className="service-item-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="hidden show testimonials">
        <h3 className="h3 testimonials-title">Testimonials</h3>
        <ul className="testimonials-list has-scrollbar">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="testimonials-item">
              <div
                className="content-card"
                onClick={() => setActiveModal(testimonial)}
                data-testimonials-item
              >
                <figure className="testimonials-avatar-box">
                  {testimonial.avatarUrl && (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      data-testimonials-avatar
                    />
                  )}
                </figure>

                <div className="testimonial-name-wrap">
                  <h4 className="h4 testimonials-item-title" data-testimonials-title>
                    {testimonial.name}
                    <span>{testimonial.role}</span>
                  </h4>
                </div>

                <div className="testimonials-text" data-testimonials-text>
                    {testimonial.linkedinUrl && (
                        <a className="t-text" href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <span>LinkedIn</span>
                            <Linkedin />
                        </a>
                    )}
                  <p>{testimonial.text.replace(/"/g, '')}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials Modal */}
      {activeModal && (
        <div className="modal-container active" data-modal-container>
          <div className="overlay active" onClick={() => setActiveModal(null)} data-overlay></div>
          <section className="hidden show testimonials-modal">
            <button
              className="modal-close-btn"
              onClick={() => setActiveModal(null)}
              data-modal-close-btn
            >
              <X />
            </button>

            <div className="modal-img-wrapper">
              <figure className="modal-avatar-box">
                {activeModal.avatarUrl && (
                  <Image
                    src={activeModal.avatarUrl}
                    alt={activeModal.name}
                    width={80}
                    height={80}
                    data-modal-img
                  />
                )}
              </figure>
            </div>

            <div className="modal-content">
              <div className="testimonial-name-wrap">
                <h4 className="h3 modal-title" data-modal-title>{activeModal.name}</h4>
              </div>
              <div data-modal-text>
                <p>{activeModal.text.replace(/"/g, '')}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </article>
  )
}
