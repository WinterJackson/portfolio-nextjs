import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Get Cloudinary config from env
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

        if (!cloudName || !uploadPreset) {
            console.error('Cloudinary config missing')
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Prepare upload to Cloudinary
        const uploadFormData = new FormData()
        uploadFormData.append('file', file)
        uploadFormData.append('upload_preset', uploadPreset)

        // Upload to Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
                method: 'POST',
                body: uploadFormData,
            }
        )

        if (!response.ok) {
            const error = await response.json()
            console.error('Cloudinary error:', error)
            throw new Error('Cloudinary upload failed')
        }

        const data = await response.json()

        // Return the secure URL from Cloudinary
        return NextResponse.json({
            url: data.secure_url,
            // Include other metadata if needed
            width: data.width,
            height: data.height,
            format: data.format,
            resource_type: data.resource_type
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
