FROM node:18

# Install dependencies for native modules
RUN apt-get update && apt-get install -y \
  python3 \
  g++ \
  make \
  cmake \
  libz-dev \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with native build disabled
ENV DISABLE_NATIVE=true
RUN npm install

# Copy rest of the files
COPY . .

# Start the bot
CMD ["node", "index.js"]
