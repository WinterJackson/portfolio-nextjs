'use client'

import { useEffect, useRef, useState } from 'react'

interface ResumeProps {
  isActive: boolean
}

const education = [
  {
    institution: 'Moringa School, Nairobi',
    field: 'Software Engineering | May, 2023 - November, 2024.',
  },
  {
    institution: 'European Business University, Luxembourg',
    field: 'Management Information Systems | September, 2022 - March, 2023.',
  },
  {
    institution: 'Kenyatta University, Nairobi',
    field: 'BSc. Commerce, Procurement & Supply Chain Management | September, 2016 - July, 2022.',
  },
]

const experience = [
  {
    title: 'Junior Software Developer.',
    company: 'Snark Health',
    period: 'Jr. Software Dev | April 2024 - Current',
    responsibilities: [
      'Updating the Android App: Adapting the app to the latest Next.js framework and deploying the dashboard.',
      'Hospital Search: Adding the hospital search feature and booking functionality.',
      'EMR Integration: Connecting the app with the EMR dashboard for seamless communication.',
      'KPIs and Analytics: Tracking and analyzing key performance indicators.',
      'Dashboard Implementation: Developing a dashboard for hospitals to manage patients.',
      'Writing clean, maintainable code in accordance with well-known coding standards and best practices.',
    ],
  },
  {
    title: 'Junior Software Developer.',
    company: 'Vepo Clear Water Ltd.',
    period: 'Intern | September 2023 - Dec 2023\nJr. Software Dev | January 2024 - March 2024',
    responsibilities: [
      'Participating in the design, development, and testing of a sales and production automation application.',
      'Collaborating with other software engineers to execute project requirements and translate them into technical specifications.',
      'Implementing new features and functionalities to the automated application as outlined in the project roadmap.',
      'Troubleshooting and debugging issues to ensure smooth operation of the application.',
      'Working closely with cross-functional teams, such as sales, production, and quality assurance, to gather requirements, and insights and address concerns.',
      'Providing technical support to end-users as needed.',
      'Writing clean, maintainable code in accordance with well-known coding standards and best practices.',
      'Keeping abreast of industry trends and advancements in software development methodologies.',
    ],
  },
  {
    title: 'Data Analyst Intern.',
    company: 'Apollo Agriculture',
    period: 'October 2021 - April 2022.',
    responsibilities: [
      'Collaborating with other colleagues in the management of each farmer\'s information.',
      'Data Collection. Gathering and cleaning data from various sources, including customer transactions, credit applications, and agricultural training records.',
      'Printing of reports for analysis of the data collected.',
      'Analyzing customer insights and feedback to enhance product improvements and better customer engagement strategies.',
    ],
  },
  {
    title: 'Credit Analyst',
    company: 'Momentum Credit Ltd.',
    period: 'March 2021 - September 2021.',
    responsibilities: [
      'Analyzing financial data, such as income statements, balance sheets, and cash flow statements, to evaluate the applicant\'s financial health.',
      'Assessing the creditworthiness of individuals or businesses applying for loans or credit lines.',
      'Reviewing credit history, payment records, and credit scores to determine the applicant\'s repayment capacity and risk profile.',
      'Communicating with applicants to gather additional information and clarify financial details as needed.',
      'Collaborating with underwriters, loan officers, and other team members to ensure thorough evaluation and decision-making processes.',
      'Monitoring existing credit accounts and performing periodic reviews to assess ongoing credit risk and recommend adjustments to credit terms if necessary.',
      'Maintaining accurate records and documentation of credit assessments and decisions for compliance and audit purposes.',
    ],
  },
  {
    title: 'Merchandiser / Brand Ambassador',
    company: 'Swivel Marketing Agency',
    period: 'February 2019 - January 2020.',
    responsibilities: [
      'Representing the brands being marketed positively in different marketing strategies carried out.',
      'Participating in event planning aimed at marketing the brands and making sure the events run smoothly',
      'Issuing and keeping track of the available marketing merchandise used.',
      'Creating other brand awareness strategies that would eventually translate to an increase in sales.',
      'Providing updated feedback on how the marketing strategies have been executed backed up by the resulting product sales for analysis.',
    ],
  },
  {
    title: 'Attachment, Supply Chain Mgt. Department',
    company: 'Kenya National Treasury',
    period: 'September 2018 - November 2018.',
    responsibilities: [
      'Keeping records of inventory in the National Treasury stores.',
      'Retrieval and issuance of stored items from the stores to the authorized personnel.',
      'Clearance and collecting of returned items to the stores by the authorized staff.',
      'Arranging the items in the stores in an orderly manner for easy retrieval and issuance of the items.',
      'Participating in shortlisting trustworthy suppliers who can be able to supply the government with the required products.',
      'Participating in approval of applied tenders by trusted suppliers of various items required by the government.',
      'Receiving and directing walk-in supplier applicants who are willing to supply certain products to the government.',
      'Receiving and counter-checking products and items supplied to the government by the shortlisted suppliers.',
    ],
  },
]

const skills = [
  { name: 'Frontend Development', percentage: 85 },
  { name: 'Backend Development', percentage: 80 },
  { name: 'Mobile App Development', percentage: 75 },
  { name: 'API Development', percentage: 75 },
]

const skillsList = 'Python | JavaScript | React JS | React Native | Next JS | Ruby | API Development | MySQL | PostgreSQL | MongoDB | Git (Version Control) | Jest.'

export default function Resume({ isActive }: ResumeProps) {
  const [typedText, setTypedText] = useState('')
  const [shouldType, setShouldType] = useState(false)
  const skillsShowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldType(true)
          observer.disconnect()
        }
      },
      { threshold: 0.7 }
    )

    if (skillsShowRef.current) {
      observer.observe(skillsShowRef.current)
    }

    return () => observer.disconnect()
  }, [isActive])

  useEffect(() => {
    if (!shouldType) return

    let i = 0
    const timer = setInterval(() => {
      if (i < skillsList.length) {
        setTypedText(skillsList.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [shouldType])

  return (
    <article className={`resume ${isActive ? 'active' : ''}`} data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Education */}
      <section className="hidden show timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {education.map((edu, index) => (
            <li key={index} className="hidden show timeline-item">
              <h4 className="h4 hidden show timeline-item-title">{edu.institution}</h4>
              <span>{edu.field}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="hidden show timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experience.map((exp, index) => (
            <li key={index} className="hidden show timeline-item">
              <h4 className="h4 hidden show timeline-item-title">{exp.title}</h4>
              <span><strong>{exp.company}</strong></span>
              {exp.period.split('\n').map((p, i) => (
                <span key={i}>{p}</span>
              ))}
              <p className="timeline-text">
                <br />
                Key Responsibilities:
                <br />
              </p>
              <ul>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="list-style">{resp}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Download CV */}
      <div className="download-div">
        <a href="/docs/Winter Jackson CV.pdf" download="Winter Jackson CV" className="download-btn">
          Download CV
        </a>
      </div>

      {/* Skills */}
      <section className="hidden show skill">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3 skills-title">Skills</h3>
        </div>
        <div className="skills-wrap">
          <ul className="skills-list content-card">
            {skills.map((skill, index) => (
              <li key={index} className="skills-item">
                <div className="title-wrapper">
                  <h5 className="h5">{skill.name}</h5>
                  <data value={skill.percentage}>{skill.percentage}%</data>
                </div>
                <div className="skill-progress-bg">
                  <div className="skill-progress-fill" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </li>
            ))}
          </ul>

          <div className="skills-show content-card" ref={skillsShowRef}>
            <p className="show-list" style={{ display: shouldType ? 'inline-block' : 'none' }}>
              : {typedText}
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
