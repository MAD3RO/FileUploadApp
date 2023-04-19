# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Add the source code to app directory
COPY ./ /app/

# Install all the dependencies
RUN npm install

# Generate the build of application
RUN npm run build

# Stage 2: Setup NGINX

# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output file to replace the default nginx contents
COPY --from=build /app/dist/file-upload-frontend /usr/share/nginx/html
# Expose port 80
EXPOSE 80