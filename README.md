# Aplicacion de Gestion de Libros

Aplicacion CRUD full-stack para gestionar libros, construida con Angular (frontend), Node.js/Express (backend) y MongoDB Atlas (base de datos).

## Arquitectura

```
book-management-app/
├── backend/          # API con Express + TypeScript
├── frontend/         # SPA con Angular + TailwindCSS
└── docker-compose.yml
```

## Prerrequisitos

- Node.js 20+
- Cuenta de MongoDB Atlas (o MongoDB local)
- Docker y Docker Compose (opcional)

## Inicio Rapido

### Usando Docker Compose

1. Clona el repositorio.
2. Crea un archivo `.env` en la raiz del proyecto:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-management
   ```
3. Ejecuta:
   ```bash
   docker-compose up --build
   ```
4. Accede a la aplicacion en `http://localhost`.

### Desarrollo Local

#### Backend

```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env
# Editar .env con tu URI de MongoDB

npm run dev
```

La API estara disponible en `http://localhost:3000`.

#### Frontend

```bash
cd frontend
npm install
ng serve
```

La aplicacion estara disponible en `http://localhost:4200`.

## Endpoints de la API

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/books` | Lista todos los libros (con paginacion y filtros) |
| POST | `/api/books` | Crea un nuevo libro |
| GET | `/api/books/:id` | Obtiene un libro especifico |
| PUT | `/api/books/:id` | Actualiza un libro |
| DELETE | `/api/books/:id` | Elimina un libro |
| GET | `/api/books/search?q=query` | Busca libros |

### Parametros de Consulta para GET /api/books

- `page` - Numero de pagina (por defecto: 1)
- `limit` - Elementos por pagina (por defecto: 10, maximo: 100)
- `genre` - Filtro por genero
- `isAvailable` - Filtro por disponibilidad (true/false)
- `search` - Busqueda por titulo o autor

## Caracteristicas

### Backend
- API RESTful con Express.js
- TypeScript para seguridad de tipos
- MongoDB con Mongoose ODM
- Validacion de entrada con express-validator
- Middleware de manejo de errores
- Encabezados de seguridad con Helmet
- Registro de solicitudes con Morgan
- Logger con Winston

### Frontend
- Angular 17 con componentes standalone
- Formularios reactivos con validacion
- TailwindCSS para estilos
- Diseno responsivo
- Estados de carga y manejo de errores
- Notificaciones tipo toast
- Dialogos de confirmacion
- Paginacion
- Busqueda y filtros

## Estructura del Proyecto

### Backend
```
backend/src/
├── config/         # Base de datos, variables de entorno, logger
├── middlewares/    # Manejador de errores, validador
├── modules/
│   └── books/      # Modulo de libros (controller, service, model, routes, validation)
├── utils/          # Helpers de respuesta
└── app.ts          # Punto de entrada
```

### Frontend
```
frontend/src/app/
├── core/           # Servicios, modelos, interceptores
├── features/
│   └── books/      # Modulo funcional de libros
│       ├── components/
│       │   ├── book-list/
│       │   ├── book-form/
│       │   └── book-detail/
│       ├── books.module.ts
│       └── books-routing.module.ts
├── shared/         # Componentes reutilizables
└── app.module.ts
```

## Variables de Entorno

### Backend
- `PORT` - Puerto del servidor (por defecto: 3000)
- `NODE_ENV` - Entorno (development/production)
- `MONGODB_URI` - Cadena de conexion a MongoDB
- `CORS_ORIGIN` - Origen permitido para CORS
- `LOG_LEVEL` - Nivel de logging

## Tecnologias

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

## Desarrollo

### Ejecutar Tests

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

### Compilar para Produccion

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

## Licencia

Julio Molina Redondo  
Diego Tique Ramirez

MIT
