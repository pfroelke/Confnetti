FROM node:10-alpine as build-step
RUN mkdir -p /frontend
WORKDIR /frontend
COPY package.json /frontend/
RUN npm install
COPY . /frontend
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /frontend/dist/confnetti /usr/share/nginx/html