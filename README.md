# ✍️ Scribbo - A Modern Blogging Platform

Scribbo is a full-stack web application designed for seamless content creation, editing, and publishing. Built with a focus on performance, simplicity, and user experience, Scribbo empowers users to write and manage blogs in a distraction-free environment. This project fulfills the requirements of the Full Stack Intern Assessment, featuring secure authentication, blog management, and cloud deployment.

## 🚀 Live Demo

👉 **Frontend**: Scribbo on Vercel  
👉 **Backend**: Scribbo API on Render _(replace with actual URL)_  
🌐 Or clone and run locally (instructions below)

---

## 📌 Features

- 📝 **Rich Text Editor**: Create and edit blogs with Markdown support.
- 🔐 **User Authentication**: Secure email/password login using JWT.
- 📚 **Public Blog Listing**: View all blogs with pagination, accessible to everyone.
- 📖 **Blog Details**: Publicly viewable blog content with full details.
- 🗑️ **CRUD Operations**: Create, read, update, and delete blogs (edit/delete restricted to blog authors).
- 📱 **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- 💾 **MongoDB Storage**: Blogs and user data stored in a NoSQL database.

---

## 🛠️ Tech Stack

### Frontend

- Next.js (React framework)
- Tailwind CSS
- TypeScript
- Redux

### Backend

- Spring Boot (RESTful API)
- Spring Security (JWT)
- MongoDB (NoSQL database)

### Other Tools

- Git & GitHub
- Postman (API testing)
- Docker (containerized deployment on Render)
- Vercel (frontend deployment)
- Render (backend deployment)

---

## 📂 Project Structure

```
scribbo/
├── frontend/                # Next.js frontend
│   ├── pages/              # Page components (e.g., login, blog listing)
│   ├── components/         # Reusable UI components
│   ├── styles/             # Tailwind CSS and custom styles
├── backend/                # Spring Boot backend
│   ├── src/main/java/      # Java source files
│   ├── src/main/resources/ # Configuration and static files
└── README.md               # Project documentation
```

---

## 🏃‍♂️ Installation and Running Instructions

Follow these steps to set up and run Scribbo locally. The frontend is deployed on Vercel, and the backend is deployed on Render, but you can run both locally for development.

### Prerequisites

- Node.js: Version 18.x or higher
- Java: JDK 17 or higher
- Maven: For building the Spring Boot backend
- MongoDB: Local instance or MongoDB Atlas account
- Git: For cloning the repository
- Postman: For testing API endpoints
- Docker: For containerized deployment (optional)

### Step 1: Clone the Repository

```bash
git clone https://github.com/karthik6603/scribbo.git
cd scribbo
```

### Step 2: Set Up the Backend (Spring Boot)

Navigate to the backend directory:

```bash
cd backend
```

Modify `application.properties` file in the backend directory with the following:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/scribbo
JWT_SECRET=your_jwt_secret_here
frontend.url=http://localhost:8080
```

Replace `your_jwt_secret_here` with a secure 512-bit JWT secret.
For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string or your local database url.

Build and run the backend:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will run on `http://localhost:8080`.

### Step 3: Set Up the Frontend

To run the frontend locally instead of using the Vercel deployment:

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`.

### Step 4: Set Up MongoDB

For a local MongoDB instance, ensure it’s running:

```bash
mongod
```

For MongoDB Atlas, verify that `MONGODB_URI` in the backend `application.properties` file points to your Atlas connection string.

### Step 5: Run with Docker (Optional)

To run the application using Docker (as deployed on Render):

Ensure Docker and Docker Compose are installed.

Run the following command in the root directory:

```bash
docker-compose up --build
```

This starts the backend, frontend (if included), and MongoDB (if configured).

### Step 6: Test the Application

- Access the frontend at https://scribbo.vercel.app or http://localhost:3000 (if running locally).
- Test API endpoints using Postman (e.g., http://localhost:8080/blogs for blog listing).

---

## 📬 Contact

- **GitHub**: [karthik6603](https://github.com/karthik6603)
- **LinkedIn**: _Your LinkedIn Profile_ _(replace with actual link)_
- **Email**: *your.email@example.com* _(replace with actual email)_
