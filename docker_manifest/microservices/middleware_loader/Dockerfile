# Stage 1: Build stage
FROM golang:1.22-alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /backend/

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o middleware_loader .

# Stage 2: Production stage
FROM alpine:latest

WORKDIR /backend/

COPY --from=builder /backend/middleware_loader .

EXPOSE 4000 

CMD ["./middleware_loader"]
