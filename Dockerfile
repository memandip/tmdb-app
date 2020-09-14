FROM node:12-alpine as tmdb-app

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm build

FROM nginx:alpine

COPY --from=tmdb-app /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]