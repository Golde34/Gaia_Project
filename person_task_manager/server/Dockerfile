# Base image with Node.js
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file into the container
COPY ./src/.env ./src/.env

# Expose the port your service listens on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]