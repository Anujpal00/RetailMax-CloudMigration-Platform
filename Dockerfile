# === Stage 1: Build Frontend ===
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY Frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY Frontend/ ./

# Copy shared assets (products.json and images)
COPY api/products.json ./public/api/products.json
COPY Frontend/public/images ./public/images

# Build frontend
RUN npm run build

# === Stage 2: Serve with Nginx ===
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
