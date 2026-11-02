# 🚀 Devspace IDE

### Your Cloud IDE. Your AI Coding Partner.

**Devspace IDE** is an AI-powered, cloud-based development environment built using the MERN stack and a microservices architecture.

Designed to make development smarter and more efficient, Devspace combines an intelligent AI chatbot, interactive code editor, real-time terminal, project management, and live application previews into one seamless workspace.

Powered by Google Gemini, the integrated AI assistant can understand project context, review code, build features, and perform file operations using natural language.

With a modern Motion-powered interface, responsive design, and integrated credit-based payments, Devspace brings the complete development experience directly to your browser.

---

## 📸 Screenshots

### Home Page
<img width="1892" height="900" alt="Screenshot 2026-10-31 012940" src="https://github.com/user-attachments/assets/f15df7f5-f6da-4c58-a899-fc0f25a90a5e" />

<img width="1872" height="887" alt="Screenshot 2026-11-02 195208" src="https://github.com/user-attachments/assets/049ec95c-27bf-4de9-afd5-edd4df114426" />


### Dashboard
<img width="1917" height="900" alt="Screenshot 2026-10-31 012902" src="https://github.com/user-attachments/assets/719c1f2f-9d31-4827-86e1-7b3951b0f3d3" />


### Project Workspace

<img width="1917" height="910" alt="Screenshot 2026-10-31 011258" src="https://github.com/user-attachments/assets/276b9542-9751-4ae3-a0ea-db6dc5ba5b82" />


> Add your screenshots to the `screenshots` folder. You can also include dark mode, light mode, and mobile screenshots.

---

## ✨ Features

### 🤖 AI-Powered Development

- Integrated AI chatbot powered by Google Gemini.
- Generate code using natural language instructions.
- Review existing code and suggest improvements.
- Build new features and components.
- Update existing files and resolve coding issues.
- Create and delete files and folders using AI.
- Project-aware AI assistance through file retrieval tools.

### ⚡ Intelligent AI Context Management

- Conversation history management.
- Summarization of older messages.
- Preservation of relevant conversation context.
- Reduced token consumption through context optimization.
- Efficient AI interactions for longer development sessions.

### 💻 Integrated Development Environment

- Interactive project workspace.
- File and folder management.
- Code editing and project organization.
- AI-powered real-time file creation and updates.
- Integrated terminal for executing commands.
- Live application previews directly from the IDE.

### 🔄 Real-Time Terminal

- Interactive terminal powered by `xterm.js`.
- Socket.IO for real-time bidirectional communication.
- Execute commands and manage project dependencies.
- Start development servers directly from the workspace.
- Run and preview applications within the development environment.

### 🎨 Modern User Experience

- Motion-powered animations and transitions.
- Smooth and interactive UI components.
- Responsive design for desktop and mobile.
- Dark and light theme support.
- Modern dashboard and project workspace.
- Interactive AI chat interface.
- Loading indicators and feedback for asynchronous operations.

### 🔐 Authentication & Payments

- Firebase Authentication.
- Redis-based session management.
- Credit-based AI usage system.
- Razorpay payment integration.
- Backend-controlled credit management and payment verification.

### ☁️ Cloud-Based Project Management

- Create and manage development projects.
- Store project files and application data in MongoDB.
- Access project workspaces through the browser.
- Microservices-based backend architecture.
- Centralized API Gateway for request routing.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Redux, Vite |
| UI & Animations | Motion for React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Google Gemini, LangChain, LangGraph |
| Architecture | Microservices, API Gateway |
| Authentication | Firebase Authentication, JWT |
| Session Management | Redis |
| Real-Time Communication | Socket.IO |
| Terminal | xterm.js, node-pty |
| Payments | Razorpay |
| Containerization | Docker, Docker Compose |

---

## 🏗️ Architecture

Devspace IDE follows a microservices-based architecture with a centralized API Gateway that routes requests to the appropriate backend services.

```text
                  ┌─────────────────────┐
                  │    React Frontend   │
                  │    Vite + Redux     │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │     API Gateway     │
                  └──────────┬──────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
  ┌─────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
  │Auth Service│      │Project Mgmt │      │ AI Service  │
  └─────┬──────┘      └──────┬──────┘      └──────┬──────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │   MongoDB + Redis   │
                  └─────────────────────┘

                  ┌─────────────────────┐
                  │ Terminal & Payment  │
                  │      Services       │
                  └─────────────────────┘
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose
- MongoDB
- Redis
- Firebase project
- Google Gemini API key
- Razorpay account for payment integration

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install Dependencies

Run the following command in the frontend and each backend service directory:

```bash
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files for the frontend and backend services.

Refer to the `.env.example` files for the required configuration.

```bash
cp .env.example .env
```

Configure the required database, Redis, Firebase, Gemini, Razorpay, and service URL credentials.

### 4. Start Docker Services

Navigate to the backend directory and run:

```bash
docker compose up
```

### 5. Start Backend Services

Open separate terminals for the API Gateway and each backend microservice.

Navigate to each service directory and run:

```bash
npm run dev
```

Start the Gateway, Authentication, Project Management, AI, Terminal, Payment, and other required services.

### 6. Start the Frontend

Navigate to the frontend directory:

```bash
npm run dev
```

Open the local URL provided by Vite to access Devspace IDE.

---

## 🔒 Security

- Environment variables for sensitive configuration.
- Backend-controlled authentication and authorization.
- Secure payment verification workflows.
- User-specific project access.
- Server-side AI credit management.
- Controlled AI file operations.

---

⭐ If you find Devspace IDE interesting, consider giving the repository a star!
