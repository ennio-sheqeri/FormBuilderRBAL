
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var formsSchema = new Schema({
    title : String,
    form : Array,
    category: String,
    published: Boolean,
    createdBy: String
});

formsSchema.plugin(timestamps,{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//create the model class

var Forms = mongoose.model('forms', formsSchema , 'forms');

module.exports = Forms;