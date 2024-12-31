FROM golang:1.22-alpine

ENV GO111MODULE=on

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 4003

CMD ["go", "run", "cmd/main.go"]