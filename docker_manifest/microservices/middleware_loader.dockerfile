FROM golang:1.18 as builder

WORKDIR /backend/middleware_loader

COPY . . 

RUN go mod download && \
    CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o middleware_loader \
    cmd/graphqlserver/main.go

FROM alpine:latest

COPY --from=builder /backend/middleware_loader/middleware_loader /middleware_loader

EXPOSE 4000

CMD ["/middleware_loader"]