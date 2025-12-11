import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(experiences)
    } catch (error) {
        console.error('Failed to fetch experiences:', error)
        return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { jobTitle, company, startDate, endDate, description, order } = body

        const experience = await prisma.experience.create({
            data: { jobTitle, company, startDate, endDate, description, order: order || 0 },
        })

        return NextResponse.json(experience, { status: 201 })
    } catch (error) {
        console.error('Failed to create experience:', error)
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
    }
}
