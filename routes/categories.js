var express = require('express');
var router = express.Router();
var Categoria = require('../models/categories');
var Forms = require('../models/forms');
/* GET users listing. */
router.get('/',function(req, res, next) {
    var info = {
        username: req.user.username,
        name: req.user.name,
        photoPath: req.user.photoPath,
        admin: req.user.isAdmin
    };

    res.render('categories', info);

});

router.post('/save', function (req, res, next) {
    var category = req.body.nameCa;
    var creatoDa = req.user.name;
    var publicareCat = req.body.publicareCa;
    var categories;
    var exist;
    if(publicareCat == 'Si') {
        categories = new Categoria({
            categoryName : category,
            createdBy : creatoDa,
            published: true
        });

        Categoria.find({
            categoryName: req.body.nameCa
        }).lean().exec(function (err, result) {
            if(err) {
                console.log(err);
            }
            if(result != '') {
                exist = 'Categoria esiste sull database';
                res.send(exist);
            }
            else {
                categories.save(function (err) {
                    if(err) {
                        exist = 'E stato un problema nell creazione della categoria';
                        res.send(exist);
                    }
                    else {
                        exist = 'Categoria e stato creato';
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
                exist = 'Categoria esiste sull database';
                res.send(exist);
            }
            else {
                categories.save(function (err) {
                    if(err) {
                        exist = 'E stato un problema nell creazione della categoria';
                        res.send(exist);
                    }
                    else {
                        exist = 'Categoria e stato creato';
                        res.send(exist);
                    }
                })
            }


        });
    }



});

router.post('/get-all' , function (req, res, next) {
    Categoria.find().lean().exec(function (err, result) {
        if(err){
            console.log(err)
        }
        var data = {
            data: result
        };
        res.send(data)

    })
});

router.post('/campionamenti' , function (req, res, next) {
    var title = req.body.titolo;
    Forms.find({
        category : title
    }).lean().exec(function (err, result) {
        if(err){
            console.log(err)
        }
        var data = {
            data: result
        };
        res.send(data)

    })
});


router.post('/update-published', function (req, res, next) {
    Categoria.findOneAndUpdate({_id: req.body.id}, {published: req.body.isPublished}, function (err) {
            if (err) {
                console.log(err);
                res.send({err: 'Errore con il database!'})
            }
            else {
                res.send('ok');
            }
        }
    );
});

module.exports = router;