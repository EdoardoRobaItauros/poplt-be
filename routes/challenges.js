const express = require("express");
const challengesService = require("../services/challengesService")
const router = express.Router();
const tableName = "challenges"

router.get("/", function (req, res) {
    challengesService.get(tableName, res)
});

router.get("/:id", function (req, res) {
    challengesService.getById(tableName, res, req.params.id, "challenge_id")
});

router.post("/", function (req, res) {
    challengesService.post(tableName, res, req.body)
});

router.put("/:id", function (req, res) {
    challengesService.put(tableName, res, req.body, req.params.id, "challenge_id")
});

router.delete("/:id", function (req, res) {
    challengesService.deleteRecord(tableName, res, req.params.id, "challenge_id")
});

module.exports = router;