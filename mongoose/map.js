var mongoose = require('mongoose')
var Schema = mongoose.Schema

var mapSchema = new Schema({
	owner: String,
	image: String,
	markers: [{x:Number,y:Number,title:String,icon:String}]
})

var map = mongoose.model('map', mapSchema)
module.exports = map