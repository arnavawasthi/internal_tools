# internal_tools

## Sample

![Sample GIF](https://media.giphy.com/media/S6l588aDav7M3nkO0U/giphy.gif)

## Getting Started

### Configure db

Create database in Mysql/Mariadb for internal_tools:

```
create database internal_tool;
```

Using Mysql as the database for saving configuration. There are two files for configuring db:

- ormconfig.json
- db/schema.prisma
  TODO: Currently it asks you to provide same config thrice. Will improve in a later version.

### Create tables

Install typeorm cli

```
npm install -g typeorm
npm install -g ts-node
```

Run typeorm migrations using following command. It will get your db upto date.

```
ts-node ./node_modules/typeorm/cli.js migration:run
```

### Install blitz
```
npm install -g blitz
```

### Run your app in the development mode.

```
blitz start
```

### In production mode.

```
blitz start --production
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
