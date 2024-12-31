FROM golang:1.22-alpine

ENV GO111MODULE=on

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .
COPY .env.docker .env

EXPOSE 4000

CMD ["go", "run", "cmd/main.go"]


