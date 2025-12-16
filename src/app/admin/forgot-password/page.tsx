'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import styles from '../login/Login.module.css'

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send reset email')
      
      setIsSubmitted(true)
      toast.success('Reset link sent!')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.header}>
                <h1>Recovery</h1>
                <p>Enter your email to receive a password reset link.</p>
            </div>

            {isSubmitted ? (
                 <div className={styles.successContainer}>
                    <div className={styles.successIcon}>
                        <Mail size={32} />
                    </div>
                    <h3 className={styles.successTitle}>Check your email</h3>
                    <p className={styles.successText}>
                        If an account exists for that email, we have sent password reset instructions.
                    </p>
                    <Link href="/admin/login" className={styles.primaryBtn} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                 </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>
                            <Mail size={18} />
                            Email Address
                        </label>
                        <input 
                            {...register('email')}
                            type="email" 
                            required
                            placeholder="admin@example.com"
                        />
                         {errors.email && <div className={styles.error} style={{ marginTop: '10px' }}>{errors.email.message}</div>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`${styles.loginBtn} ${styles.primaryBtn}`}
                    >
                        {isSubmitting ? (
                            <>
                              <span className="spinner"></span>
                              Sending...
                            </>
                        ) : 'Send Reset Link'}
                    </button>

                    <div className={styles.footer}>
                         <Link href="/admin/login">
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  )
}
