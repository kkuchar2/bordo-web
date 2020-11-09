FROM node:12.2.0-alpine

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json
COPY ../package.json /app/package.json

# Install dependencies
RUN npm install

# Start app
CMD ["npm", "start"]
