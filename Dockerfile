# # Use lightweight Node image
# FROM node:18-alpine

# # Install bash
# RUN apk add --no-cache bash

# # Set working directory
# WORKDIR /app

# # Copy only package.json and package-lock.json from Frontend
# # COPY Frontend/package*.json ./
# COPY package*.json ./


# # Install frontend dependencies
# RUN npm install

# # Copy rest of the frontend code
# COPY Frontend/ ./
# # Copy the API JSON file
# COPY api/products.json ./api/products.json

# # Add node_modules/.bin to PATH (for vite)
# ENV PATH="./node_modules/.bin:$PATH"

# # Expose Vite port
# EXPOSE 5173

# # Run Vite dev server
# CMD ["npm", "run", "dev"]







# FROM node:18-alpine

# # Optional: install bash if needed
# RUN apk add --no-cache bash

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install only production dependencies
# RUN npm install --production

# # Copy all other source files
# COPY . .

# # Expose the backend port
# EXPOSE 3000

# # Start the app
# CMD ["npm", "start"]





# === Step 1: Build frontend ===
FROM node:18-alpine AS frontend

WORKDIR /app/frontend

COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build


# === Step 2: Build backend ===
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install --production

# Copy backend source
COPY . .

# Copy built frontend into backend (assumes backend serves static files from /app/frontend/dist)
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000
CMD ["npm", "start"]

