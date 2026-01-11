# Job Scheduler & Automation Dashboard

A simplified automation engine to create, track, and execute background jobs with webhook integrations. Built with React (Vite) and Node.js (Express).

## Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MySQL (Sequelize ORM)
- Dotenv

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Database Setup
Create a MySQL database (e.g., `dotix_job_scheduler`).
Update `backend/.env` with your credentials:
```env
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=dotix_job_scheduler
DB_HOST=127.0.0.1
DB_DIALECT=mysql
PORT=4000
```

### 2. Backend Setup
```bash
cd backend
npm install
npx sequelize-cli db:create  # If not created manually
npx sequelize-cli db:migrate # Run migrations
npm start                    # Runs on http://localhost:4000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev                  # Runs on http://localhost:5173
```

## Architecture

- **Frontend**: A Single Page Application (SPA) built with React. It communicates with the backend via REST APIs.
  - `JobList`: Displays jobs with status indicators. Polling is used to update status in real-time.
  - `JobForm`: Validates JSON payload and creates jobs.
  - `JobDetail`: Shows full payload and job metadata.
- **Backend**: REST API using Express.
  - `Job` Model: Stores task data, priority, and status using Sequelize.
  - `run-job`: Simulates a long-running process using `setTimeout`, updates status asynchronously, and triggers a webhook.

## API Documentation

- `POST /jobs`: Create a new job. Body: `{ taskName, priority, payload }`.
- `GET /jobs`: List all jobs.
- `GET /jobs/:id`: Get job details.
- `POST /jobs/run-job/:id`: Trigger job execution.
- `POST /webhook-test`: Test endpoint for receiving webhooks.

## Webhook Integration
When a job completes, the system sends a POST request to the configured Webhook URL (or default test URL). The payload contains the job details and completion time.

## Database Schema (ER Diagram)

**Jobs Table**
- `id`: Integer (PK, Auto-increment)
- `taskName`: String
- `payload`: JSON
- `priority`: ENUM ('Low', 'Medium', 'High')
- `status`: ENUM ('pending', 'running', 'completed', 'failed')
- `createdAt`: Date
- `updatedAt`: Date

## AI Usage Disclosure
**Tools Used:** Google Gemini (via Agentic Interface)

**Usage:**
- **UI Design**: Generated Tailwind CSS components for Dashboard and Forms.
- **Backend Logic**: Implemented Express routes and Sequelize models.
- **Documentation**: Drafted this README.
- **Refactoring**: Converted initial Next.js plan to React+Vite upon request.
