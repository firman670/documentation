# Dockerfile

# Stage 1: Build the Docusaurus application
FROM oven/bun:latest as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application source code
COPY . .

# Build the Docusaurus application
RUN bun run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.21.6-alpine

# Copy the built application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
