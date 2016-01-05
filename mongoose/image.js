var mongoose = require('mongoose')
var Schema = mongoose.Schema

var imageSchema = new Schema({
	name: String,
	location:String
})

var image = mongoose.model('image', imageSchema)
module.exports = image