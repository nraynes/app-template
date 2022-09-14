############### ▼ Build Stage ▼ ###############

FROM node:lts AS builder

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

COPY package.json package-lock.json ./
COPY ./backend/package.json ./backend/package-lock.json backend/src/db/prisma ./backend/
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/
RUN npm run install:all

COPY --chown=node:node . .


############### ▼ Run Stage ▼ ###############

FROM node:lts

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

USER node

COPY --from=builder /etc/localtime /etc/localtime
COPY --from=builder /etc/timezone /etc/timezone
COPY --from=builder $APP_HOME $APP_HOME