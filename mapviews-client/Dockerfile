# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
