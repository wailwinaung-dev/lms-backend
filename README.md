<h1 align="center"> LMS Backend</h1>

<div align="center">
    Backend service for the LMS (Learning Management System) project.
Built with NestJS 11, Apollo GraphQL, Prisma ORM, and Clerk for authentication.
    </div>

## 🛠️ Tech Stack

**NestJS**
— Progressive Node.js framework

**Apollo GraphQL**
— GraphQL server

**Prisma**
— Type-safe database ORM

**Clerk**
— Authentication & user management

**PostgreSQL**
— Database

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/wailwinaung-dev/loan-management-system-backend.git
cd lms-backend
npm install
```

## ⚙️ Environment Variables

Copy .env file

```bash
cp .env.example .env
```

Change environment variables

```env
# Database
CLERK_PUBLISHABLE_KEY=your_public_key
CLERK_SECRET_KEY=your_secret_key
CLERK_JWT_KEY="your_jwt_key"

DATABASE_URL="postgres://admin:password@localhost:5432/lms"
```

🚀 Running the App

Start the backend in different modes:

```bash
# Development
npm run start:dev
```

## 🔗 GraphQL Playground

Once the server is running, open:

```bash
http://localhost:3000/graphql
```

Here you can explore the schema and test queries/mutations.

## 🗄️ Database (Prisma)

Run migrations and generate the client:

```bash
# Run migrations
npx prisma migrate dev

# Push schema without migration
npx prisma db push

# Open Prisma Studio (DB GUI)
npx prisma studio
```
