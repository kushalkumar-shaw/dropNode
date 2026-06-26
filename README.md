# DropNode ☁️

DropNode is a powerful, self-hosted alternative to enterprise media CDNs like Cloudinary. It provides a complete full-stack solution for uploading, storing, managing, and serving media assets (images and videos) with instant public URLs.

Built with performance, security, and developer experience in mind, DropNode offers both a beautiful Web Dashboard and a robust Developer API.

## Features ✨

*   **Dual Authentication:** Secure your account using JWTs for the web dashboard, and automatically generated API Keys for seamless server-to-server integrations.
*   **Drag & Drop Uploads:** Upload images and videos up to 10MB instantly.
*   **Media Gallery:** A beautiful, responsive grid to view all your uploaded assets, complete with video playback and image previews.
*   **Instant Public URLs:** 1-click copy for public URLs to hotlink your media instantly.
*   **Developer Friendly:** Built-in code snippets (cURL, Fetch) inside the dashboard to help you integrate DropNode into your external apps.
*   **Premium UI/UX:** A stunning dark-mode dashboard built with Tailwind CSS, featuring glassmorphism, dynamic gradients, and micro-animations.

## Tech Stack 🛠️

**Backend:**
*   Node.js & Express.js
*   MongoDB (Mongoose)
*   Multer (Multipart file uploads)
*   JWT & bcryptjs (Authentication)

**Frontend:**
*   React 18 & Vite
*   Tailwind CSS v4 (Styling & Theming)
*   React Router v6 (Routing)
*   Axios (API Client)
*   Lucide React (Iconography)

## Getting Started 🚀

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Running locally or via Atlas)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/dropnode.git
cd dropnode
\`\`\`

### 2. Setup the Backend
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/dropnode
JWT_SECRET=your_super_secret_jwt_key
BASE_URL=http://localhost:5000
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend folder:
\`\`\`bash
cd frontend
npm install
\`\`\`
Start the frontend development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at \`http://localhost:5173\` and the backend API is served at \`http://localhost:5000\`.

## License 📄
This project is open-source and available under the MIT License.
