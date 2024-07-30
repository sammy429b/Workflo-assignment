# Use the official Node.js image as the base image with the Alpine version
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm for package.json
RUN npm install

# Copy the rest of the application code to the working directory 
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Build the application
RUN npm run build

# Expose the port for the application
EXPOSE 3030

# Run the application
CMD ["node", "dist/index.js"]
