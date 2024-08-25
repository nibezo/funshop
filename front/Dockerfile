FROM node:18-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5173

RUN npm run build
RUN npm install react-router-dom

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
