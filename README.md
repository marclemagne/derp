# The DERP Stack

## What is this?

This is just a super basic setup using Docker images for an Express server, Postgress database, and a React client
application (using create-react-app). When started a database table is created called "account" and there's some example
routes to add and fetch accounts from the React application.

## Installation

You will need Docker installed along with Express Generator and Create React App.

Clone this repository and then run the following:

```
./scripts/setup.sh
```

This will install dependencies for both the client and server.

Once dependencies are installed run:

```
docker-compose up -d
```

The server will be available at: http://localhost:3001

The client will be available at: http://localhost:3000

## What's next?

Right now if you make any changes to the server (Express) code, it will require a restart of everything (`docker-compose down`). I'd like to get this working with PM2.