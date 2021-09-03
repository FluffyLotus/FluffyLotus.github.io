function uiInitWorldMap() {
    var data = "";

    data += "<table border=\"0\" style=\"border-collapse: collapse;\">";

    for (var y = 0; y < mainWorld.height; y++) {
        data += "<tr>";

        for (var x = 0; x < mainWorld.width; x++) {
            data += "<td>";

            var map = mainWorld.mapRefs[x + (y * mainWorld.width)];

            if (map != null) {
                //data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\">Map " + mainWorld.mapInfo[t].mapId + "</a>";
                data += "<a href=\"javascript: uiSetSelectedMap(" + map.id + ");\" id=\"map" + map.id + "\"><img src=\"images/map/map" + map.id + ".png\" border=\"0\" class=\"testHover\" /></a>";
            }

            data += "</td>";
        }

        data += "</tr>";
    }

    data += "</table>";

    //var minLoc = mainWorld.getMinLoc();
    //var maxLoc = mainWorld.getMaxLoc();
    //var data = "";

    //data += "<table border=\"0\" style=\"border-collapse: collapse;\">";

    //for (var y = minLoc.y; y <= maxLoc.y; y++) {
    //    data += "<tr>";

    //    for (var x = minLoc.x; x <= maxLoc.x; x++) {
    //        data += "<td>";

    //        for (var t = 0; t < mainWorld.mapInfo.length; t++) {
    //            if (mainWorld.mapInfo[t].x == x && mainWorld.mapInfo[t].y == y) {
    //                //data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\">Map " + mainWorld.mapInfo[t].mapId + "</a>";
    //                data += "<a href=\"javascript: uiSetSelectedMap(" + mainWorld.mapInfo[t].mapId + ");\" id=\"map" + mainWorld.mapInfo[t].mapId + "\"><img src=\"images/map/map" + mainWorld.mapInfo[t].mapId + ".png\" border=\"0\" class=\"testHover\" /></a>";
    //            }
    //        }

    //        data += "</td>";
    //    }

    //    data += "</tr>";
    //}

    //data += "</table>";

    $("#fullMap").html(data);
}

function uiDrawWorldMap() {
    for (var t = 0; t < mainWorld.mapInfo.length; t++) {
        var m = mainWorld.mapInfo[t].mapRef; //getMapFromId(mainWorld.mapInfo[t].mapId);

        if (m.active)
            $("#map" + m.id).show();
        else
            $("#map" + m.id).hide();
    }

    var possibleMovement = mainWorld.getPosibleMovement(selectedMapId);

    if (possibleMovement == 0) {
        $("#mapMovement").hide();
    }
    else {
        $("#mapMovement").show();

        if ((possibleMovement & 1) > 0) {
            $("#movementUp").show();
            $("#movementUpOff").hide();
        }
        else {
            $("#movementUp").hide();
            $("#movementUpOff").show();
        }

        if ((possibleMovement & 2) > 0) {
            $("#movementLeft").show();
            $("#movementLeftOff").hide();
        }
        else {
            $("#movementLeft").hide();
            $("#movementLeftOff").show();
        }

        if ((possibleMovement & 4) > 0) {
            $("#movementRight").show();
            $("#movementRightOff").hide();
        }
        else {
            $("#movementRight").hide();
            $("#movementRightOff").show();
        }

        if ((possibleMovement & 8) > 0) {
            $("#movementDown").show();
            $("#movementDownOff").hide();
        }
        else {
            $("#movementDown").hide();
            $("#movementDownOff").show();
        }
    }

    if (getActiveMapCount() <= 1)
        $("#mapTab").hide();
    else
        $("#mapTab").show();

}

function uiSetSelectedMap(newMapId) {
    glChangeSelectedMap(newMapId);

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
                var newMap = mainWorld.mapInfo[t].mapRef; //getMapFromId(mainWorld.mapInfo[t].mapId);

                if (newMap.active)
                    uiSetSelectedMap(newMap.id);
            }
        }
    }
}