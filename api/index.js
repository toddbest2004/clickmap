var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var db = require("../mongoose");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/images/:id", function(req, res){
	res.send("images")
})
router.get("/maps/:id", function(req, res){
	res.send("maps")
})
router.post("/maps", function(req, res){
	res.send("save")
})
router.post("/maps/:id", function(req, res){
	res.send("update")
})

module.exports = router;