const { Client } = require("pg")
const usersService = require("../services/usersService")
const challengesService = require("../services/challengesService")
const queryService = require("../services/queryService")

test("test Get", async () => {
    const expected = { data: ["123"], statusCode: 200 }

    let client = new Client();
    client.query = jest.fn((q, p) => expected)
    client.query.mockResolvedValueOnce({ rows: ["123"] });
    const actual = await usersService.get("users", client)

    expect(actual).toEqual(expected);
})

test("test Get by ID", async () => {
    const expected = { data: ["123"], statusCode: 200 }

    let client = new Client();
    client.query = jest.fn((q, p) => expected)
    client.query.mockResolvedValueOnce({ rows: ["123"] });
    const actual = await usersService.getById("users", "123", "user_id", client)

    expect(actual).toEqual(expected);
})

test("test Post", async () => {
    body = {
        user_id: "16543",
        first_name: "Arty",
        last_name: "Matzkaitis",
        email: "amatzkaitis220@wunderground.com",
        instagram_uname: "amatzkaitis0",
        gender: "Male",
    }
    const expected = {
        data: [body], statusCode: 200
    }

    let client = new Client();
    client.query = jest.fn((q, p) => expected)
    client.query.mockResolvedValueOnce({
        rows: [body]
    });
    const actual = await usersService.post("users", body, client)

    expect(actual).toEqual(expected);
})
