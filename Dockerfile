# Use lightweight Node image
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json from Frontend
COPY Frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy rest of the frontend code
COPY Frontend/ ./
# Copy the API JSON file
COPY api/products.json ./api/products.json

# Add node_modules/.bin to PATH (for vite)
ENV PATH="./node_modules/.bin:$PATH"

# Expose Vite port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev"]
