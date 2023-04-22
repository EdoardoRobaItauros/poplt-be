const express = require("express");
const challengesService = require("../services/challengesService")
const router = express.Router();
const tableName = "challenges"
const client = require("../config/connection.js")

router.get("/", async function (req, res) {
    const response = await challengesService.get(tableName, client)
    res.status(response.statusCode).json(response)
});

router.get("/:id", async function (req, res) {
    const response = await challengesService.getById(tableName, req.params.id, "challenge_id", client)
    res.status(response.statusCode).json(response)
});

router.post("/", async function (req, res) {
    const response = await challengesService.post(tableName, req.body, client)
    res.status(response.statusCode).json(response)
});

router.put("/:id", async function (req, res) {
    const response = await challengesService.put(tableName, req.body, req.params.id, "challenge_id", client)
    res.status(response.statusCode).json(response)
});

router.delete("/:id", async function (req, res) {
    const response = await challengesService.deleteRecord(tableName, req.params.id, "challenge_id", client)
    res.status(response.statusCode).json(response)
});

module.exports = router;