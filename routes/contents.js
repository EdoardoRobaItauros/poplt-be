const express = require("express");
const query = require("./functions/get")
const router = express.Router();

router.get("/", function (req, res) {
    query.get("contents", res)
});

router.get("/:id", function (req, res) {
    query.getById("contents", res, req.params.id)
});

router.post("/", function (req, res) {
    query.post("contents", res, req.body)        
});

router.put("/:id", function (req, res) {
    query.put("contents", res, req.body, req.params.id)
});

router.delete("/:id", function (req, res) {
    query.deleteRecord("contents", res, req.params.id)
});

module.exports = router;