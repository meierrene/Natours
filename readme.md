# Natours

Natours is a robust full-stack application designed to help users explore and book tours worldwide. Built using **Node.js**, **Express**, and **MongoDB**, it features a secure backend, dynamic Pug templates for server-side rendering, and advanced functionalities such as authentication, Stripe payment integration, and geo-spatial queries.

This project was developed as part of the [Node.js, Express, MongoDB & More: The Complete Bootcamp](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/) by **Jonas Schmedtmann**.

## Features

- **User Authentication**: Secure signup, login, password reset, and role-based access control using JWT.
- **Tour Management**: CRUD operations for tours, with image upload and resizing.
- **Booking System**: Integration with Stripe for payments and webhook handling.
- **Geo-Spatial Queries**: Find tours within a specific radius and calculate distances.
- **Responsive Emails**: Send transactional emails (welcome, password reset) using Pug templates and Nodemailer.
- **Dynamic Frontend**: Pug templates for rendering dynamic, user-friendly interfaces.
- **Robust Error Handling**: Centralized error management with production and development modes.
- **Security Enhancements**: Includes data sanitization, rate limiting, and HTTP headers.

---

## File Structure

### Root Directory

- **`app.js`**: Configures the Express app, middlewares, and routes&#8203;:contentReference[oaicite:0]{index=0}.
- **`server.js`**: Establishes MongoDB connection and starts the server&#8203;:contentReference[oaicite:1]{index=1}.
- **`config.env`**: Contains environment variables for database, JWT, email, and Stripe&#8203;:contentReference[oaicite:2]{index=2}.
- **`package.json`**: Manages dependencies, scripts, and configurations&#8203;:contentReference[oaicite:3]{index=3}.

### Key Directories

- **`controllers`**: Defines logic for handling application requests (e.g., authentication, tours, bookings).
- **`models`**: Contains Mongoose schemas for users, tours, bookings, and reviews.
- **`routes`**: Organizes API endpoints and middleware for different functionalities.
- **`utils`**: Includes helper classes like `APIFeatures` and `Email` for querying and email handling.
- **`views`**: Houses Pug templates for server-side rendering.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/natours.git
   cd natours
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a .env file:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=<Your MongoDB URI>
   DATABASE_PASSWORD=<Your Password>
   JWT_SECRET=<Your JWT Secret>
   STRIPE_SECRET_KEY=<Your Stripe Key>
   ```
