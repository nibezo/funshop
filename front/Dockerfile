# Step 1: Use a Node image
FROM node:14 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application for production
RUN npm run build

# Step 7: Use an NGINX image to serve the built application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose port 80
EXPOSE 80

# Step 9: Start NGINX
CMD ["nginx", "-g", "daemon off;"]
