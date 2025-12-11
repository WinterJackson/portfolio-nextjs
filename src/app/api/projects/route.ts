import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(projects)
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, category, categories, description, imageUrl, webpUrl, demoUrl, githubUrl, isActive } = body

        const project = await prisma.project.create({
            data: {
                title,
                category,
                categories: categories || [category],
                description,
                imageUrl,
                webpUrl,
                demoUrl,
                githubUrl,
                isActive: isActive ?? true,
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error('Failed to create project:', error)
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}
