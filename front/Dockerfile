FROM node:18-alpine
WORKDIR /admin

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5173

RUN npm run build

FROM nginx:alpine
COPY --from=0 /admin/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
