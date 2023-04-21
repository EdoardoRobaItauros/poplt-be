const express = require("express");
const usersService = require("../services/usersService")
const router = express.Router();
const tableName = "users"

router.get("/", function (req, res) {
    usersService.get(tableName, res)
});

router.get("/:id", function (req, res) {
    usersService.getById(tableName, res, req.params.id, "user_id")
});

router.post("/", function (req, res) {
    usersService.post(tableName, res, req.body)
});

router.put("/:id", function (req, res) {
    usersService.put(tableName, res, req.body, req.params.id, "user_id")
});

router.delete("/:id", function (req, res) {
    usersService.deleteRecord(tableName, res, req.params.id, "user_id")
});

module.exports = router;