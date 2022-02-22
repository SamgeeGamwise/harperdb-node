# HarperDB Functions

HDB Functions eases the use of HarperDB operations while from a Node.js environment. Simplistic in design, it can be quickly added to any application.

## Install

```
$ npm install hdb-functions
```

## Example

```
import { Harper } from "hdb-functions";

const harper = new Harper({
	url:  "HARPERDB_URL",
	authorization:  "HARPERDB_AUTHORIZATION"
});

const schema = harper.schema("NAME_OF_SCHEMA");
const table = schema.table("NAME_OF_TABLE");

// ...
```

HarperDB URL and Authorization can be found within your HarperDB Studio configuration.
