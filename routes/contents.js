const express = require("express");
const contentsService = require("../services/contentsService")
const router = express.Router();
const tableName = "contents"

router.get("/", function (req, res) {
    contentsService.getWithPaginationAndJoin(tableName, req, res)
});

router.get("/find-by-search", function (req, res) {
    contentsService.getBySearch(tableName, req, res)
});

router.get("/:id", function (req, res) {
    contentsService.getById(tableName, res, req.params.id, "id")
});

router.post("/", function (req, res) {
    contentsService.post(tableName, res, req.body)
});

router.put("/:id", function (req, res) {
    contentsService.putSingleColumn(tableName, res, req.body, req.params.id, "id")
});

router.delete("/:id", function (req, res) {
    contentsService.deleteRecord(tableName, res, req.params.id, "id")
});

module.exports = router;