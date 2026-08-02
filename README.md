---

```markdown
# 🚀 Express.js + Prisma 6 Setup Guide

A complete step-by-step setup guide for building a REST API using **Express.js**, **PostgreSQL / MySQL**, and **Prisma 6 ORM**.

---

## 📂 Project Directory Structure

```text
my-app/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── lib/
│   │   └── prisma.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

```

---

## 🛠️ Step-by-Step Installation

### 1. Initialize Project

Create a project directory and initialize `package.json`:

```bash
mkdir my-app
cd my-app
npm init -y

```

### 2. Install Dependencies

Install required production and development dependencies:

```bash
# Production dependencies
npm install express dotenv cors @prisma/client@6

# Development dependencies
npm install -D nodemon prisma@6

```

---

## ⚙️ Prisma Configuration

### 1. Initialize Prisma

Initialize Prisma in your project:

```bash
npx prisma init

```

### 2. Configure Environment Variables (`.env`)

Update your `.env` file with your database connection URL:

```env
PORT=5000

# PostgreSQL Connection
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"

# MySQL Connection (Uncomment if using MySQL)
# DATABASE_URL="mysql://username:password@localhost:3306/mydatabase"

```

### 3. Define Schema (`prisma/schema.prisma`)

Update your `prisma/schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // Use "mysql" if using MySQL
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  contact   String
  createdAt DateTime @default(now())
}

```

### 4. Push Schema & Generate Client

Apply schema changes to your database and generate Prisma Client:

```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

```

---

## 💻 Code Setup (Example Implementation)

### 1. Prisma Client Instance (`src/lib/prisma.js`)

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

```

### 2. Express Server Setup (`src/index.js`)

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, contact } = req.body;
    const newPost = await prisma.post.create({
      data: { title, contact },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

```

---

## 📜 Update `package.json` Scripts

Add startup scripts to your `package.json`:

```json
"type": "module",
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "prisma:studio": "npx prisma studio"
}

```

---

## 🧪 Quick Commands Reference

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server with Nodemon |
| `npx prisma db push` | Syncs schema with database without creating migrations |
| `npx prisma studio` | Opens interactive database GUI in browser |
| `npx prisma generate` | Re-generates Prisma Client |

```

```