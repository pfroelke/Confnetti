FROM node:10-alpine as build-step
RUN mkdir -p /code
WORKDIR /code
COPY package*.json /code/
RUN npm install
COPY . /code
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /code/dist/confnetti /usr/share/nginx/html