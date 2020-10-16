$(document).ready(function(){

    var options = {
         editOnAdd: true,
         controlOrder: [
             'text',
             'textarea'
         ],
        disabledAttrs: [
            'placeholder',
            'access',
            'value'
        ],
        dataType: 'json',
        onSave: function onSave(evt, formData) {saveForms(formData);}
     };
    var formBuilder =  $("#formBuilder").formBuilder(options);


    $('#adminaddnewCategory').on('click' , function () {
        $.ajax({
            url: '/createForms/newCategory',
            type: 'Post',
            data: {
                adminnameCa : $('#admintextName').val(),
                adminCatPublished : $('#adminCatPublished').val()
            },
            success : function (exist) {
                if(exist == 'Category created') {
                    console.log('1')
                    $('#adminCreateCat').modal('hide');
                    swal(exist);
                    $('.confirm').on('click' , function () {
                        location.reload();
                    })
                }
                else if (exist == 'Category not created'){
                    $('#adminCreateCat').modal('hide');
                    swal(exist);
                    $('.confirm').on('click' , function () {
                        location.reload();
                    })

                }
                else {

                    swal(exist);

                }

            }
        })
    });


});


function saveForms(formData) {
    var titleVal = $('#form-name').val();
    var category = $('#categoria').val();
    var published = $('#published').val();


    if( titleVal == '' ) {
        swal({
            title: "Make sure form name is not empty",
            type: "warning"
        })
    }
    else {
        $.ajax({
            url: '/createForms/save',
            type: 'Post',
            data: {
                "htmlForm": formData,
                "title": titleVal,
                "category" : category,
                "published": published
            },
            success: function (exist) {
                swal(exist);
                if(exist == 'Form Exists') {
                    //do nothing
                }
                else {
                    $('.confirm').on('click' , function () {
                        location.reload();
                    })
                }

            }
        })
    }

}
