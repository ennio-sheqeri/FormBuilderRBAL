/**
 * Created by besnik.picori on 5/5/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var catSchema = new Schema({
    categoryName: String,
    createdBy: String,
    published: Boolean
});

catSchema.plugin(timestamps,{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//create the model class

var Categoria = mongoose.model('categoria', catSchema ,'categoria');

module.exports = Categoria;