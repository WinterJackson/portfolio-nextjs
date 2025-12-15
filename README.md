# ⚡ Winter Jackson | Software Developer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)

A high-performance, modern, and fully dynamic portfolio website built with the latest web technologies. This project features a sleek, responsive public-facing interface for showcasing work and a powerful, secure **Admin Dashboard (CMS)** for complete content management without touching code.

---

## 📸 Project Validation & Screenshots

### 🖥️ Public Portfolio (Desktop & Tablet)
Experience a refined, creative design that highlights professional achievements.
![Desktop View](assets/screenshots/home-desktop.jpg)

### 📱 Mobile Responsive
Optimized for all devices, ensuring a seamless experience on the go.
![Mobile View](assets/screenshots/home-mobile.jpg)

### ⚙️ Admin Dashboard
A robust CMS to manage every aspect of the portfolio in real-time.
![Admin Dashboard](assets/screenshots/admin-dashboard.jpg)

---

## ✨ Key Features

### 🌐 Client-Facing Portfolio
- **Modern & Creative Design**: Minimalist aesthetic with rich animations and glassmorphism effects.
- **Dynamic Content**: All text, projects, and data are fetched from the database, allowing for instant updates.
- **Responsive Layout**: Flawless display across mobile, tablet, and desktop screens.
- **Interactive Sections**:
  - **Hero**: Engaging introduction with social links.
  - **About**: Professional bio and personal details.
  - **Services**: Highlights of technical expertise.
  - **Experience & Education**: Timeline-based career history.
  - **Projects**: Filterable showcase of work with Github/Live links.
  - **Skills**: Visual representation of technical proficiency.
  - **Testimonials**: Carousel of client feedback.
  - **Contact**: Functional contact form with message management.

### 🛡️ Admin Dashboard (CMS)
*Accessible via `/admin`*
- **Secure Authentication**: Protected routes using **NextAuth.js v5** (Credentials & Google OAuth).
- **Full CRUD Operations**:
  - **Profile Manager**: Update bio, contact info, and avatar instantly.
  - **Project Manager**: Add, edit, delete, and reorder projects.
  - **Service & Skill Manager**: Customize offerings and technical skills.
  - **Experience & Education**: Keep your resume up to date.
  - **Messages**: View and manage incoming inquiries from the contact form.

---

## 🛠️ Tech Stack using The Best Practices

This project leverages a cutting-edge stack for performance, scalability, and type safety.

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Server Actions) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [CSS Modules](https://github.com/css-modules/css-modules) / Modern CSS3 |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://authjs.dev/) (v5) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | React Hook Form + Zod Validation |
| **Image Uploads** | Cloudinary |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/WinterJackson/portfolio-nextjs.git
cd portfolio-nextjs
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:

```bash
# Database (PostgreSQL connection string)
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"

# Auth (NextAuth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OAuth (Google - Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Image Uploads (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

### 4️⃣ Database Setup
Run migrations to create the database schema:
```bash
npx prisma migrate dev --name init
```

Seed the database with initial data (configured in `prisma/seed.ts`):
```bash
npx prisma db seed
```
*Note: The seed script creates a default admin user (`admin@winterjackson.com` / `admin123`) and sample portfolio data.*

### 5️⃣ Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.  
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the dashboard.

---

## 🤝 Contribution

Contributions are welcome! If you find a bug or want to add a feature:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Winter Jackson</strong>
</p>
