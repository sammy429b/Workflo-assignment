# Trello-Style Task Management Application

## Project Description

This project is a web-based task management application similar to Trello, allowing users to organize tasks across different columns. It includes features such as user authentication, task creation, editing, deletion, and drag-and-drop functionality for task management.

### Features:

- **User Authentication**: Secure signup and login with email and password.
- **Task Board**: Personal task board with columns: "To-Do", "In Progress", "Under Review", and "Completed".
- **Task Management**: Create, edit, and delete tasks with various attributes including title, description, status, priority, and deadline.
- **Drag and Drop**: Move tasks between columns with automatic status updates.
- **Data Persistence**: User-specific data storage with MongoDB.

## Technologies Used

- **Frontend**: ReactJS with TypeScript
- **Backend**: Node.js & Express with TypeScript
- **Database**: MongoDB, Redis
- **State Management**: React Context API
- **Styling**: TailwindCSS, Shadcn

## How to Run the Project


1.  **Clone the Repository**

    ```bash
    git clone https://github.com/sammy429b/Workflo-assignment.git
    cd Workflo-assignment
    ```

### Manual start applicaton

2.  **Install Dependencies**

    Frontend

    ```bash
    cd client
    npm install
    ```

    Backend

    ```bash
    cd server
    npm install
    ```

3.  **Set Up Environment Variables**

    Create `.env` files in both the `client` and `server` directories with the necessary environment variables. Refer to `.env.example` files for required variables.

        
        SERVER_PORT = 3030
        MONGO_URI = "Your_MongoDB_url"
        SECRET_KEY = "your_secret_key"
        REDIS_HOST = "localhost"
        REDIS_PORT = 6379
        USER = "your_gmail_id",
        PASS = "app_password"
        

4. **Start the Application**

   Backend

   ```bash
   cd server
   npm run dev
   ```

   Frontend

   ```bash
   cd ../client
   npm start
   ```

### Automatic start with Docker

1. **Build and Start Containers**

   ```bash
   docker-compose up --build
   ```

   This command builds Docker images and starts containers for both the frontend and backend services.

2. **Access the Application**

   - The frontend will be available at http://localhost:8080.
   - The backend will be available at http://localhost:3030.

3. **Stop and Remove Containers**

   ```bash
   docker-compose down
   ```

   This command stops and removes the containers, networks, and volumes defined in the `docker-compose.yml` file.
