$(document).ready(function(){
    $("#private").change(function(){
        $('.bussines-address').hide();
        $("#companyName").attr("required", false);
        $("#vat").attr("required", false);
    });
    $("#bussines").change(function(){
        $('.bussines-address').show();
        $("#companyName").attr("required", true);
        $("#vat").attr("required", true);
    });
});