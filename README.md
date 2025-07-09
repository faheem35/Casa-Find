# Casa Find - Real Estate Platform

## Overview

Casa Find is a full-stack MERN application that allows users to buy, sell, and manage real estate properties. Users can add, edit, delete, and bookmark properties. Admins can manage all properties and users. The app features secure authentication and authorization.

## Features

- User registration and login with JWT authentication
- Add, edit, delete property listings by users
- Bookmark favorite properties
- Browse properties uploaded by all users
- Image upload functionality using Multer
- Admin dashboard accessible at `/adminlogin` for managing users and listings
- Responsive UI built with React and Tailwind CSS
- API requests handled via Axios

## Tech Stack

- Frontend: React, Tailwind CSS, Axios  
- Backend: Node.js, Express.js  
- Database: MongoDB with Mongoose  
- Authentication: JWT  
- Image Uploads: Multer  
- Deployment: Vercel (frontend), Render (backend)  

## Live Demo

https://casa-find.vercel.app

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB instance (local or cloud)  

### Installation

1. Clone frontend repo:
    ```bash
    git clone https://github.com/faheem35/Casa-Find.git
    cd Casa-Find
    npm install
    npm start
    ```

2. Clone backend repo:
    ```bash
    git clone https://github.com/faheem35/Casa-Find-Server.git
    cd Casa-Find-Server
    npm install
    npm start
    ```

### Environment Variables

Create a `.env` file in the backend root with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
