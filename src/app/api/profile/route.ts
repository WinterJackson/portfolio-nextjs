import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst()
        return NextResponse.json(profile)
    } catch (error) {
        console.error('Failed to fetch profile:', error)
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { id, name, title, email, phone, altPhone, location, bio, avatarUrl, github, linkedin, whatsapp, cvUrl } = body

        const profile = await prisma.profile.update({
            where: { id },
            data: { name, title, email, phone, altPhone, location, bio, avatarUrl, github, linkedin, whatsapp, cvUrl },
        })

        return NextResponse.json(profile)
    } catch (error) {
        console.error('Failed to update profile:', error)
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }
}
