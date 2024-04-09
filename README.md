# <p align="center">Files Manager Project</p>

![files manager](https://github.com/MathieuMorel62/holbertonschool-files_manager/assets/113856302/8d8080f2-b435-472a-b7d8-b00cb101c9ce)

## 📝 Description

Files Manager is a platform for user authentication, management, downloading and viewing files. This project incorporates various technologies such as NodeJS, MongoDB, Redis, and manages features such as pagination and background processing.

## 📚 Resources

- [Node JS Getting Started ](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Process API Doc](https://node.readthedocs.io/en/latest/api/process/)
- [Express Getting Started](https://expressjs.com/en/starter/installing.html)
- [Mocha Documentation](https://mochajs.org)
- [Nodemon Documentation](https://github.com/remy/nodemon#nodemon)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)
- [Bull](https://github.com/OptimalBits/bull)
- [Redis](https://intranet.hbtn.io/rltoken/FdBM1wERwywvDKROw8bWgg)
- [Image Thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Mime-Types Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Redis](https://github.com/redis/node-redis)
- [Mailgun](https://www.mailgun.com)
- [Jest](https://jestjs.io)

## 🛠️ Technologies and Tools Used

- `Node.js`: to build the backend server.
- `Express`: framework to simplify the creation of the API.
- `MongoDB`: to store user and file data.
- `Redis`: for temporary data management and background processing.
- `Bull`: to manage job queues in the background.
- `Image-Thumbnail`: to generate thumbnails of images.
- `Mime-Types`: to get the MIME type of a file.
- `Jest`: for testing the application.

## 📋 Prérequis

- Node.js version 12.x.x
- MongoDB version 4.x
- Redis version 5.x

## 📊 Data Files

<details>
<summary>package.json</summary>
<br>

```json
{
  "name": "files_manager",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "lint": "./node_modules/.bin/eslint",
    "check-lint": "lint [0-9]*.js",
    "start-server": "nodemon --exec babel-node --presets @babel/preset-env ./server.js",
    "start-worker": "nodemon --exec babel-node --presets @babel/preset-env ./worker.js",
    "dev": "nodemon --exec babel-node --presets @babel/preset-env",
    "test": "jest"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "bull": "^3.16.0",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "image-thumbnail": "^1.0.10",
    "jsonwebtoken": "^9.0.2",
    "mime-types": "^2.1.27",
    "mongodb": "^3.5.9",
    "redis": "^2.8.0",
    "request-promise": "^4.2.6",
    "sha1": "^1.1.1",
    "uuid": "^8.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.0",
    "@babel/core": "^7.8.0",
    "@babel/node": "^7.8.0",
    "@babel/preset-env": "^7.8.2",
    "@babel/register": "^7.8.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "eslint": "^6.4.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jest": "^22.17.0",
    "jest": "^29.7.0",
    "mocha": "^6.2.2",
    "nock": "^13.5.4",
    "nodemon": "^2.0.2",
    "request": "^2.88.0",
    "sinon": "^7.5.0",
    "supertest": "^6.3.4"
  }
}
```

</details>
<details>
<summary>.eslintrc.js</summary>
<br>

```js
module.exports = {
    env: {
      browser: false,
      es6: true,
      jest: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/all',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['jest'],
    rules: {
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': [
        'error',
        'LabeledStatement',
        'WithStatement',
      ],
    },
    overrides:[
      {
        files: ['*.js'],
        excludedFiles: 'babel.config.js',
      }
    ]
};

```

</details>
<details>
<summary>babel.config.js</summary>
<br>

```js
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
};

```

</details>

## 🚀 Installation and Configuration

1. Clone the repository: 

```sh
git clone https://github.com/MathieuMorel62/holbertonschool-files_manager.git
```

2. Install the dependencies: 

```sh
npm install
```

3. Start the different servers: 

```sh
npm run start-server
npm run start-worker
mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongod.log
```

4. Run the tests: 

```sh
npm run test
```

## 💡 Use

- To connect, use `curl` with basic authentication to obtain a token.
- Use this token to access other features such as downloading files.

## ✨ Main Features

1. **User Authentication**: Secure user management.
2. **File Management**: Download, view, and manage files.
3. **Generation of Miniatures**: Automatic creation of thumbnails for images.

## 📝 List of Tasks

| Number | Task | Description |
| ------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 0 | [**Redis utils**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/utils/redis.js) | Redis client configuration. |
| 1 | [**MongoDB utils**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/utils/db.js) | Setting up the MongoDB client. |
| 2 | [**First API**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/server.js) | Creation of the Express API and initial endpoints. |
| 3 | [**Create a new user**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/UsersController.js) | Creating a new user in the database. |
| 4 | [**User authentication**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/AuthController.js) | User authentication with a token. |
| 5 | [**Upload a file**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/FilesController.js) | Setting up the functionality to download files. |
| 6 | [**Get and list file**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/FilesController.js) | Recovery and listing of files. |
| 7 | [**File publish/unpublish**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/FilesController.js) | Publishing and cancelling the publication of files. |
| 8 | [**File data**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/FilesController.js) | Return of file content. |
| 9 | [**Image Thumbnails**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/FilesController.js) | Generation of thumbnails for images. |
| 10 | [**Tests!**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/tests/) | Creation of tests for the different components and endpoints. |
| 11 | [**New user - welcome email**](https://github.com/MathieuMorel62/holbertonschool-files_manager/blob/main/controllers/UsersController.js) | Sending a welcome email for new users. |

## 📬 Contact
- Profil LinkedIn: [Mathieu Morel](https://www.linkedin.com/in/mathieu-morel62/)
- Profil LinkedIn: [Caroline Chochoy](https://www.linkedin.com/in/caroline-chochoy62/)
