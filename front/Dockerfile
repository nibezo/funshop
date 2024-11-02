# Stage 1: Build the frontend with Node.js
# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /admin

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the application for production
RUN npm run build

# Stage 2: Serve the frontend with NGINX
# Step 7: Use an NGINX image to serve the built application
FROM nginx:alpine

# Step 8: Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 9: Copy the built application from the first stage
COPY --from=build /admin/dist /usr/share/nginx/html

# Step 10: Expose port 80
EXPOSE 80

# Step 11: Start NGINX
CMD ["nginx", "-g", "daemon off;"]
