# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/main

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (source code, config, etc.)
COPY . .

# Build the project (TypeScript → JavaScript)
RUN npm run build

# Expose the port your app runs on (change if not 3000)
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
