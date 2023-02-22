# syntax=docker/dockerfile:1

FROM node:16.10.0-alpine3.14 as base

LABEL version="1.0.0"
LABEL maintainer="PIYoung(https://github.com/PIYoung)"

FROM base as production
WORKDIR /.
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --omit=dev --production
COPY . .
CMD ["npm", "run", "start"]

FROM base as local
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as test
WORKDIR /usr/src/app
ENV NODE_ENV=test
COPY ["package.json", "package-lock.json", "./"]
RUN apk add git
RUN npm ci
COPY . .
CMD ["npm", "run", "test:watch"]