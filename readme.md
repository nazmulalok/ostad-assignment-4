# Student Registration API Endpoints

## API Endpoints

### 1. Student Registration
- **Method:** `POST`
- **Endpoint:** `/api/students/register`
- **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response:** 
  - Status: `201 Created`
  - Body: Student information

### 2. Student Login
- **Method:** `POST`
- **Endpoint:** `/api/students/login`
- **Request Body:**
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response:**
  - Status: `200 OK`
  - Body: Student information and a token cookie

### 3. Get Student Profile
- **Method:** `GET`
- **Endpoint:** `/api/students/profile`
- **Headers:**
    ```
    Cookie: token=<your_token>
    ```
- **Response:**
  - Status: `200 OK`
  - Body: Student profile information

### 4. Update Student Profile
- **Method:** `PUT`
- **Endpoint:** `/api/students/profile`
- **Headers:**
    ```
    Cookie: token=<your_token>
    ```
- **Request Body:**
    ```json
    {
        "name": "John Smith",
        "email": "john.smith@example.com"
    }
    ```
- **Response:**
  - Status: `200 OK`
  - Body: Updated student information

### 5. File Upload
- **Method:** `POST`
- **Endpoint:** `/api/students/upload`
- **Headers:**
    ```
    Cookie: token=<your_token>
    ```
- **Form Data:**
    - Key: `file`, Type: File
- **Response:**
  - Status: `200 OK`
  - Body: Success message and file path

### 6. Read Uploaded File
- **Method:** `GET`
- **Endpoint:** `/api/students/read-file`
- **Headers:**
    ```
    Cookie: token=<your_token>
    ```
- **Response:**
  - Status: `200 OK`
  - Body: File sent as a download

### 7. Delete Uploaded File
- **Method:** `DELETE`
- **Endpoint:** `/api/students/delete-file`
- **Headers:**
    ```
    Cookie: token=<your_token>
    ```
- **Response:**
  - Status: `200 OK`
  - Body: Success message
