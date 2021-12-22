$('#private').click(function () {
    if ($('#private').is(':checked')) {
        $('#companyName').attr("disabled", true);
        $('#vat').attr("disabled", true);
    }
});

$('#bussines').click(function () {
    if ($('#bussines').is(':checked')) {
        $('#companyName').attr("disabled", false);
        $('#vat').attr("disabled", false);
    }
});
