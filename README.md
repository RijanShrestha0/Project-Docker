🐳 Project 3: Docker Compose – Node.js & Redis App

📌 Project Overview

This project demonstrates how to deploy a multi-container application using Docker Compose. It features a Node.js application that connects to a Redis database to track the number of page visits. The purpose is to learn container orchestration, networking, and service communication using Docker.

⸻

🎯 Objectives
	•	Manage multi-container applications using Docker Compose.
	•	Understand service communication between Node.js and Redis.
	•	Practice using Dockerfile, Compose, and version control.

⸻

🛠️ Technologies Used

Tool	Use
Node.js	Backend Web Server
Redis	In-memory database (counter)
Docker	Containerization
Docker Compose	Orchestration of multiple containers
Git & GitHub	Version control


⸻

📁 Project Structure

project-root/
│
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .gitignore (optional)
├── .dockerignore (optional)
└── README.md


⸻

🚀 Setup Instructions

1️⃣ Clone Repository

git clone https://github.com/your-username/your-repo.git
cd your-repo

2️⃣ Build & Run with Docker Compose

docker-compose up --build

3️⃣ Access Application

Open in browser:

http://localhost:3000

You will see:

Page visited X times


⸻

📜 Key Files & Code

app.js

const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient({ url: 'redis://redis:6379' });
client.connect();
app.get('/', async (req, res) => {
  let count = await client.get('visits') || 0;
  count++;
  await client.set('visits', count);
  res.send(`Page visited ${count} times`);
});
app.listen(3000, () => console.log('App running on port 3000'));

Dockerfile

FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]

docker-compose.yml

version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis
  redis:
    image: redis:6


⸻

🧪 Testing
	•	Refresh the browser to increase the counter.
	•	Stop containers with:

docker-compose down


⸻

👥 Team Roles

Member	Role	Tasks
Aashutosh Nehuray	DevOps / Docker Engineer	Create Docker environment, configure Docker Compose, ensure both Node.js & Redis communicate properly
Sujal Shrestha	Documentation & QA	Document the process, verify setup, ensure correct functionality
Bibechan Khanal	Presentation Lead	Create and design the final project presentation
Rijan Shrestha	Technical Developer & Presenter	Work on core technical setup, assist in Docker implementation & presentation

🔄 CI/CD Implementation

To automate builds and ensure continuous integration, we implemented a simple CI/CD pipeline using GitHub Actions.

🚀 CI/CD Workflow Overview
	•	Build Stage: Automatically builds Docker images on each push to main.
	•	Test Stage: Runs container to check if services start correctly.
	•	Deploy Stage (Optional): Can be extended to deploy to Docker Hub or servers.
(Optional Enhancement)
To enhance deployment and automation, CI/CD can be integrated using GitHub Actions:

🗂️ CI/CD Workflow Steps
	1.	Build Stage – Automatically builds Docker images on each push.
	2.	Test Stage – Runs basic health checks or container tests.
	3.	Deploy Stage (Optional) – Deploy to Docker Hub or server.

🛠 Example .github/workflows/docker-ci.yml

name: Docker CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build Docker image
        run: docker build -t node-redis-app .

      - name: Docker Compose Test
        run: docker-compose up -d --build