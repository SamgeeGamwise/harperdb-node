import db_table from "./table"
import { harper, table, config } from "./types"

const harper: harper = {
    config: {
        url: "",
        authorization: ""
    },
    schema: function (schema: string): { table: (table: string, id?: string) => table } {
        this.config.schema = schema
        return { table: db_table(schema, this.config) }
    },
    initialize: function (config: config): harper {
        this.config = config
        return this
    },
}

export default harper