var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var db = require("../mongoose");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/images/:id", function(req, res){
	if(typeof(req.params.id)==="string"){
		db.image.findOne({name:req.params.id}).then(function(image){
			if(image===null){
				res.status(404).send({error:"Image not found."})
				return
			}
			res.send(image.location)
		})
	}else{
		res.status(401).send({error:"Improper id format."})
	}
})
router.get("/maps/:id", function(req, res){
	db.map.findOne({_id:'568c2d9c9e87b15e43eace96'}).then(function(map){
		if(map){
			res.send(map)
		}
		res.status(404).send({error:"Map not found."})
	})
})
router.post("/maps", function(req, res){
	//db.map.create(req.body)
	db.map.create(req.body).then(function(map){
		res.send({mapId:map._id})
	})
})
router.post("/maps/:id", function(req, res){
	if(typeof(req.params.id)!=='string'){
		res.status(401).send({error:"Improper id format."})
		return
	}
	db.map.findOne({_id:req.params.id}).then(function(map){
		if(!map){
			res.status(401).send({error:"Map not found."})
			return
		}
		// console.log(req.body)
		map.markers = req.body.markers
		map.image = req.body.image
		map.save()
		res.send("update")
		console.log(map)
	})
})

module.exports = router;