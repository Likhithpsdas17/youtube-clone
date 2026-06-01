# YouTube Clone - MERN Stack Capstone Project

## Project Overview

YouTube Clone is a full-stack web application inspired by YouTube, built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

The application allows users to register, login, create channels, upload videos, watch videos, interact through comments, like/dislike videos, and search videos by category.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

### Channel Management

* Create Channel
* View My Channel
* Display Channel Banner
* View Uploaded Videos

### Video Management

* Upload Videos
* Watch Videos
* View Count Tracking
* Like Videos
* Dislike Videos

### Search & Filters

* Search Videos by Title
* Category-Based Filtering
* Dynamic Video Listing

### Comments

* Add Comments
* View Comments
* Persistent Comment Storage

### User Interface

* Responsive Layout
* Sidebar Navigation
* Toggle Sidebar
* Modern Video Cards
* Clean Channel Page

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

---

## Project Structure

youtube_clone/

├── client/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── server/

│ ├── src/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ └── package.json

│

└── README.md

---

## Installation

### Clone Repository

GitHub: https://github.com/Likhithpsdas17/youtube-clone.git

cd youtube_clone

---

### Backend Setup

cd server

npm install

npm start

Server runs on:

http://localhost:8080

---

### Frontend Setup

cd client

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

## Environment Variables

Create a .env file inside the server folder.

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=8080

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

---

### Channels

POST /api/channels

GET /api/channels/my-channel

GET /api/channels/:id

---

### Videos

POST /api/videos

GET /api/videos

GET /api/videos/:id

PUT /api/videos/:id/view

PUT /api/videos/:id/like

PUT /api/videos/:id/dislike

DELETE /api/videos/:id

---

### Comments

POST /api/comments

GET /api/comments/:videoId

DELETE /api/comments/:id

---

## Future Enhancements

* Cloudinary Video Upload
* User Subscriptions
* Playlist Feature
* Watch Later Feature
* Notifications
* Dark Mode

---

## Learning Outcomes

This project helped in understanding:

* MERN Stack Development
* REST API Development
* JWT Authentication
* MongoDB Relationships
* React Routing
* State Management
* Full Stack Deployment

---

## Author

Likhith P S Das

Full Stack Developer | MERN Stack Enthusiast
