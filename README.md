![WATCHTOWER.png](apps/client/src/assets/WATCHTOWER.svg)

Watchtower is a self-hosted uptime monitoring tool.

## Features

- **Self-Hosted**: Fully manage and control your own monitoring instance.
- **JSON Schema Based**: Defines uptime checks using only JSON schemas and a small classes with no UI changes maximising extensibility.
- **Restful OpenAPI**: Provides a documented Restful OpenAPI, access the swagger-ui on `/api`
- **TypeORM**: Uses TypeORM to manage the database schema allowing [multiple datasource options](https://typeorm.io/data-source-options) (Currently only SQLITE is used).

## Roadmap

- **i18n**: Internationalisation support.
- **Certificate Monitoring**: Monitor certificate expiry dates.
- **Additional Datasource Options**: Add support for configuring datasources in typeorm.

## Usage

There are multiple deployment options but the simplest is to use the docker image

### Docker

Simply run the following command to start the watchtower container:

```shell
docker run -d --restart=always -p 127.0.0.1:3000:3000 -v watchtower:/var/lib --name watchtower jonathanturnock/watchtower:1.0.0
```

An example docker-compose file is provided in the `examples/dockercompose` director.

### Binaries

If you want to run the binary directly you can download the latest release from the [releases page](https://github.com/JonathanTurnock/watchtower/releases).

Ensure the binary is executable:

```shell
chmod +x /usr/local/bin/watchtower
```

And launch the binary:

```shell
./watchtower
```

### Compiling from Source

If you want to compile the binary from source checkout the repo and run the following commands:

> Note you will need NodeJS > v18 installed 

```shell
npm install
lerna run build
node apps/server
```

## Running Services in Production

For running services like this in production it is recommended to use a process manager like `pm2` or `systemd`.

### Systemd

An example systemd service file is provided in the `examples/systemd` directory to launch it as a service.

### PM2

To install and start the service with `pm2` run the following commands:
```shell
npm install -g pm2
pm2 start --name watchtower apps/server
pm2 list
```

To stop and delete the service run the following commands:
```shell
pm2 stop watchtower
pm2 delete watchtower
```

See `https://www.npmjs.com/package/pm2` for more information on `pm2`.
