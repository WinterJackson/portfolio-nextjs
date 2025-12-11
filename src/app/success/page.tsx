import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main>
      <div className="success-container">
        <div className="success-div success-page">
          <div className="success-msg">
            <p>Thank you for reaching out!</p>
          </div>
          <p>Your message has been sent successfully. I will get back to you as soon as possible.</p>
          <Link href="/" className="back-btn">
            Return to Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
