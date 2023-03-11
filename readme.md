# Setup Notes

## Versions

```
Node: v14.17.2
NPM: 6.14.13
YARN: 6.14.13
MYSQL: 8.0.27
```

## Server

### NOTE:

create `.env` file and add variable to it (see `.env.example`)

### In development

```
cd server
npm install
npm run dev
```

### In production

```
cd server
npm install
npm run build
npm start
```

## client

### In Development

```
yarn
yarn start
```

# Development Notes

### Install Git Hooks Before start coding in project

**Run the following file to install hooks (run first time only)**
```
githooks/install-hooks.sh
```
