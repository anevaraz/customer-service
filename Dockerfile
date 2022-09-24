FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

CMD ["npm", "run", "start:dev"]
