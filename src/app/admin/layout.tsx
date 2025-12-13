import AdminLayoutClient from '@/components/admin/AdminLayoutClient'
import { prisma } from '@/lib/prisma'
import React from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await prisma.profile.findFirst()
  const settings = await prisma.siteSettings.findFirst()

  return (
    <AdminLayoutClient profile={profile} settings={settings}>
      {children}
    </AdminLayoutClient>
  )
}
