
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var filledFormsSchema = new Schema({
    title : String,
    filledForm : Array,
    createdBy: String,
    categoryId : String
});

filledFormsSchema.plugin(timestamps,{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//create the model class

var filledForms = mongoose.model('filledForms', filledFormsSchema , 'filledForms');

module.exports = filledForms;