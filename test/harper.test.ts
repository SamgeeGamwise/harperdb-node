import fetch from "node-fetch"
import hdb from "../src/harper"
import { harper } from "../src/types"

const authorization = "Basic eG9lbG9zOlRyeXN0YTUyNSE="
const url = "https://slack-cheer.harperdbcloud.com"

describe("Harper", () => {

    let harper: harper

    beforeEach(() => {
        harper = hdb.initialize({
            authorization: "password",
            url: "www.test.com"
        })
    })

    it("should initialize with the authorization and url", () => {
        expect(harper.config.authorization).toBe("password")
        expect(harper.config.url).toBe("www.test.com")
    })

    it("should allow you to define a schema", () => {
        harper.schema("test")
        expect(harper.config.schema).toBe("test")
    })

})
