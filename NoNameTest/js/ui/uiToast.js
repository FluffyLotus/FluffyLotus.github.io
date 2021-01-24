function uiAddToastMessage(title, body) {
    var id = Math.random().toString().replace(".", "");

    var newElement = $("#toastTemplate").clone();

    $(newElement).attr("id", "toastTemplate" + id);
    $(newElement).find("#toastTemplateTitle").attr("id", "toastTemplateTitle" + id);
    $(newElement).find("#toastTemplateBody").attr("id", "toastTemplateBody" + id);

    $("#toastContainer").append(newElement);

    $("#toastTemplateTitle" + id).text(title);
    $("#toastTemplateBody" + id).text(body);

    $('#toastTemplate' + id).toast('show');

    $('#toastTemplate' + id).on('hidden.bs.toast', function () {
        $(this).remove();
    })
}