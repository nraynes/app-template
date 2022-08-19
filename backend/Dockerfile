############### ▼ Build Stage ▼ ###############

FROM node:alpine AS builder

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache build-base tzdata \
    && cp /usr/share/zoneinfo/US/Central /etc/localtime \
    && echo "US/Central" > /etc/timezone \
    && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .

############### ▼ Run Stage ▼ ###############

FROM node:alpine

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache tzdata htop bash

USER node

COPY --from=builder /etc/localtime /etc/localtime
COPY --from=builder /etc/timezone /etc/timezone
COPY --from=builder $APP_HOME $APP_HOME
