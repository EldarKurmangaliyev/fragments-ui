
FROM node:16.17.0-alpine AS base


# ------------------ ENVIRONMENT VARIABLES ------------------

ENV PORT=80


ENV NPM_CONFIG_LOGLEVEL=warn

ENV NPM_CONFIG_COLOR=false

#------------------------------------------------------------


WORKDIR /app


COPY package*.json ./


RUN npm i


FROM node:14.19-alpine3.14@sha256:8c93166ecea91d8384d9f1768ceaca1cd8bc22c1eb13005cecfb491588bd8169 AS build


WORKDIR /app


COPY .env ./
COPY --from=base /app/package*.json ./ 
COPY --from=base /app/node_modules ./node_modules


COPY src ./src


RUN npm run build


FROM nginx:stable-alpine@sha256:58edf9ad7347729e4a780739ac0225daf025ca699053a598aa28c12152b39a51 AS deploy



COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.parcel-cache /usr/share/nginx/html


EXPOSE 80