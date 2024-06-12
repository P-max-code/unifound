FROM node:21-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf node_modules
EXPOSE 3000
CMD ["npx", "serve","-s","build"]
