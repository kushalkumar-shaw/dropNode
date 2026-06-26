# DropNode Frontend 🎨

This directory contains the React-based Web Dashboard for DropNode. It serves as the primary interface for users to manage their media assets, upload new files, and generate Developer API keys.

## Features
*   **Stunning Landing Page:** Animated gradients, glassmorphism, and a modern SaaS aesthetic.
*   **Secure Authentication Flow:** Proper URL routing (`/login` and `/signup`) tightly integrated with JWT localStorage state.
*   **Protected Dashboard:** Nested routing utilizing `react-router-dom` (`/dashboard/gallery`, `/dashboard/upload`, `/dashboard/api-keys`).
*   **Drag & Drop Upload Zone:** Visual upload progress bars and file validation logic.
*   **Custom Toast System:** Built-in React context provider for non-intrusive, beautiful toast notifications.

## Technologies Used
*   **[React](https://reactjs.org/)** - UI Library
*   **[Vite](https://vitejs.dev/)** - Lightning fast build tool
*   **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework (v4)
*   **[React Router](https://reactrouter.com/)** - URL-based navigation
*   **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons
*   **[Axios](https://axios-http.com/)** - API requests with automatic interceptors

## Local Development

### 1. Install Dependencies
Make sure you are in the `frontend` directory, then run:
\`\`\`bash
npm install
\`\`\`

### 2. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will launch at \`http://localhost:5173\`.

### API Configuration
By default, the frontend is configured to communicate with the backend running on `http://localhost:5000/api`. This is managed inside `src/lib/api.js`. If your backend is hosted elsewhere, simply update the `baseURL` in that file.

## Build for Production
To generate a production-ready build:
\`\`\`bash
npm run build
\`\`\`
This will output optimized static files into the `dist` directory.
