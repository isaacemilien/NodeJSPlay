const express = require("express")
const router = express.Router();
const utils = require("../utils/utils");

router.get("/", (req, res) => {
    res.render("index");
})

module.exports = router;