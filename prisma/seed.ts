import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@winterjackson.com' },
        update: {},
        create: {
            email: 'admin@winterjackson.com',
            name: 'Winter Jackson',
            password: hashedPassword,
        },
    })

    console.log('✅ Admin user created:', adminUser.email)
    console.log('   Password: admin123')
    console.log('   ⚠️  Please change this password after first login!')

    // Create initial profile
    const profile = await prisma.profile.upsert({
        where: { id: 'default-profile' },
        update: {},
        create: {
            id: 'default-profile',
            name: 'Winter Jackson',
            title: 'Software Developer',
            email: 'winterjacksonwj@gmail.com',
            phone: '+254 795 213 399',
            location: 'Nairobi, Kenya',
            bio: 'An experienced software developer proficient in analyzing, modifying, and designing end-user applications tailored to specific needs. Skilled in Python, React JS, Next JS, and common libraries for development and testing.',
            github: 'https://github.com/WinterJackson',
            linkedin: 'https://linkedin.com/in/winterjackson',
        },
    })

    console.log('✅ Profile created:', profile.name)

    console.log('\n🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
