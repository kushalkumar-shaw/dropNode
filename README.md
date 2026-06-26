```md
# ☁️ DropNode

> A modern self-hosted media storage platform and Cloudinary alternative for developers.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![Express](https://img.shields.io/badge/Express.js-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

DropNode is a full-stack media management platform that lets you upload, store, organize, and serve images and videos through instant public URLs.

Designed for developers and teams who want complete control over their media infrastructure without relying on third-party CDN services.

---

## ✨ Features

### 🔐 Secure Authentication
- JWT-based user authentication
- Auto-generated API Keys for external applications
- Protected dashboard routes

### 📁 Media Management
- Drag & Drop uploads
- Image & Video support
- Public asset URLs
- Delete media instantly
- Copy URL with one click

### 🚀 Developer API
- REST API
- API Key authentication
- Ready-to-use cURL examples
- Fetch API examples
- Easy integration with websites and mobile apps

### 🎨 Modern Dashboard
- Responsive UI
- Dark Mode
- Glassmorphism design
- Animated gradients
- Beautiful media gallery

### ⚡ Performance
- Fast uploads
- Optimized asset serving
- Lightweight frontend
- Clean REST architecture

---

# 🖼️ Screenshots

> Add screenshots here.

```

Dashboard
Upload Page
Media Gallery
API Documentation

```

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS v4
- React Router v6
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT
- bcryptjs

---

# 📂 Project Structure

```

DropNode/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

````

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- MongoDB (Local or Atlas)

---

## Clone Repository

```bash
git clone https://github.com/kushalkumar-shaw/dropnode.git

cd dropnode
````

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/dropnode

JWT_SECRET=your_secret_key

BASE_URL=http://localhost:5000
```

Start the backend.

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📡 API Example

Upload a file using cURL.

```bash
curl --location 'http://localhost:5000/api/upload' \
--header 'x-api-key: YOUR_API_KEY' \
--form 'file=@"/path/image.png"'
```

Response

```json
{
  "success": true,
  "url": "http://localhost:5000/uploads/image.png"
}
```

---

# 🔒 Authentication

### Dashboard

Uses JWT Authentication.

### External Applications

Use the generated API Key.

```
x-api-key: YOUR_API_KEY
```

---

# 🎯 Roadmap

* [ ] Folder management
* [ ] Bulk uploads
* [ ] Image optimization
* [ ] Automatic thumbnails
* [ ] CDN integration
* [ ] Rate limiting
* [ ] File compression
* [ ] User roles
* [ ] Admin dashboard
* [ ] S3/Cloud Storage support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

Licensed under the **MIT License**.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

```
```
