function selectImage(elemId){
    $("#imagesModal-body").empty();

    var html = "";

    for (var t = 0; t < spritesheetData.length; t++) {
        if (spritesheetData[t].i == 0) {
            html += "<div style=\"display: inline-block; width: 48px; height: 48px; overflow: hidden;\" onclick=\"choseImage('" + elemId + "', '" + spritesheetData[t].n + "');\">" + getImageDiv(spritesheetData[t]) + "</div>";
        }
    }

    $("#imagesModal-body").append(html);

    $('#imagesModal').modal('show');
}

function choseImage(elemId, imageName) {
    $("#" + elemId).val(imageName);

    $("#" + elemId + "_graph").html(getImageDivFromName(imageName));

    $('#imagesModal').modal('hide');
}

function getImageDiv(item) {
    return "<div style=\"background: url(sheet/spritesheet.png) " + (-item.x) + "px " + (-item.y) + "px; width: " + item.w + "px; height: " + item.h + "px;\"></div>";
}

function getImageDivFromName(imageName) {
    var item = getImageFromName(imageName);

    if(item != null)
        return getImageDiv(item);

    return "";
}

var download_csv_using_blob = function (file_name, content) {
    var csvData = new Blob([content], { type: 'text/plain' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        window.navigator.msSaveOrOpenBlob(csvData, file_name);
    } else { // for Non-IE (chrome, firefox etc.)
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var csvUrl = URL.createObjectURL(csvData);
        a.href = csvUrl;
        a.download = file_name;
        a.click();
        URL.revokeObjectURL(a.href)
        a.remove();
    }
};

var download_img_using_blob = function (file_name, content) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        window.navigator.msSaveOrOpenBlob(csvData, file_name);
    } else { // for Non-IE (chrome, firefox etc.)
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = content;
        a.download = file_name;
        a.click();
        URL.revokeObjectURL(a.href)
        a.remove();
    }
};

function writeDebug(str) {
    document.getElementById("debug").value = str;
    document.getElementById("debug").style.display = "";
}