var express = require('express');
var router = express.Router();
var moment = require('moment');
var Forms = require('../models/forms');
var filledForms = require('../models/filledForms');
var Categories = require('../models/categories');
/* GET users listing. */
router.get('/',function(req, res, next) {
    res.render('forms');
});

router.post('/get-all' , function (req, res, next) {
    Forms.find().lean().exec(function (err, result) {
        if(err){
            console.log(err)
        }
        var data = {
            data: result
        };
        res.send(data);

    })
});

router.post('/get-filled' , function (req, res, next) {
    var id = req.body.id;
    filledForms.find({
        $and : [
            {categoryId : id} , {created_at :  {
                $gte: moment(req.body.startTime),
                $lt: moment(req.body.endTime)
            }}
        ]
    }, {filledForm : 1}
    ).lean().exec(function (err , results) {
        if(err) {
            console.log(err)
        }


        var result = {
            data: results
        };
        res.send(result);
    })

});


router.post('/get-item' , function (req, res, next) {
    var id = req.body.id;
    Forms.find({
        _id : id
    }).lean().exec(function (err, data) {
        if(err){
            console.log(err)
        }


        res.send(data);

    })
});

router.post('/get-categories' , function (req, res, next) {

    Categories.find().lean().exec(function (err, data) {
        if(err){
            console.log(err)
        }

        res.send(data);

    })
});

router.post('/update-published', function (req, res, next) {
    Forms.findOneAndUpdate({_id: req.body.id}, {published: req.body.isPublished}, function (err) {
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

router.post('/saveEdited' , function (req, res, next) {
    var id = req.body.id;
    Forms.findById(id , function (err , form) {
        if(err) {
            console.log(err)
        }

        if(req.body.published == 'Yes') {
            form.title = req.body.title;
            form.category = req.body.category;
            form.published = true;
            form.form = req.body.htmlForm;
        }
        else{
            form.title = req.body.title;
            form.category = req.body.category;
            form.published = false;
            form.form = req.body.htmlForm;
        }
        form.save(function (err) {
            if (err) {
                res.send('Error')
            }
            else {
                var sms = "Form Updated";
                res.send(sms);
            }
        });
    });

});

router.post('/delete-item' , function (req, res, next) {

    var time = moment(req.body.time);
    var createdBy = "admin";
    var time2 = moment(req.body.time).add(1 , 'seconds');
    filledForms.deleteOne({
        $and : [
            {created_at : {$gte : time}} , {created_at : {$lte : time2}} , {createdBy: createdBy}
        ]

    }).lean().exec(function (err , result) {
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});



module.exports = router;