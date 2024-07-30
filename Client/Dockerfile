# Use the official Node.js image.
FROM node:18-alpine AS build

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package.json package-lock.json ./

# Clean NPM cache and install @swc/core first.
RUN npm cache clean --force && npm install @swc/core

# Install remaining dependencies.
RUN npm install

# Copy the rest of the application.
COPY . .

# Use a lighter image for production.
FROM node:18-alpine AS production

# Set the working directory.
WORKDIR /app

# Copy only necessary files from the build stage.
COPY --from=build /app /app


EXPOSE 8080

# Run the application.
CMD ["npm", "run", "dev"]
