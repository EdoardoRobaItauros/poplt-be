const express = require("express");
const contentsService = require("../services/contentsService")
const router = express.Router();
const tableName = "contents"
const client = require("../config/connection.js")

router.get("/", async function (req, res) {
    const response = await contentsService.getWithPaginationAndJoin(tableName, req, client)
    res.status(response.statusCode).json(response)
});

router.get("/find-by-search", async function (req, res) {
    const response = await contentsService.getBySearch(tableName, req, client)
    res.status(response.statusCode).json(response)
});

router.get("/:id", async function (req, res) {
    const response = await contentsService.getById(tableName, req.params.id, "id", client)
    res.status(response.statusCode).json(response)
});

router.post("/", async function (req, res) {
    const response = await contentsService.post(tableName, req.body, client)
    res.status(response.statusCode).json(response)
});

router.put("/:id", async function (req, res) {
    const response = await contentsService.putSingleColumn(tableName, req.body, req.params.id, "id", client)
    res.status(response.statusCode).json(response)
});

router.delete("/:id", async function (req, res) {
    const response = await contentsService.deleteRecord(tableName, req.params.id, "id", client)
    res.status(response.statusCode).json(response)
});

module.exports = router;