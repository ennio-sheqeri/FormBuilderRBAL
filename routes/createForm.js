var express = require('express');
var router = express.Router();
var Categoria = require('../models/categories');
var Forms = require('../models/forms');
/* GET users listing. */
router.get('/',function(req, res, next) {

    Categoria.find().lean().exec(function (err, result) {
        var info = {
            dropdownVals: result
        };
        res.render('createForm', info );
    })

});

router.post('/save' , function (req, res, next) {
    var title = req.body.title;
    var data = req.body.htmlForm;
    var category = req.body.category;
    var published = req.body.published;
    var form;
    if(published == 'Yes') {
        form = new Forms ({
            title : title,
            form : data,
            category : category,
            published : true,
            createdBy : "admin"
        });
        console.log(form)
    }
    else {
        form = new Forms ({
            title : title,
            form : data,
            category : category,
            published : false,
            createdBy : "admin"
        });
    }

    Forms.find({
        title: title,
        category: category
    }).lean().exec(function (err, result) {
        if(err) {
            console.log(err);
        }
        if(result != '') {
            var exist = 'Form already exists';
            res.send(exist);
        }
        else {
            form.save(function (err) {
                if(err) {
                    var exist = 'Form not saved';
                    res.send(exist);
                }
                else {
                    var exist = 'Form Saved';
                    res.send(exist);
                }
            })
        }
    });

});

router.post('/newCategory' , function (req, res, next) {
    var category = req.body.adminnameCa;
    var creatoDa = "admin";
    var publishedCat = req.body.adminCatPublished;
    var categories;
    var exist;
    if(publishedCat == 'Yes') {
        categories = new Categoria({
            categoryName : category,
            createdBy : creatoDa,
            published: true
        });

        Categoria.find({
            categoryName: category
        }).lean().exec(function (err, result) {
            if(err) {
                console.log(err);
            }
            if(result != '') {
                exist = 'Category already exists';
                res.send(exist);
            }
            else {
                categories.save(function (err) {
                    if(err) {
                        exist = 'Category not created';
                        res.send(exist);
                    }
                    else {
                        exist = 'Category created';
                        res.send(exist);
                    }
                })
            }


        });
    }
    else {
        categories = new Categoria({
            categoryName : category,
            createdBy : creatoDa,
            published: false
        });

        Categoria.find({
            categoryName: req.body.nameCa
        }).lean().exec(function (err, result) {
            if(err) {
                console.log(err);
            }
            if(result != '') {
                exist = 'Category already exists';
                res.send(exist);
            }
            else {
                categories.save(function (err) {
                    if(err) {
                        exist = 'Ctaegory not created';
                        res.send(exist);
                    }
                    else {
                        exist = 'Category created';
                        res.send(exist);
                    }
                })
            }


        });
    }

});





module.exports = router;