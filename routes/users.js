const express = require("express");
const query = require("./functions/queries")
const router = express.Router();

router.get("/", function (req, res) {
    query.get("users", res)
});

router.get("/:id", function (req, res) {
    query.getById("users", res, req.params.id)
});

router.post("/", function (req, res) {
    query.post("users", res, req.body)
});

router.put("/:id", function (req, res) {
    query.put("users", res, req.body, req.params.id)
});

router.delete("/:id", function (req, res) {
    query.deleteRecord("users", res, req.params.id)
});

module.exports = router;