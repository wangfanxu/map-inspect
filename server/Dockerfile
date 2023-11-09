# Use the official Node.js image with TypeScript support
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

WORKDIR /usr/src/server/src

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npx", "ts-node","app.ts"]
