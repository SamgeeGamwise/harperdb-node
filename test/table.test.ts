import fetch from "../src/fetch"
import hdb from "../src/harper"

const authorization = "Basic eG9lbG9zOlRyeXN0YTUyNSE="
const url = "https://slack-cheer.harperdbcloud.com"

const superman = {
    id: '1398b059-4d12-4cce-a818-5b31cd8792e6',
    birthday: 1637655887723,
    alias: 'Kent Clark',
    name: "Superman",
    sex: "M"
}


describe("Table", () => {

    let harper: any
    let person: any

    beforeEach(() => {
        harper = hdb.initialize({ authorization, url })
        person = harper.schema("test").table("person")
    })

    describe("Config", () => {
        it("should have table name and defaulted id", () => {
            expect(harper.config.table.name).toBe("person")
            expect(harper.config.table.hash_attribute).toBe("id")
        })

        it("should have use a unique id if provided", () => {
            harper.schema("test").table("person", "ssn")
            expect(harper.config.table.name).toBe("person")
            expect(harper.config.table.hash_attribute).toBe("ssn")
        })
    })


    describe("Parameters", () => {
        it("where() should update the where parameter from null", () => {
            expect(person.parameters.where).toBe(null)
            person.where("name", "Superman")
            expect(person.parameters.where[0].search_attribute).toBe("name")
            expect(person.parameters.where[0].search_value).toBe("Superman")
        })

        it("select() should update the select parameter from null", () => {
            expect(person.parameters.select).toEqual(null)
            person.select(["name", "message", "sex"])
            expect(person.parameters.select).toEqual(["name", "message", "sex"])
        })
    })

    describe("insert()", () => {
        it("should add a person to the database", () => {
            person.insert(superman).then((res: any) => {
                expect(res.inserted_hashes[0]).toEqual(superman.id)
            })
        })
    })

    describe("getById()", () => {
        it("should return person if provided a valid ID", () => {
            person.select(["id", "birthday", "alias", "name", "sex"]).getById(superman.id).then((res: any) => {
                expect(res).toEqual(superman)
            })
        })
    })

    describe("delete()", () => {
        it("should delete person from database with id", () => {
            person.delete(superman.id).then((res: any) => {
                expect(res.deleted_hashes[0]).toEqual(superman.id)
            })
        })
    })
})
