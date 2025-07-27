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





# === Stage 1: Build Frontend ===
FROM node:18-alpine AS frontend

WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY Frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source and build
COPY Frontend/ ./
RUN npm run build


# === Stage 2: Build Backend ===
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package files and install dependencies
COPY api/package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY api/ ./

# Copy frontend build output into backend public directory
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000
CMD ["npm", "start"]



