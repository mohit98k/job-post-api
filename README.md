# JobPost API

A production-ready REST API for a job posting platform built with Node.js, Express, PostgreSQL, Prisma, Redis, Bull MQ, Docker, and JWT authentication.

## Live Demo

Backend:
https://job-post-api-16tk.onrender.com


## Features

- User Authentication
- JWT Access & Refresh Tokens
- Role Based Authorization
- Resume Upload (s3)
- Job CRUD
- Pagination
- indexing 
- Search & Filtering
- Recomendation
- Rate Limiting
- Redis Caching
- BullMQ job queuing 






## Tech Stack

Backend
- Node.js
- Express.js

Database
- PostgreSQL
- Prisma ORM
- AWS S3

Authentication
- JWT
- HTTP Only Cookies

Caching
- Redis

Job Queue
- BullMQ

Deployment
- Docker
- Render
- AWS (EC2)

Others
- Multer
- Resend



## Project Structure

src
 ├── controllers
 ├── middlewares
 ├── routes
 ├── utils
 ├── config
 ├── app.js
 ├── prisma.js
 └── index.js



## API Endpoints

Authentication Endpoints:

    POST /register
    POST /login
    POST /logout
    POST /refresh-my-token


User Endpoints:

    GET /getUser/:id
    GET /getMe
    POST /addSkill
    POST /resume/upload



Company Endpoints :

    POST /create
    GET /getCompany/:id



Job Endpoints

    POST /createJob
    GET /getJob/:id
    GET /getJobs
    GET /getRecommendedJobs
    GET /:id/applications
    GET /getLatestJobs



Application Endpoints:

    POST /apply/:id
    GET /mine
    PATCH /updateStatus
    GET /:id/resume



Admin Routes :

    POST /createTag
    POST /createSkill
    PATCH /banUser
    PATCH /unbanUser



## What I Learned

Designing a scalable REST API.
Implementing JWT authentication with access and refresh tokens.
Using Prisma ORM with PostgreSQL.
Dockerizing a backend application.
Deploying containers on Render.
Integrating Redis for caching.
Managing environment variables securely.
Structuring an Express application for maintainability.