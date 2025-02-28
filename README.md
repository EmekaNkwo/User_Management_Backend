# User Management System API

## Project Overview

This API provides a basic user management system with the following features:

- Create a new user
- Get all users
- Get a specific user by ID
- Update a user by ID
- Delete a user by ID

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- Class Validator
- Class Transformer

## Prerequisites

- npm or yarn
- PostgreSQL database

## Setup and Installation

1. Clone the repository

```bash
git clone https://github.com/your-repo/repolink.git
cd repolink
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run start:dev
```

4. Open a new terminal and run the following command to start the PostgreSQL server

```bash
sudo service postgresql start
```

5. Run the following command to create the database

```bash
createdb user_management_db
```

# API Endpoints

## Users Endpoint

- **Create a new user**: POST /users
- **Get all users**: GET /users
- **Get a specific user by ID**: GET /users/:id
- **Update a user by ID**: PATCH /users/:id
- **Delete a user by ID**: DELETE /users/:id
