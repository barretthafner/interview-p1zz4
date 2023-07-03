FROM node:current as build

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci

FROM node:current-slim as run

COPY --from=build /usr/app /usr/app

WORKDIR /usr/app

COPY ./pizzapi pizzapi
COPY ./.sequelizerc .sequelizerc 

CMD ["npm", "start"]