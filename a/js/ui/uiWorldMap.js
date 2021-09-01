function uiInitWorldMap() {
    var minLoc = mainWorld.getMinLoc();
    var maxLoc = mainWorld.getMaxLoc();
    var data = "";

    data += "<table border=\"0\" style=\"border-collapse: collapse;\">";

    for (var y = minLoc.y; y <= maxLoc.y; y++) {
        data += "<tr>";

        for (var x = minLoc.x; x <= maxLoc.x; x++) {
            data += "<td>";

            for (var t = 0; t < mainWorld.mapInfo.length; t++) {
                if (mainWorld.mapInfo[t].x == x && mainWorld.mapInfo[t].y == y) {
                    //data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\">Map " + mainWorld.mapInfo[t].mapId + "</a>";
                    data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\"><img src=\"images/map/map" + mainWorld.mapInfo[t].mapId + ".png\" border=\"0\" class=\"testHover\" /></a>";
                }
            }

            data += "</td>";
        }

        data += "</tr>";
    }

    data += "</table>";

    $("#fullMap").html(data);
}

function uiDrawWorldMap() {
    for (var t = 0; t < mainWorld.mapInfo.length; t++) {
        var m = getMapFromId(mainWorld.mapInfo[t].mapId);

        if (m.active)
            $("#map" + m.id).show();
        else
            $("#map" + m.id).hide();
    }
}

function uiSetSelectedMap(newMapId) {
    selectedMapId = newMapId;

    $('#myTab a[href="#map"]').tab('show');
}

function uiMoveMap(x, y) {
    var nx, ny;
    var found = false;

    for (var t = 0; t < mainWorld.mapInfo.length; t++) {
        if (mainWorld.mapInfo[t].mapId == selectedMapId) {
            found = true;
            nx = mainWorld.mapInfo[t].x + x;
            ny = mainWorld.mapInfo[t].y + y;
        }
    }

    if (found) {
        for (var t = 0; t < mainWorld.mapInfo.length; t++) {
            if (mainWorld.mapInfo[t].x == nx && mainWorld.mapInfo[t].y == ny) {
                var newMap = getMapFromId(mainWorld.mapInfo[t].mapId);

                if (newMap.active)
                    uiSetSelectedMap(newMap.id);
            }
        }
    }
}