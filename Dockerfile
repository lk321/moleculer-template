FROM node:latest

ARG IMAGE_VERSION
ENV VERSION=$IMAGE_VERSION
ENV NODE_ENV production
ENV PORT 3003

WORKDIR /usr/src/app

COPY . .

RUN yarn install --production

RUN yarn build

EXPOSE ${PORT}

CMD yarn start
