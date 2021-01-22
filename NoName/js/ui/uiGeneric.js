var selectedBuildingId = -1;

function uiToggleFast() {
    toggleFast();

    if (fastIsOn) {
        document.getElementById("btnFast").className = "btn btn-success";
    }
    else {
        document.getElementById("btnFast").className = "btn";
    }
}

function uiGetLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        str += curLink.amount + " " + resources[curLink.resourceId].name;
    }

    return str;
}

function uiGetNegLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        str += "-" + curLink.amount + " " + resources[curLink.resourceId].name;
    }

    return str;
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    uiClearTooltip();
});