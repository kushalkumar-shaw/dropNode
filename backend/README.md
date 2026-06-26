# DropNode API Documentation

DropNode is a self-hosted alternative to Cloudinary for uploading, storing, and serving public URLs for media files.

## Base URL
By default, the server runs on `http://localhost:5000` (configurable via `BASE_URL` in `.env`).

---

## Authentication

The API supports dual authentication. For protected routes, you must provide either:
- **JWT Token**: `Authorization: Bearer <token>` (Recommended for client-side/browser apps)
- **API Key**: `x-api-key: <apiKey>` (Recommended for server-to-server requests)

### 1. Register a New User
Create a new account. An API key is automatically generated upon registration.

- **Endpoint**: `POST /api/auth/register`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "id": "64abcdef1234567890abcdef",
    "email": "user@example.com",
    "apiKey": "a1b2c3d4e5f6... (64 character hex string)"
  }
  ```

### 2. Login
Authenticate with email and password to receive a JWT.

- **Endpoint**: `POST /api/auth/login`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### 3. Get Current User (Me)
Retrieve the authenticated user's profile, including their API key.

- **Endpoint**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>` OR `x-api-key: <apiKey>`
- **Success Response (200 OK)**:
  ```json
  {
    "_id": "64abcdef1234567890abcdef",
    "email": "user@example.com",
    "apiKey": "a1b2c3d4e5f6...",
    "__v": 0
  }
  ```

---

## File Uploads & Assets

### 1. Upload a File
Upload a single image or video file.
- **Allowed formats**: `jpeg, png, gif, webp, mp4, mpeg`
- **Max file size**: `10 MB`

- **Endpoint**: `POST /api/upload`
- **Headers**: `Authorization: Bearer <token>` OR `x-api-key: <apiKey>`
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `file`: (The binary file to upload)

- **Success Response (201 Created)**:
  ```json
  {
    "message": "File uploaded successfully",
    "publicUrl": "http://localhost:5000/uploads/1691234567890-123456789.png",
    "asset": {
      "userId": "64abcdef1234567890abcdef",
      "filename": "1691234567890-123456789.png",
      "publicUrl": "http://localhost:5000/uploads/1691234567890-123456789.png",
      "mimeType": "image/png",
      "fileSize": 102400,
      "_id": "64abcd1234...",
      "createdAt": "2023-10-01T12:00:00.000Z",
      "__v": 0
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: "File size limit exceeded. Maximum size is 10MB."
  - `400 Bad Request`: "Invalid file type."

### 2. Get User Assets
Retrieve a list of all files uploaded by the authenticated user, sorted by newest first.

- **Endpoint**: `GET /api/assets`
- **Headers**: `Authorization: Bearer <token>` OR `x-api-key: <apiKey>`
- **Success Response (200 OK)**:
  ```json
  [
    {
      "_id": "64abcd1234...",
      "userId": "64abcdef1234567890abcdef",
      "filename": "1691234567890-123456789.png",
      "publicUrl": "http://localhost:5000/uploads/1691234567890-123456789.png",
      "mimeType": "image/png",
      "fileSize": 102400,
      "createdAt": "2023-10-01T12:00:00.000Z",
      "__v": 0
    }
  ]
  ```

---

## Static Files
Any uploaded file is accessible publicly via the URL provided in `publicUrl`.
- **URL Format**: `{BASE_URL}/uploads/{filename}`
- **Example**: `http://localhost:5000/uploads/1691234567890-123456789.png`
