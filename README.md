✍️ Scribbo - A Modern Blogging Platform
Scribbo is a full-stack web application designed for seamless content creation, editing, and publishing. Built with a focus on performance, simplicity, and a smooth user experience, Scribbo empowers users to write and manage blogs in a distraction-free environment.
🚀 Live Demo
👉 Scribbo Live🌐 Or clone and run locally (instructions below)

📌 Features

📝 Rich Text Editor for writing blogs with Markdown support and image uploads
🔐 JWT-based Authentication & Authorization for secure user access
📚 View all blogs or filter by categories for easy content discovery
🧑‍💻 User Dashboard to manage posts, view analytics, and track engagement
🗑️ CRUD operations (Create, Read, Update, Delete) for blog management
🌙 Dark Mode Support for comfortable viewing
📦 Fully responsive across devices for a consistent experience


🛠️ Tech Stack
Frontend:

Next.js (React framework)
Tailwind CSS
TypeScript
Context API (or Redux if used)

Backend:

Spring Boot (RESTful API)
Spring Security (JWT)
MongoDB Database

Other Tools:

Git & GitHub
Postman (for API testing)
Docker (contiainerized deployment in render)


📂 Project Structure
scribbo/
├── frontend/               # Next.js frontend
│   ├── pages/              # Page components
│   ├── components/         # Reusable UI components
│   ├── styles/             # Tailwind CSS and custom styles
├── backend/                # Spring Boot backend
│   ├── src/main/java/      # Java source files
│   ├── src/main/resources/ # Configuration and static files
├── screenshots/            # Screenshots for README
└── README.md               # Project documentation


🏃‍♂️ Installation and Running Instructions
Follow these steps to set up and run Scribbo locally. The frontend is deployed at https://scribbo.vercel.app, but you can run it locally if needed.
Prerequisites

Node.js: Version 18.x or higher
Java: JDK 17 or higher
Maven: For building the Spring Boot backend
MongoDB: Local instance or MongoDB Atlas account
Git: For cloning the repository
Postman (optional): For testing API endpoints
Docker (optional): For containerized deployment

Step 1: Clone the Repository
git clone https://github.com/your-username/scribbo.git
cd scribbo

Step 2: Set Up the Backend (Spring Boot)

Navigate to the backend directory:cd backend


Create a .env file in the backend directory with the following environment variables:PORT=8080
MONGODB_URI=mongodb://localhost:27017/scribbo
JWT_SECRET=your_jwt_secret_here
frontend.url=https://scribbo.vercel.app


Replace your_jwt_secret_here with a secure JWT secret (e.g., a 256-bit key).
If using MongoDB Atlas, replace MONGODB_URI with your Atlas connection string (e.g., mongodb+srv://username:password@cluster0.1vgfks8.mongodb.net/scribbo?retryWrites=true&w=majority&tlsAllowInvalidHostnames=true).


Build and run the backend:mvn clean install
mvn spring-boot:run

The backend will run on http://localhost:8080.

Step 3: Set Up the Frontend (Next.js, Optional)
If you want to run the frontend locally instead of using the deployed version:

Open a new terminal and navigate to the frontend directory:cd frontend


Install dependencies:npm install


Create a .env.local file in the frontend directory:NEXT_PUBLIC_API_URL=http://localhost:8080/api


Start the development server:npm run dev

The frontend will run on http://localhost:3000.

Step 4: Set Up MongoDB

If using a local MongoDB instance, ensure it’s running:mongod


If using MongoDB Atlas, ensure the MONGODB_URI in the backend .env file points to your Atlas connection string.

Step 5: (Optional) Run with Docker
If you prefer a containerized setup:

Ensure Docker and Docker Compose are installed.
Create a docker-compose.yml file (if not already present) and run:docker-compose up --build

This will start the backend, frontend (if included), and MongoDB (if configured).

Step 6: Test the Application

Access the frontend at https://scribbo.vercel.app (or http://localhost:3000 if running locally).
Use Postman to test API endpoints (e.g., http://localhost:8080/api/blogs).


📸 Screenshots
API Testing in Postman
Testing the blog creation endpoint (POST /api/blogs):

User Dashboard
The user dashboard for managing blogs:


🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.


📜 License
This project is licensed under the MIT License - see the LICENSE file for details.