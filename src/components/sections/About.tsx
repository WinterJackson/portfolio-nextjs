'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AboutProps {
  isActive: boolean
}

const whatIDo = [
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

const languages = [
  { src: '/images/CSS3.png', name: 'CSS3' },
  { src: '/images/HTML5.png', name: 'HTML5' },
  { src: '/images/javascript.svg', name: 'JavaScript' },
  { src: '/images/react.svg', name: 'React' },
  { src: '/images/Tailwind.png', name: 'Tailwind CSS' },
  { src: '/images/nextjs-dark.svg', name: 'Next.js' },
  { src: '/images/nodejs.svg', name: 'Node.js' },
  { src: '/images/python.svg', name: 'Python' },
  { src: '/images/flask.svg', name: 'Flask' },
  { src: '/images/mysql.svg', name: 'MySQL' },
  { src: '/images/sqlite.png', name: 'SQLite' },
  { src: '/images/sqlalchemy.png', name: 'SQLAlchemy' },
  { src: '/images/Ruby.png', name: 'Ruby' },
  { src: '/images/MongoDB.svg', name: 'MongoDB' },
  { src: '/images/Jest.svg', name: 'Jest' },
]

const otherTools = [
  { src: '/images/Linux.png', name: 'Linux' },
  { src: '/images/Postman.svg', name: 'Postman' },
  { src: '/images/postgresql.svg', name: 'PostgreSQL' },
  { src: '/images/Heroku.png', name: 'Heroku' },
  { src: '/images/Git.png', name: 'Git' },
  { src: '/images/Figma.png', name: 'Figma' },
]

const personalVentures = [
  {
    icon: '/images/artificial-intelligence.png',
    webpIcon: '/images/artificial-intelligence.webp',
    title: 'Artificial Intelligence',
    description: 'Together with Machine Learning, Artificial Intelligence has imensely impacted the tech world.',
  },
  {
    icon: '/images/robotics.png',
    webpIcon: '/images/robotics.webp',
    title: 'Cyber Security',
    description: 'As data greatly becomes the gold mine for people in the tech world, cyber security has now been more on demand than ever.',
  },
]

const testimonials = [
  {
    name: 'Jeremy Omare',
    role: 'Renewable Energy Professional.',
    linkedin: 'https://www.linkedin.com/in/jeremyomare/',
    text: '"Exceptional service! Jackson provided unparalleled expertise and support throughout the entire development process. The attention to detail and commitment to delivering high-quality results exceeded my expectations. I highly recommend the services to anyone looking for top-notch tech solutions."',
    avatar: '/images/user.png',
    webpAvatar: '/images/user.webp',
  },
  {
    name: 'Nelson Lawrence',
    role: 'MD, Pinnacle Green Systems Ltd.',
    linkedin: 'https://www.linkedin.com/in/nelson-lawrence-91bb2671/',
    text: '"Working with Winter Jackson, on my project has been a positive experience so far. The collaborative nature and innovative solutions have made the development process smooth and efficient. Looking forward to the project\'s completion!"',
    avatar: '/images/user.png',
    webpAvatar: '/images/user.webp',
  },
  {
    name: 'Kimathi I.',
    role: 'Investment Manager',
    linkedin: 'https://www.linkedin.com/in/ikiao/',
    text: '"Absolutely reliable and highly efficient! Not only was our project completed well ahead of schedule, but the quality of work delivered surpassed the expectations. Exceptional service from start to finish!"',
    avatar: '/images/user.png',
    webpAvatar: '/images/user.webp',
  },
]

export default function About({ isActive }: AboutProps) {
  const [activeModal, setActiveModal] = useState<typeof testimonials[0] | null>(null)

  return (
    <article className={`about ${isActive ? 'active' : ''}`} data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="hidden show about-text">
        <p>
          An experienced software developer proficient in analyzing, modifying,
          and designing end-user applications tailored to specific needs. Skilled
          in Python, React JS, Next JS, and common libraries for development
          and testing.
        </p>
        <p>
          I am committed to developing a website or application that seamlessly blends functionality with
          aesthetic appeal. With a focus on user experience, I strive to infuse each project with a
          personal touch, ensuring it is visually captivating and easily navigable. Thus effectively
          engaging the users while positively upholding the brand identity through a creative design and a
          user-friendly interface.
        </p>
      </section>

      {/* What I Do */}
      <section className="hidden show service">
        <h3 className="h3 service-title">What I Do</h3>
        <ul className="service-list">
          {whatIDo.map((item, index) => (
            <li key={index} className="service-item">
              <div className="service-icon-box">
                <picture>
                  <source srcSet={item.webpIcon} type="image/webp" />
                  <Image src={item.icon} alt={`${item.title} icon`} width={40} height={40} />
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
                {languages.map((lang, index) => (
                  <div key={index} className="slider-item">
                    <div className="slider-img-container">
                      <Image 
                        src={lang.src} 
                        alt={`${lang.name} logo`} 
                        width={60} 
                        height={60}
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
                {otherTools.map((tool, index) => (
                  <div key={index} className="slider-item">
                    <div className="slider-img-container">
                      <Image 
                        src={tool.src} 
                        alt={`${tool.name} logo`} 
                        width={60} 
                        height={60}
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
          {personalVentures.map((item, index) => (
            <li key={index} className="service-item">
              <div className="service-icon-box">
                <picture>
                  <source srcSet={item.webpIcon} type="image/webp" />
                  <Image src={item.icon} alt={`${item.title} icon`} width={40} height={40} />
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
          {testimonials.map((testimonial, index) => (
            <li key={index} className="testimonials-item">
              <div
                className="content-card"
                onClick={() => setActiveModal(testimonial)}
                data-testimonials-item
              >
                <figure className="testimonials-avatar-box">
                  <picture>
                    <source srcSet={testimonial.webpAvatar} type="image/webp" />
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      data-testimonials-avatar
                    />
                  </picture>
                </figure>

                <div className="testimonial-name-wrap">
                  <h4 className="h4 testimonials-item-title" data-testimonials-title>
                    {testimonial.name}
                    <span>{testimonial.role}</span>
                  </h4>
                </div>

                <div className="testimonials-text" data-testimonials-text>
                  <a className="t-text" href={testimonial.linkedin} target="_blank" rel="noopener noreferrer">
                    <span>LinkedIn</span>
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                  <p>{testimonial.text}</p>
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
              <ion-icon name="close-outline"></ion-icon>
            </button>

            <div className="modal-img-wrapper">
              <figure className="modal-avatar-box">
                <picture>
                  <source srcSet={activeModal.webpAvatar} type="image/webp" />
                  <Image
                    src={activeModal.avatar}
                    alt={activeModal.name}
                    width={80}
                    height={80}
                    data-modal-img
                  />
                </picture>
              </figure>
            </div>

            <div className="modal-content">
              <div className="testimonial-name-wrap">
                <h4 className="h3 modal-title" data-modal-title>{activeModal.name}</h4>
              </div>
              <div data-modal-text>
                <p>{activeModal.text}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </article>
  )
}
