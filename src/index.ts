import Harper from "./Harper"
import Schema from "./Schema"
import Table from "./Table"
import { hash } from "./types"

const schema: string = "test"
const table: string = "person"

const id: string = '1398b059-4d12-4cce-a818-5b31cd8792e6'

const batman = {
    id,
    birthday: 1637655887723,
    alias: 'Batman',
    name: "Bruce Wayne",
    sex: "M",
    power: "Is bat"
}

const superman = {
    birthday: 1637655887723,
    alias: "Superman",
    name: "Kent Clark",
    sex: "M",
    power: "Everything"
};


// (async () => {

//     const harper = new Harper({
//         authorization: "Basic eG9lbG9zOlRyeXN0YTUyNSE=",
//         url: "https://slack-cheer.harperdbcloud.com"
//     })

//     const test = harper.schema(schema)

//     console.log(await test.create())

//     const person = test.table(table)

//     console.log(await person.create())

//     console.log(await person.inserts([superman1]))
//     console.log(await person.inserts([superman2, superman2]))

//     const personById = await person.select(["id", "birthday", "alias", "name", "sex"]).getById(id)
//     console.log(personById)


//     let people: any = await person
//         .select(["id", "alias", "birthday", "name"])
//         .wheres([
//             { search_attribute: "birthday", search_value: [1637655887722, 1637655887724], search_type: "between" },
//             { search_attribute: "alias", search_value: "Bob" }
//         ])
//         .get({ operator: "or" })

//     people = people.map((record: any) => {
//         record.name = record.name + "man"
//         return record
//     })

//     console.log(people)
//     console.log(await person.updates(people))
//     // console.log(await person.delete(people.update_hashes))
// })()

(async () => {
    const harper = new Harper({
        authorization: "Basic eG9lbG9zOlRyeXN0YTUyNSE=",
        url: "https://slack-cheer.harperdbcloud.com"
    })

    const test: Schema = harper.schema(schema)
    const person: Table = test.table(table)

    await test.create()
    await person.create()
    await person.insert([batman, superman])

    await person.update({ id, "name": "Bruce Bayne" })
})()
