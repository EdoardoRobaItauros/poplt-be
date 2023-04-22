const usersService = require("../services/usersService")

test("test Get by id", () => {
    expect(usersService.get('users')).toBe(1);
})
