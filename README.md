# HarperDB for Node

Ease the use of HarperDB operations in a Node.js environment. Simplistic in design, it can be quickly added to any application.

## Install

```
$ npm install harperdb-node
```

## Start using in your Node.js app

```js
// ESM
import { Harper } from 'harperdb-node';

// CommonJs
const { Harper } = require('harperdb-node');

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
import { Harper } from 'harperdb-node';

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
