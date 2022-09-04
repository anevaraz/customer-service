# Customer Service API NestJS

Customer service project, testable and high performance Node.js API.
 
## Stack

- [NestJS](https://github.com/nestjs/nest): a progressive Node.js + TypeScript framework based on dependency injection;

## Features
- REST layer;
- Husky Git hooks that automatically runs [ESLint](https://eslint.org) and [Prettier](https://prettier.io) before all commits;
- Husky Git hooks that automatically runs [Jest](https://jestjs.io/) before all pushs;
- `ConfigService`: easily manage environment variables;
- `ValidationPipe`: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect;
- `Swagger`: The [OpenAPI](https://swagger.io/specification/) specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated module which allows generating such a specification by leveraging decorators;


## Installation for local development
```bash
$ cp .env.example .env
$ yarn
```
### Running the app

```bash
# local development
$ yarn start

# local watch mode
$ yarn start:dev

# local production mode
$ yarn start:prod

# running db service on the background
$ docker-compose up -d

# stopping the running containers
$ docker-compose down
```

## Docs

Reference documentation to assist developers in integrating and consuming customer service.
available in the `/docs` path

## Endpoints

- GET /alive
- GET /docs
- POST /v1/user
- GET /v1/user
- GET /v1/user/:id
- PATCH /v1/user/:id
- DELETE /v1/user/:id
- POST v1/auth/login


## Test

```bash
# unit tests
$ yarn test

``` 
