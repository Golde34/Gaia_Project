# Middleware Loader Service - Getting Started

## Overview

The Middleware Loader Service is a Go-based microservice in the Gaia system. It acts as a bridge between the Client GUI and the backend microservices, ensuring smooth communication and efficient handling of user requests. This service is designed for high performance and scalability, serving as the public-facing gateway for the Gaia ecosystem.

---

## Requirements

- Go 1.22+
- Environment variables configured for backend service connections

---

## Available Commands

In the project directory, you can run:

### `go run cmd/main.go`

Runs the service in development mode.  
The service will start and listen on the configured port for incoming requests.

---

## Development Workflow

1. **Install Dependencies**:
   Ensure all dependencies are downloaded and up-to-date:
   ```bash
   go mod tidy
   ```

2. **Run the Service**:
   Start the service in development mode:
   ```bash
   go run cmd/main.go
   ```

3. **Build the Binary**:
   Compile the service for production:
   ```bash
   go build -o middleware-loader cmd/main.go
   ```

4. **Run in Production**:
   Execute the compiled binary:
   ```bash
   ./middleware-loader
   ```

---

## Contributing

Contributions are welcome! Please create a pull request or raise an issue to suggest improvements.

---

The Middleware Loader Service ensures seamless communication between the frontend and backend services of Gaia. Start using it to power your system today!

