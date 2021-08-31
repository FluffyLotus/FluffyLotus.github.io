function uiDrawWorldMap() {
    var minLoc = mainWorld.getMinLoc();
    var maxLoc = mainWorld.getMaxLoc();
    var data = "";

    data += "<table border=\"1\">";

    for (var y = minLoc.y; y <= maxLoc.y; y++) {
        data += "<tr>";

        for (var x = minLoc.x; x <= maxLoc.x; x++) {
            data += "<td>";

            for (var t = 0; t < mainWorld.mapInfo.length; t++) {
                if (mainWorld.mapInfo[t].x == x && mainWorld.mapInfo[t].y == y)
                    data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\">Map " + mainWorld.mapInfo[t].mapId + "</a>";
            }

            data += "</td>";
        }

        data += "</tr>";
    }

    data += "</table>";

    $("#fullMap").html(data);
}

function uiSetSelectedMap(newMapId) {
    selectedMapId = newMapId;

    $('#myTab a[href="#map"]').tab('show');
}