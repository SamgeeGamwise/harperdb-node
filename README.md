# HarperDB Functions

HDB Functions eases the use of HarperDB operations while from a Node.js environment. Simplistic in design, it can be quickly added to any application.

## Install

```
$ npm install hdb-functions
```

## Start using in your Node.js app

```js
// ESM
import { Harper } from 'hdb-functions';

// CommonJs
const { Harper } = require('hdb-functions');

const harper = new Harper({
    url: 'HARPERDB_URL',
    authorization: 'HARPERDB_AUTHORIZATION',
});

const schema = harper.schema('NAME_OF_SCHEMA');
const table = schema.table('NAME_OF_TABLE');

// ...
```

HarperDB URL and Authorization can be found within your HarperDB Studio configuration.

## Usage

```js
import { Harper } from 'hdb-functions';

const harper = new Harper({
    url: 'HARPERDB_URL',
    authorization: 'HARPERDB_AUTHORIZATION',
});

const personTable = harper.schema('test').table('person');
const person = { name: 'Bruce Wayne' };
const people = [ { name: 'Barry Allen' }, { name: 'Kent Clark' } ];

(async () => {
    await personTable.create();

    await personTable.insert(person);
    await personTable.insert(people);

    const peopleList = await personTable.getAll();

    await personTable.drop();
})();
```
