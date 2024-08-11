# Use node 18 as base image
FROM node:18-alpine

# Set working dir inside container
WORKDIR /app

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the working directory
COPY . .

# Expose the port on 5000
EXPOSE 5000

# Start application in development mode
CMD ["npm", "run", "start:dev"]
