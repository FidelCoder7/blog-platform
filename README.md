# Blog Platform

![Python](https://img.shields.io/badge/Python-3.13-blue)

![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)

![React](https://img.shields.io/badge/React-Frontend-61DAFB)

![License](https://img.shields.io/badge/License-MIT-yellow)

![Tests](https://github.com/FidelCoder7/blog-platform/actions/workflows/backend-tests.yml/badge.svg)

A full-stack blogging platform built with FastAPI and React.
Users can register, authenticate using JWT tokens, create blog posts, comment on posts, and manage their own content through role-based ownership controls.


## Features

### Authentication

User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected routes

### Blog Posts

- Create posts
- View all posts
- View single post
- Delete own posts

### Comments

- Add comments
- View comments
- Delete own comments
- Display comment authors
- Display timestamps

### User Features

- User profile endpoint
- Author information on posts
- Author information on comments


## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* Passlib
* Pydantic
* Alembic
* SQLite
* JWT Authentication
* Pytest

### Frontend

* React
* Vite
* Axios
* React Router

### DEvOps

* Git
* GitHub
* GitHub Actions CI

## Project Structure

```text
blog-platform
|
|-backend/
|   |-app/
|   |-alembic/
|   |-tests/
|   |-requirements.txt
|   |-.env.example
|
|- frontend/
|   |- src/
|   |- public/
|   |- package.json
|
|- screenshots/
|
|- .github
|   ⨽ workflows
|
⨽README.md
```

## Architecture

```
React Frontend
        |
        ↓ Axios
Fast REST API
        |
        ↓
Aunthentication (JWT)
        |
        ↓
SQLAlchemy ORM
        |
        ↓
SQLite Database
```

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

### Posts

GET /posts

GET /posts/{id}

POST /posts

PUT /posts/{id}

DELETE /posts/{id}

### Comments

GET /comments/posts/{post_id}

POST /comments/posts/{post_id}

PUT /comments/{comment_id}

DELETE /comments/{comment_id}


## Installation

### Clone Repository

```bash
git clone https://github.com/FidelCoder7/blog-platform.git
```

### Backend

```bash
cd backend

python -m venv venv
```

Activate  virtual environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create environment file

```bash
cp .env.example .env
```

Run migrations

```bash
alembic upgrade head
```

Start backend

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```
### Tests

```bash
pytest -v
```

### Coverage

```bash
pytest --coverage=app
```

## GitHub Actions

This project includes an automated CI pipeline.

Every push automatically:

- Installs dependencies
- Runs all tests
- Reports test status


## Screenshots

### Home page

![Homepage](screenshots/homepage.png)

### Login page

![Login](screenshots/login.png)

### Register page

![Register](screenshots/register.png)

### Post Details page

![Post Details](screenshots/post-details.png)

### Create Post page

![Create post ](screenshots/create-post.png)

### Swagger Documentation

![Swagger Documentation](screenshots/swagger-api.png)
![Swagger Documentation](screenshots/swagger-api-2.png)


## Future Improvements
- Rich text editor
- Image uploads
- User avatars
- Likes and reactions
- Categories
- Search functionality
- Pagination
- Email verification
- Password reset
- User profile editing
- Docker support
- PostgreSQL deployment
- Cloud deployment
- Role-based authorization

## Testing

Current automated tests cover:

- User registration
- User login
- JWT authentication
- Post creation
- Post retrieval
- Comment creation
- Comment retrieval

## Learning Outcomes

This project demonstrates experience with:

- REST API development
- Authentication using JWT
- SQLAlchemy ORM
- Alembic database migrations
- React frontend development
- API integration using Axios
- Protected routes
- CRUD operations
- Automated testing with Pytest
- Continuous Integration using GitHub Actions

## License

MIT License
