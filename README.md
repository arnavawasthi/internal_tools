# internal_tools

## Getting Started

### Configure db

Using Mysql as the database for saving configuration. There are two files for configuring db:

- ormconfig.json
- db/schema.prisma
  TODO: Currently it asks you to provide same config thrice. Will improvide in a later version.

### Create tables

Run typeorm migrations using following command. It will get your db upto date.

```
ts-node ./node_modules/typeorm/cli.js migration:run
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
