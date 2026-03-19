# Book Management Application

A full-stack CRUD application for managing books, built with Angular (frontend), Node.js/Express (backend), and MongoDB Atlas (database).

## Architecture

```
book-management-app/
├── backend/          # Express + TypeScript API
├── frontend/         # Angular + TailwindCSS SPA
└── docker-compose.yml
```

## Prerequisites

- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- Docker & Docker Compose (optional)

## Quick Start

### Using Docker Compose

1. Clone the repository
2. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-management
   ```
3. Run:
   ```bash
   docker-compose up --build
   ```
4. Access the application at `http://localhost`

### Local Development

#### Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI

npm run dev
```

The API will be available at `http://localhost:3000`

#### Frontend

```bash
cd frontend
npm install
ng serve
```

The application will be available at `http://localhost:4200`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | List all books (with pagination, filters) |
| POST | `/api/books` | Create a new book |
| GET | `/api/books/:id` | Get a specific book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/books/search?q=query` | Search books |

### Query Parameters for GET /api/books

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `genre` - Filter by genre
- `isAvailable` - Filter by availability (true/false)
- `search` - Search by title or author

## Features

### Backend
- RESTful API with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- Input validation with express-validator
- Error handling middleware
- Security headers with Helmet
- Request logging with Morgan
- Winston logger

### Frontend
- Angular 17 with standalone components
- Reactive forms with validation
- TailwindCSS for styling
- Responsive design
- Loading states and error handling
- Toast notifications
- Confirmation dialogs
- Pagination
- Search and filters

## Project Structure

### Backend
```
backend/src/
├── config/         # Database, env, logger
├── middlewares/    # Error handler, validator
├── modules/
│   └── books/      # Book module (controller, service, model, routes, validation)
├── utils/          # Response helpers
└── app.ts          # Entry point
```

### Frontend
```
frontend/src/app/
├── core/           # Services, models, interceptors
├── features/
│   └── books/      # Book feature module
│       ├── components/
│       │   ├── book-list/
│       │   ├── book-form/
│       │   └── book-detail/
│       ├── books.module.ts
│       └── books-routing.module.ts
├── shared/         # Reusable components
└── app.module.ts
```

## Environment Variables

### Backend
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - Allowed CORS origin
- `LOG_LEVEL` - Logging level

## Technologies

### Backend
- Node.js 20
- Express.js 4
- TypeScript 5
- Mongoose 8
- MongoDB Atlas
- express-validator
- Helmet
- Morgan
- Winston

### Frontend
- Angular 17
- TypeScript 5
- TailwindCSS 3
- RxJS 7
- Angular Animations

## Development

### Running Tests

Backend:
```bash
cd backend
npm test
```

Frontend:
```bash
cd frontend
ng test
```

### Building for Production

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
ng build --configuration production
```

## License

Julio Molina Redondo
Diego Tique Ramirez

MIT
