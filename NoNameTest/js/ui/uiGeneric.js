var selectedBuildingId = -1;

function uiToggleFast() {
    uiShowToggleFastTooltip();
    toggleFast();

    if (fastIsOn) {
        document.getElementById("btnFast").className = "btn btn-success";
    }
    else {
        document.getElementById("btnFast").className = "btn";
    }
}

function uiShowToggleFastTooltip() {
    var r = getResourceFromId(RESOURCE_TIMEESSENCE);

    uiSetTooltip("Use " + r.name + " to increase the speed of the game.", "");
}

function uiGetLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        //str += curLink.amount + " " + getResourceFromId(curLink.resourceId).name;
        str += curLink.amount + " " + curLink.resourceRef.name;
    }

    return str;
}

function uiGetNegLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        //str += "-" + curLink.amount + " " + getResourceFromId(curLink.resourceId).name;
        str += "-" + curLink.amount + " " + curLink.resourceRef.name;
    }

    return str;
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    uiClearTooltip();
});

function uiGetSaveGame() {
    $("#gameStateData").val(GetSaveGameJson64());
}

function uiLoadSaveGame() {
    LoadSaveGameJson64($("#gameStateData").val());

    uiDrawGrid();
}