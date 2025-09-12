FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install 

# Expose Vite's default dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]