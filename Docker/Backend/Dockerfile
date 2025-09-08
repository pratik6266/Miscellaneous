# Start from the official Golang image
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod ./
# If you have go.sum, uncomment the next line
# COPY go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the Go app
RUN go build -o backend main.go

# Use a minimal image for running
FROM alpine:latest
WORKDIR /app

# Copy the built binary from builder
COPY --from=builder /app/backend ./backend

EXPOSE 4001

CMD ["./backend"]
