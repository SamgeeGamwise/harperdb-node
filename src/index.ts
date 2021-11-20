import hdb from "./harper"

const harper = hdb.initialize({
    authorization: "Basic eG9lbG9zOlRyeXN0YTUyNSE=",
    url: "https://slack-cheer.harperdbcloud.com"
})


const test = harper.schema("test")

const person = test.table("person")
