
FROM node:16.17.0-alpine AS base


# ------------------ ENVIRONMENT VARIABLES ------------------

ENV PORT=80


ENV NPM_CONFIG_LOGLEVEL=warn

ENV NPM_CONFIG_COLOR=false

#------------------------------------------------------------


WORKDIR /app


COPY package*.json ./


RUN npm i


FROM node:16.17.0-alpine AS build


WORKDIR /app


COPY .env ./
COPY --from=base /app/package*.json ./ 
COPY --from=base /app/node_modules ./node_modules
ENV OAUTH_SIGN_IN_REDIRECT_URL=http://localhost
ENV OAUTH_SIGN_OUT_REDIRECT_URL=http://localhost

COPY src ./src
RUN npm install parcel@2.10.2 && npm install parcel-bundler@1.12.5

RUN npm run build


FROM nginx:stable-alpine AS deploy



COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.parcel-cache /usr/share/nginx/html



EXPOSE 80

