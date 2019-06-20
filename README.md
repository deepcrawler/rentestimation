## Rent Estimation

### Prerequisites

* Node.js version 8 or later
* TypeScript, which you can install globally, via command `npm install typescript -g`

### Installation

* Set up an empty postgre database.
* Set up connection settings in src/connection.ts file
* Set up import config settings in src/importconfig.ts file
* Install Node.js dependencies, by running `npm install` from the project's root folder.
* Install TypeScript dependencies, by running `typings install` from the project's root folder.

### Starting

* Navigating to the projects's root folder:

* Compile, Build and run application with:
```
$ npm start
```

For getting the rent estimation on API, please use the following:
```
$ curl http://localhost:3000/rents/estimate/{ZipCode}/{ApartmentSize}
```

* Compile, Build and run test by Mocha with:
```
$ npm run test
```