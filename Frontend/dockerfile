# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (typically 5173 or 3000 depending on framework)
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev"]
