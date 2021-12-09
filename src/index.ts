import hdb from "./harper"

const harper = hdb.initialize({
    authorization: "Basic eG9lbG9zOlRyeXN0YTUyNSE=",
    url: "https://slack-cheer.harperdbcloud.com"
})

const test = harper.schema("test")
const person = test.table("person")
const id = '1398b059-4d12-4cce-a818-5b31cd8792e6'

const superman1 = {
    id,
    birthday: 1637655887723,
    alias: 'Kent Clark',
    name: "Super",
    sex: "M"
}

const superman2 = {
    birthday: 1637655887723,
    alias: 'Kent Clark',
    name: "Super",
    sex: "M"
}


person.inserts([superman1, superman2, superman2]).then((res: any) => {
    console.log(res)
    person.select(["id", "birthday", "alias", "name", "sex"]).getById(id).then((res: any) => {
        // console.log(res)
        person.select(["id", "alias", "birthday", "name"]).wheres([
            { search_attribute: "birthday", search_value: [1637655887722, 1637655887724], search_type: "between" },
            { search_attribute: "alias", search_value: "Bob" }
        ]).get({ operator: "or" }).then((res: any) => {
            console.log(res)
            res = res.map((record: any) => {
                record.name = record.name + "man"
                return record
            })
            // console.log(res)

            person.updates(res).then((res: any) => {
                // console.log(res)

                person.delete(res.update_hashes).then((res: any) => {
                    // console.log(res)
                })
            })
        }).catch((err: any) => console.log(err))
    })
})
