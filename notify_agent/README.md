# Notify Agent Service - Getting Started

## Overview

The Notify Agent Service is a Go-based microservice in the Gaia system, utilizing WebSocket technology for real-time notifications. It is responsible for delivering timely alerts and updates to users, ensuring seamless communication and efficient notification handling across the Gaia ecosystem.

---

## Requirements

- Go 1.18+
- Environment variables configured for WebSocket settings and backend service connections

---

## Available Commands

In the project directory, you can run:

### `go run cmd/main.go`

Runs the service in development mode.  
The service will start and listen on the configured WebSocket port for client connections.

---

## API Endpoints

### **WebSocket Endpoints**
- **`/ws/connect`**: Establishes a WebSocket connection for real-time notifications.

### **Notification Management**
- **POST** `/notifications/send`: Sends a notification to a specific user or group of users.
- **GET** `/notifications`: Retrieves a list of past notifications for a user.

---

## Development Workflow

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/Notify-Agent-Service.git
   cd Notify-Agent-Service
   ```

2. **Install Dependencies**:
   Ensure all required Go modules are downloaded:
   ```bash
   go mod tidy
   ```

3. **Run the Service**:
   Start the service in development mode:
   ```bash
   go run cmd/main.go
   ```

4. **Build the Binary**:
   Compile the service for production:
   ```bash
   go build -o notify-agent cmd/main.go
   ```

5. **Run in Production**:
   Execute the compiled binary:
   ```bash
   ./notify-agent
   ```

---

## Contributing

Contributions are welcome! Please create a pull request or raise an issue to suggest improvements.

---

The Notify Agent Service ensures real-time communication and efficient delivery of notifications within the Gaia system. Start enhancing your system’s communication capabilities today!
