# Use node 18 as base image
FROM node:18-alpine

# Set workding dir inside container
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the workding dir
COPY . .

# Expose the port on 3000
EXPOSE 3000

# Start application for development mode;
CMD ["npm", "start"]