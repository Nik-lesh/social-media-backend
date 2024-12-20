# Social Media Backend Application

A comprehensive backend application for a social media platform built using **Node.js**. This application supports user authentication, profile management, posts, comments, likes, and more.

## Features

- **User Authentication**:

  - Register and login with JWT-based authentication.
  - Password hashing with bcrypt for enhanced security.

- **User Profiles**:

  - Create and update user profiles.
  - View other users' profiles.

- **Posts**:

  - Create, update, and delete posts.
  - Fetch posts from other users.

- **Interactions**:

  - Like and comment on posts.
  - Fetch comments and likes for a specific post.

- **Follow System**:

  - Follow and unfollow users.
  - View followers and following lists.

- **Scalability**:
  - Optimized database queries for high performance.
  - Designed for scalability with modular architecture.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens), bcrypt
  - Dotenv for environment variables.
  - Nodemon for development

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (v4.4+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jordern9/social-media-backend.git
   cd social-media-backend
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL= your email address
   PASSWORD = app password created in security section
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/users/signin`: Register a new user.
- `POST /api/users/login`: Login an existing user.

### User Profiles

- `GET /api/users/:username`: Get a user profile by username
- `PUT /api/users//updateUser/:id"`: Update user profile.

### Posts

- `POST /api/users/createPost`: Create a new post.
- `GET /api/users`: Fetch all posts.
- `GET /api/users/posts/:id`: Get a specific post.
- `PUT /api/users/posts/:id`: Update a post.
- `DELETE /api/users/posts/:id`: Delete a post.

### Interactions

- `POST /api/posts/:id/like`: Like a post.
- `POST /api/posts/:id/comment`: Add a comment to a post.
- `GET /api/posts/:id/comments`: Fetch comments for a post.

### Follow System

- `POST /api/users/follow/:id`: Follow a user.
- `GET /api/users/:id/followers`: Get followers of a user.
- `GET /api/users/:id/following`: Get the users followed by a user.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to open issues or suggest improvements! 😊
