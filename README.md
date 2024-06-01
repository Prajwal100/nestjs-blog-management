# Blog Management Application

This is a comprehensive blog management application built using **NestJS**, **GraphQL**, **TypeORM**, and **PostgreSQL**. The application allows users to create, read, update, and delete blog posts and manage user authentication and authorization.

## Features

- **User Authentication and Authorization**: Secure login and registration with JWT-based authentication and role-based access control.
- **GraphQL API**: Robust API for querying and mutating data using GraphQL.
- **TypeORM Integration**: Seamless database operations with TypeORM.
- **PostgreSQL**: Reliable and powerful relational database management with PostgreSQL.
- **CRUD Operations**: Full CRUD functionality for managing blog posts.
- **Role Management**: Admin and user roles for differentiated access.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **GraphQL**: A query language for your API, providing a more efficient, powerful, and flexible alternative to REST.
- **TypeORM**: An ORM that can run in NodeJS, browsers, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms.
- **PostgreSQL**: An open-source relational database management system.

## Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **PostgreSQL**
- **NestJS CLI** (optional, for development)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Prajwal100/nestjs-blog-management.git
    cd nestjs-blog-management
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your configuration variables:

    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=your-db-user
    DATABASE_PASSWORD=your-db-password
    DATABASE_NAME=your-db-name
    JWT_SECRET=your-jwt-secret
    ```

4. **Start the application:**

    ```bash
    npm run start:dev
    ```

### Usage

- Access the GraphQL playground at `http://localhost:3000/graphql` to interact with the API.


