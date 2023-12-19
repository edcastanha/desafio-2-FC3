FROM node:20-alpine

WORKDIR /app

RUN apk add --update --no-cache wget \
  && addgroup -S nodejs \
  && adduser -S app -G nodejs \
  && npm install -g npm@10.2.5

COPY ./package*.json ./
RUN npm install

COPY . .

USER app

CMD ["npm", "start"]
