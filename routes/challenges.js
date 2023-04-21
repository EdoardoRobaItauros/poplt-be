const express = require("express");
const query = require("../services/queryService")
const router = express.Router();

router.get("/", function (req, res) {
    query.get("challenges", res)
});

router.get("/:id", function (req, res) {
    query.getById("challenges", res, req.params.id, "challenge_id")
});

router.post("/", function (req, res) {
    query.post("challenges", res, req.body)
});

router.put("/:id", function (req, res) {
    query.put("challenges", res, req.body, req.params.id)
});

router.delete("/:id", function (req, res) {
    query.deleteRecord("challenges", res, req.params.id)
});

module.exports = router;