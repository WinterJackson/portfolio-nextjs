'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PortfolioProps {
  isActive: boolean
}

interface Project {
  id: number
  title: string
  category: string
  categories: string[]
  image: string
  webpImage: string
  description: string
  demoUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Vepo Clear Water',
    category: 'web development',
    categories: ['web development'],
    image: '/images/vepo.jpg',
    webpImage: '/images/vepo.webp',
    description: 'Vepo Clear Water project entails the creation of an application dedicated to vending bottled, purified, drinking water. This ongoing development focuses on crafting an intuitive and efficient platform to streamline the process of accessing clean drinking water for users. From ensuring user-friendly interfaces to implementing secure payment systems, the project aims to deliver a seamless experience for both vendors and consumers alike.',
    demoUrl: 'https://tech-boffin.github.io/vepo-landing-page/',
  },
  {
    id: 2,
    title: 'Plutus Capital',
    category: 'web development',
    categories: ['web development'],
    image: '/images/plutus-capital.jpg',
    webpImage: '/images/plutus-capital.webp',
    description: 'Worked together in a team project at Plutus Capital, crafting an advanced web platform for managing investments. Tasks involved creating backend algorithms and ensuring seamless integration between frontend and backend systems. Employed technologies like Python, Flask, SQL, and JavaScript. Produced a user-focused application that enhances investment strategies. Future objectives encompass integrating machine learning and broadening product offerings.',
    demoUrl: 'https://plutus.co.ke/',
    githubUrl: 'https://github.com/WinterJackson/Plutus_Capital',
  },
  {
    id: 3,
    title: 'BTS Sizing Tool',
    category: 'applications',
    categories: ['applications'],
    image: '/images/bts-sizing-tool.jpg',
    webpImage: '/images/bts-sizing-tool.webp',
    description: 'For a client, I developed a specialized calculator tool to streamline solar panel installations. This Python-based application, utilizing the tkinter library for UI styling, offered two primary functionalities: calculating the required number of solar panels and determining the appropriate battery specifications for each project. By inputting specific project requirements, users could obtain accurate estimations for panel quantity and battery size, facilitating efficient planning and execution of solar energy systems.',
    githubUrl: 'https://github.com/WinterJackson/BTS-Sizing-Tool',
  },
  {
    id: 4,
    title: 'Yikes YouTube Downloader',
    category: 'applications, personal projects',
    categories: ['applications', 'personal projects'],
    image: '/images/yikes-ytd.jpg',
    webpImage: '/images/yikes-ytd.webp',
    description: 'Yikes YTD is my latest personal project, a versatile YouTube video downloader application designed to download both individual videos and entire playlists. Currently functional on Linux platforms, the application is undergoing development for compatibility with Windows and iOS. To accelerate its progress, I\'ve made the project open-source, inviting contributions from fellow developers. This collaborative approach fosters innovation and ensures the project\'s continued enhancement and accessibility across various platforms.',
    demoUrl: 'https://winterjackson.github.io/site-yikes-ytd/index.html',
    githubUrl: 'https://github.com/WinterJackson/Yikes-YTD',
  },
  {
    id: 5,
    title: 'AllCurrency',
    category: 'personal projects',
    categories: ['personal projects'],
    image: '/images/acc.jpg',
    webpImage: '/images/acc.webp',
    description: 'AllCurrency was one of my early projects, developed as a platform to provide comprehensive information about global cryptocurrencies. Leveraging a free API, the platform offered users access to real-time exchange rates, historical exchange rate data, and a currency converter tool. Despite being one of my initial projects during the learning phase, it served as an invaluable opportunity to gain practical experience in web development and API integration.',
    demoUrl: 'https://all-currency-crypto.vercel.app/',
    githubUrl: 'https://github.com/WinterJackson/allCurrencyCrypto',
  },
]

const filters = ['All', 'Applications', 'Web development', 'Personal projects']

export default function Portfolio({ isActive }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.categories.includes(activeFilter.toLowerCase())
  )

  return (
    <article className={`portfolio ${isActive ? 'active' : ''}`} data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="hidden show projects">
        {/* Desktop Filter */}
        <ul className="filter-list">
          {filters.map((filter) => (
            <li key={filter} className="filter-item">
              <button
                className={activeFilter === filter.toLowerCase() ? 'active' : ''}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                data-filter-btn
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Filter Select */}
        <div className="filter-select-box">
          <button
            className={`filter-select ${isSelectOpen ? 'active' : ''}`}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            data-select
          >
            <div className="select-value" data-selecct-value>
              {activeFilter === 'all' ? 'Select category' : activeFilter}
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list ${isSelectOpen ? '' : ''}`} style={{ opacity: isSelectOpen ? 1 : 0, visibility: isSelectOpen ? 'visible' : 'hidden', pointerEvents: isSelectOpen ? 'all' : 'none' }}>
            {filters.map((filter) => (
              <li key={filter} className="select-item">
                <button
                  onClick={() => {
                    setActiveFilter(filter.toLowerCase())
                    setIsSelectOpen(false)
                  }}
                  data-select-item
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="about-project">
          * Click on the eye icon to check the respective project upon hovering.
        </p>

        <ul className="project-list">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-wrap">
              <li className="project-item active" data-filter-item data-category={project.category}>
                <a href={project.demoUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <figure className="project-img">
                    <div className="project-item-icon-box">
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>
                    <picture>
                      <source srcSet={project.webpImage} type="image/webp" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={200}
                        loading="lazy"
                      />
                    </picture>
                  </figure>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </a>
                <div className="project-btns">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-btn">
                      Github
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="demo-btn">
                      Demo
                    </a>
                  )}
                </div>
              </li>
              <div className="project-description">
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </article>
  )
}
