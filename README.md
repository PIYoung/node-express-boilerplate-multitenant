# node-express-boilerplate-multitenant

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
  
## Description

TBD

## Requirement

- Docker

## Features

- Typescript / ES6
- Express + Postgres
- Docker
- Tests with Jest
- Git hooks with husky
- Authentication And Authorization with passport(jwt)
- Jenkins CI/CD

## Getting Started

```sh
# Running locally
docker compose -f ci/docker/composes/docker-compose.local.yml --env-file .env.local up -d
# Running test
docker compose -f ci/docker/composes/docker-compose.test.yml --env-file .env.test up -d
# dev logs
docker logs my-app-local-app --follow
# test logs
docker logs my-app-test-app --follow
```

## Project Structure

```javascript
my-app
└──.husky // git hooks
└──.vscode // IDE Config
└──ci // ci
|    └──docker
|    |    └──composes
|    |    └──dockerfiles
|    └──jenkins // TBD
└──data // Docker Database Volume
|    └──postgres
└──database
|    └──postgres.d
└──logs // logs
|    └──error // error logging
|    └──info // info logging
|    └──warn // warn logging
└──node_modules
|    └──...
└──resources // store static resources
|    └──temp
|    └──uploads
└──src // source code
|    └──configs // all the configs needed for the application
|    └──constants // all the constants needed for the application
|    └──controllers // all the controllers needed for the application
|    └──dtos // all the validator for the application
|    └──middlewares // any middleware needed for the application
|    └──models // data models required for the application
|    |    └──hooks // sequelize hooks
|    |    └──app // app schema
|    |    └──tenant // tenant schema
|    └──routes // single file for each logical set of routes
|    |    └──v1 // version 1
|    └──scheduler // all the schedulers
|    └──services // all the business logic
|    └──utils // all the utilities and helpers needed for the application
└──tests
|    └──e2e
|    └──unit
```

## License

MIT License

Copyright (c) 2023 [PIYoung](https://github.com/PIYoung)

[contributors-shield]: https://img.shields.io/github/contributors/PIYoung/node-express-boilerplate-multitenant.svg?style=for-the-badge
[contributors-url]: https://github.com/PIYoung/node-express-boilerplate-multitenant/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PIYoung/node-express-boilerplate-multitenant.svg?style=for-the-badge
[forks-url]: https://github.com/PIYoung/node-express-boilerplate-multitenant/network/members
[stars-shield]: https://img.shields.io/github/stars/PIYoung/node-express-boilerplate-multitenant.svg?style=for-the-badge
[stars-url]: https://github.com/PIYoung/node-express-boilerplate-multitenant/stargazers
[license-shield]: https://img.shields.io/github/license/PIYoung/node-express-boilerplate-multitenant.svg?style=for-the-badge
[license-url]: https://github.com/PIYoung/node-express-boilerplate-multitenant/blob/master/LICENSE.txt
