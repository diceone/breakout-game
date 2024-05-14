# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the HTML and JavaScript files to the Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
