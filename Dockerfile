FROM --platform=linux/amd64 node:alpine

# Set up the backend
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY back/package.json back/package-lock.json ./
RUN npm install

# Copy backend application files
COPY back/ ./

# Set up the frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY front/package.json front/package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli

# Copy frontend application files
COPY front/ ./

# Expose the necessary ports for both applications
EXPOSE 4000
EXPOSE 4200

# Start both applications
CMD ["sh", "-c", "cd /app/backend && npm start & cd /app/frontend && ng serve --host 0.0.0.0"]
