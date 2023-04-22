const express = require("express");
const usersService = require("../services/usersService")
const router = express.Router();
const tableName = "users"
const client = require("../config/connection.js")

router.get("/", async function (req, res) {
    const response = await usersService.get(tableName, client)
    res.status(response.statusCode).json(response)
});

router.get("/:id", async function (req, res) {
    const response = await usersService.getById(tableName, req.params.id, "user_id", client)
    res.status(response.statusCode).json(response)
});

router.post("/", async function (req, res) {
    const response = await usersService.post(tableName, req.body, client)
    res.status(response.statusCode).json(response)
});

router.put("/:id", async function (req, res) {
    const response = await usersService.put(tableName, req.body, req.params.id, "user_id", client)
    res.status(response.statusCode).json(response)
});

router.delete("/:id", async function (req, res) {
    const response = await usersService.deleteRecord(tableName, req.params.id, "user_id", client)
    res.status(response.statusCode).json(response)
});

module.exports = router;