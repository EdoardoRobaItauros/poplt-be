const express = require("express");
const query = require("../services/queryService")
const router = express.Router();

router.get("/", function (req, res) {
    const pageNum = req.query.page ? req.query.page : 0
    const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
    query.getWithPaginationAndJoin("contents", res, pageNum, itemsPerPage, [{ tableName: "users", fk: "user_id" }, { tableName: "challenges", fk: "challenge_id" }])
});

router.get("/find-by-search", function (req, res) {
    const orderedBy = req.query.orderedBy ? `ORDER BY ${req.query.orderedBy} DESC` : ""
    delete req.query.orderedBy
    query.getBySearch("contents", res, req.query, orderedBy)
});

router.get("/:id", function (req, res) {
    query.getById("contents", res, req.params.id, "id")
});

router.post("/", function (req, res) {
    query.post("contents", res, req.body)
});

router.put("/:id", function (req, res) {
    query.putSingleColumn("contents", res, req.body, req.params.id)
});

router.delete("/:id", function (req, res) {
    query.deleteRecord("contents", res, req.params.id)
});

module.exports = router;