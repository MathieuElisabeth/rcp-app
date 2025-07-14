# Recipe App - Modern Full-Stack Application

A modern recipe sharing application built with Next.js 14 (App Router), NestJS, PostgreSQL, and modern UI components.

## 🚀 Features

### Frontend
- **Next.js 14** with App Router
- **Radix UI** components for accessibility
- **Zustand** for state management
- **TanStack Query** for data fetching and caching
- **TypeScript** for type safety
- **React Hook Form** with Zod validation
- Fully accessible with ARIA support
- Responsive design
- Dark/Light theme support

### Backend
- **NestJS** framework
- **PostgreSQL** database with TypeORM
- **JWT** authentication with refresh tokens
- **Swagger** API documentation
- **Class-validator** for input validation
- **Bcrypt** for password hashing
- Rate limiting and security middleware
- File upload support

## 🛠 Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Zustand
- TanStack Query
- Radix UI
- React Hook Form
- Zod

### Backend
- NestJS
- PostgreSQL
- TypeORM
- JWT
- Bcrypt
- Class-validator
- Swagger

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd recipe-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup database**
```bash
# Using Docker
docker-compose up -d postgres

# Or install PostgreSQL locally and create database
createdb recipe_app
```

4. **Environment variables**

Create `.env` files:

**Server (.env)**:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=recipe_app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**Client (.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **Start development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:client  # Frontend on http://localhost:3000
npm run dev:server  # Backend on http://localhost:3001
```

## 🏗 Project Structure

```
recipe-app/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities
│   │   ├── store/         # Zustand stores
│   │   └── types/         # TypeScript types
│   └── package.json
├── server/                # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # Users module
│   │   ├── recipes/       # Recipes module
│   │   └── config/        # Configuration
│   └── package.json
├── docker-compose.yml     # Docker services
└── package.json          # Root package.json
```

## 🔐 Authentication

The application uses a modern JWT-based authentication system:

- **Access tokens**: Short-lived (15 minutes)
- **Refresh tokens**: Long-lived (7 days)
- **Automatic token refresh**: Handled by axios interceptors
- **Secure password hashing**: Using bcrypt
- **OAuth ready**: Architecture supports easy OAuth integration

## 📱 Key Features

### Recipe Management
- Create, edit, delete recipes
- Upload recipe images
- Categorize by type, difficulty, price
- Step-by-step instructions
- Ingredient lists with quantities

### User Features
- User registration and login
- Profile management
- Recipe favorites
- Personal recipe collections
- Comments on recipes

### Search & Discovery
- Search recipes by name
- Filter by type, difficulty, preparation time
- Popular and recent recipes
- User recipe collections

## 🎨 UI/UX

- **Accessible**: Full ARIA support, keyboard navigation
- **Responsive**: Mobile-first design
- **Modern**: Clean, minimal interface
- **Fast**: Optimized with React Query caching
- **Consistent**: Design system with Radix UI

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

### Database
- Use managed PostgreSQL (Railway, Supabase, etc.)
- Update environment variables accordingly

## 📚 API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:3001/api/docs`

## 🧪 Testing

```bash
# Frontend tests
cd client
npm run test

# Backend tests
cd server
npm run test
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.