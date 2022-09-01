# Customer Service API NestJS

Customer service project, testable and high performance Node.js API.
 
## Stack

- [NestJS](https://github.com/nestjs/nest): a progressive Node.js + TypeScript framework based on dependency injection;

## Features
- REST layer;
- Husky Git hooks that automatically runs [ESLint](https://eslint.org) and [Prettier](https://prettier.io) before all commits;
- `ConfigService`: easily manage environment variables;
- `ValidationPipe`: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect;


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
```

## Endpoints

- POST /v1/user
- GET /v1/user
- GET /v1/user/:id
- PATCH /v1/user/:id
- DELETE /v1/user/:id


## Test

```bash
# unit tests
$ yarn test

``` 
