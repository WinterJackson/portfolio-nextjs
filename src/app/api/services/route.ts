import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(services)
    } catch (error) {
        console.error('Failed to fetch services:', error)
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, iconUrl, order } = body

        const service = await prisma.service.create({
            data: { title, description, iconUrl, order: order || 0 },
        })

        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error('Failed to create service:', error)
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
    }
}
