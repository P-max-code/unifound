FROM node:21-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf node_modules
EXPOSE 3000
CMD ["npx", "serve","-s","build"]
