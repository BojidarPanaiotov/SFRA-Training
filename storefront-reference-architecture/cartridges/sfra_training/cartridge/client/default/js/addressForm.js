$(document).on('click', '#privateAddress', function (e) {
    console.log('Done in private form');

    if(this.checked == true)
    {
        $.ajax({
            url: 'FormTesting-GetPrivateForm',
            type: 'get',
            dataType: 'html',
            success: function (response) {
                $('.card-body').html(response);
                console.log('Done in private form');
            },
            error: function () {
            }
        });
    }
});

$(document).on('click', '#bussinesAddress', function (e) {

    console.log('Done in bussines form');

    if(this.checked == true)
    {
        $.ajax({
            url: 'FormTesting-GetBussinesForm',
            type: 'get',
            dataType: 'html',
            success: function (response) {
                $('.card-body').html(response);
                console.log('Done in bussines form');
            },
            error: function () {
            }
        });
    }
});