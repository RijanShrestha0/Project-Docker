# Dockerfile
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies first (cache layer)
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy app code
COPY . .

# Expose port and define default command
EXPOSE 3000
CMD ["node", "app.js"]