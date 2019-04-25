# https://www.whitehorses.nl/blog/running-angular-application-docker-dummies
FROM node:8-alpine AS builder
COPY ragavera-web-ui /angular-src
WORKDIR /angular-src
RUN npm i
RUN $(npm bin)/ng build --prod

FROM node:6-alpine
COPY --from=builder /angular-src/dist/ragavera-web-ui /app/views
COPY package.json /app
COPY server.js /app

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/app"
CMD [ "npm", "start" ]
