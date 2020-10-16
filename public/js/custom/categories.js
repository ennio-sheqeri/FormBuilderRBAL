$(document).ready(function(){




        $('#addnewCategory').off().on('click' , function () {
            $.ajax({
                url: '/categories/save',
                type: 'Post',
                data: {
                    nameCa : $('#textNome').val(),
                    publicareCa : $('#catPublished').val()
                },
                success : function (exist) {
                    if(exist == 'Category is create') {
                        $('#myModal').modal('hide');
                        swal(exist);
                        $('.confirm').on('click' , function () {
                           location.reload();
                        })
                    }
                    else if (exist == 'Error during create a category'){
                        $('#myModal').modal('hide');
                        swal(exist);
                        $('.confirm').on('click' , function () {
                            location.reload();
                        })

                    }
                    else {
                        swal(exist)
                    }

                }
            })
        });



    var table = $('#categorie_create').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        ajax: {
            url: "/categories/get-all",
            type: "POST",
            dataSrc: "data"
        },
        "pageLength": 30,
        aoColumns: [
            {
                "mData": "_id"
            }, {
                "mData": "categoryName"
            }, {
                "mData": null,
                "bSortable": false,
                "mRender": function (o) {
                    return '<input type="checkbox" class="isCatPublished" data-toggle="toggle" data-isPublished= '+o.published+' data-on="YES" data-off="NO"></td>'
                }
            },{
                "mData": "createdBy"
            }, {
                "mData": "created_at"
            },
            {
                "mData": null,
                "bSortable": false,
                "mRender": function (o) {
                    return '<button type="button" onclick="showCatDetails()" data-title="'+o.categoryName+'" class="btn btn-sm btn-primary show-camp-of-cat"><i class="fa fa-table"></i> More Details</button>'
                }
            }
        ],
        "fnDrawCallback": function() {
            initToggleCatPublished();
        }
    });

    $('#categorie_create').off().on('click' , '.toggle-group' , function () {
        $('.isCatPublished').change(function () {

            var id = $(this).closest('tr').find('td:first-of-type').text();
            var isPublished = $(this).prop('checked');
            $.post("/categories/update-published", {
                id: id,
                isPublished: isPublished
            }).done(function (data) {
                if (data === 'ok') {
                    location.reload();
                }
                else {
                    swal('Error in DB!');
                }
            });
        });
    })






});

function showCatDetails() {
    $('#categorie_create').off().on('click', '.show-camp-of-cat', function () {
        var title = $(this).attr('data-title');
        var table;
        $('#categorie').addClass('hidden');
        $('#form_of_category').removeClass('hidden');
        $('.form-of').text('').text("form of" + title);
        if ( $.fn.DataTable.isDataTable( '#form_category' ) ) {
            $('#form_category').DataTable().destroy();
            $('#form_category tbody').empty();
            table = $('#form_category').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true,
                ajax: {
                    url: "/categories/showForms",
                    type: "POST",
                    data: {
                        title: title
                    },
                    dataSrc: "data"
                },
                aoColumns: [
                    {
                        "mData": "_id"
                    }, {
                        "mData": "title"
                    }, {
                        "mData": "category"
                    }, {
                        "mData": "createdBy"
                    }, {
                        "mData": "created_at"
                    }
                ]
            });
        }
        else {

            table = $('#form_category').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true,
                ajax: {
                    url: "/categories/createForm",
                    type: "POST",
                    data: {
                        title: title
                    },
                    dataSrc: "data"
                },
                aoColumns: [
                    {
                        "mData": "_id"
                    }, {
                        "mData": "title"
                    }, {
                        "mData": "category"
                    }, {
                        "mData": "createdBy"
                    }, {
                        "mData": "created_at"
                    }
                ]
            });
        }

        $('#cat-go-back').off().on('click' , function () {
            $('#form_of_category').addClass('hidden');
            $('#categorie').removeClass('hidden');
            $('#categorie_create').DataTable().destroy();
            $('#categorie_create tbody').empty();
            var table = $('#categorie_create').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true,
                ajax: {
                    url: "/categories/get-all",
                    type: "POST",
                    dataSrc: "data"
                },
                "pageLength": 30,
                aoColumns: [
                    {
                        "mData": "_id"
                    }, {
                        "mData": "categoryName"
                    }, {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<input type="checkbox" class="isCatPublished" data-toggle="toggle" data-isPublished= '+o.published+' data-on="YES" data-off="NO"></td>'
                        }
                    },{
                        "mData": "createdBy"
                    }, {
                        "mData": "created_at"
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<button type="button" onclick="showCatDetails()" data-title="'+o.categoryName+'" class="btn btn-sm btn-primary show-camp-of-cat"><i class="fa fa-table"></i> More Details</button>'
                        }
                    }
                ],
                "fnDrawCallback": function() {
                    initToggleCatPublished();
                }
            });

            $('#categorie_create').off().on('click' , '.toggle-group' , function () {
                $('.isCatPublished').change(function () {

                    var id = $(this).closest('tr').find('td:first-of-type').text();
                    var isPublished = $(this).prop('checked');
                    $.post("/categories/update-published", {
                        id: id,
                        isPublished: isPublished
                    }).done(function (data) {
                        if (data === 'ok') {
                            location.reload();
                        }
                        else {
                            swal('Error DB!');
                        }
                    });
                });
            })
        })
    })
}


function initToggleCatPublished() {

    $('.isCatPublished').each(function () {

        var isPublished = $(this).attr('data-isPublished');


        if (isPublished === 'true'){
            $(this).bootstrapToggle('on');
        }
        else {
            $(this).bootstrapToggle('off');
        }
    });
}
