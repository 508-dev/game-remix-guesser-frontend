# Game Remix Guesser Frontend

This is a Vue SPA managed with `vue-cli-service`.

It's the client for a web server/client application. The server can be found at https://github.com/508-dev/game-remix-guesser-backend.


## Project setup
Copy the example env to `.env`

```bash
cp .example.env .env
```

This will make environment variables such as the API url visible to `vue-cli-service`. Note that the outdated version we're using can only see environment variables that start with `VUE_APP_`.

Then, install the npm packages:

```bash
npm install
```

### Run the project locally using a development server

Have the SPA run on your machine locally. Run like this, the server will update on any local file change.

```
npm run serve
```

### Compile and minify for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Run end-to-end tests
```
npm run test:e2e
```

### Lint and fix files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
