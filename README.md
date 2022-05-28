# HarperDB for Node

Ease the use of HarperDB Operations in a Node.js environment. Simplistic in design, it can be quickly added to any application.

## Install

**Install with npm**
```
$ npm install harperdb-node
```
**Install with yarn**
```
$ yarn add harperdb-node
```

## Start using in your Node.js app

```js
// ESM
import { Harper } from 'harperdb-node';

// CommonJs
const { Harper } = require('harperdb-node');

const harper = new Harper({
    url: 'HARPERDB_URL',
    authorization: 'Basic HARPERDB_AUTHORIZATION',
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
    authorization: 'Basic HARPERDB_AUTHORIZATION',
});

const testSchema = harper.schema('test');
const personTable = testSchema.table('person');

const person = { name: 'Bruce Wayne' };
const people = [ { name: 'Barry Allen' }, { name: 'Kent Clark' } ];

(async () => {
	await testSchema.create();
    await personTable.create();

    await personTable.insert(person);
    await personTable.insert(people);

    const peopleList = await personTable.getAll();

    await personTable.drop();
    await testSchema.drop();
})();
```

## Docs

***Harper*** **object**
```
schema(schema_name: string) -> Schema
```
```
sql(raw_sql_statement: string) -> Promise
```

**&nbsp;&nbsp;**

***Schema*** **object**
```
create() -> Promise
```
```
drop() -> Promise
```
```
table(table_name: string, hash_attribute: string?) -> Table
```

**&nbsp;&nbsp;**

***Table*** **object**
```
create() -> Promise
```
```
drop() -> Promise
```
**&nbsp;&nbsp;**
```
select(attributes: string[]) -> Table
```
```
where(search_attribute: string, search_value: string) -> Table
where(search_conditions: Array<{search_attribute: string, search_value: any, search_type: string?}>) -> Table
```
**&nbsp;&nbsp;**
```
getById(id: string) -> Promise
getById(ids: string[]) -> Promise
```
```
get(search_clauses: {operator: string, offset: number, limit: number}) -> Promise
```
```
getAll() -> Promise
```
**&nbsp;&nbsp;**
```
insert(record: object) -> Promise
insert(records: Array<object>) -> Promise
```
**&nbsp;&nbsp;**
```
upsert(record: object) -> Promise
upsert(records: Array<object>) -> Promise
```
**&nbsp;&nbsp;**
```
update(id: string, record: object) -> Promise
update(record: {id: string, ... }) -> Promise
update(records: Array<{id: string, ... }>) -> Promise
```
**&nbsp;&nbsp;**
```
delete(id: string) -> Promise
delete(ids: string[]) -> Promise
```