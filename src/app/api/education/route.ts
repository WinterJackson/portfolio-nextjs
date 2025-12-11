import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const educations = await prisma.education.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(educations)
    } catch (error) {
        console.error('Failed to fetch education:', error)
        return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { institution, degree, field, startDate, endDate, order } = body

        const education = await prisma.education.create({
            data: { institution, degree, field, startDate, endDate, order: order || 0 },
        })

        return NextResponse.json(education, { status: 201 })
    } catch (error) {
        console.error('Failed to create education:', error)
        return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
    }
}
