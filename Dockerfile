FROM node:15-alpine

WORKDIR /app

RUN apk add --update --no-cache wget \
  && addgroup -S nodejs \
  && adduser -S app -G nodejs

COPY package*.json ./
RUN npm install

COPY ./proxy-reverse-challenge/ .

USER app

CMD ["npm", "start"]
