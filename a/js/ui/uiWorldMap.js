function uiInitWorldMap() {
    var data = "";

    data += "<table border=\"0\" style=\"border-collapse: collapse;\">";

    for (var y = 0; y < mainWorld.height; y++) {
        data += "<tr>";

        for (var x = 0; x < mainWorld.width; x++) {
            data += "<td>";

            var map = mainWorld.mapRefs[x + (y * mainWorld.width)];

            if (map != null) {
                data += "<div onclick=\"javascript: uiSetSelectedMap(" + map.id + ");\" id=\"map" + map.id + "\" class=\"testHover\" style=\"width: 66px; height: 66px;\">" + getImageDiv(map.imageRef.info[0]) + "</div>";
            }

            data += "</td>";
        }

        data += "</tr>";
    }

    data += "</table>";

    $("#fullMap").html(data);

    //////////////

    $("#movementUp").append(getImageDiv(getImageFromName("icon_arrow_up").info[0]));
    $("#movementUpOff").append(getImageDiv(getImageFromName("icon_arrow_up_off").info[0]));
    $("#movementLeft").append(getImageDiv(getImageFromName("icon_arrow_left").info[0]));
    $("#movementLeftOff").append(getImageDiv(getImageFromName("icon_arrow_left_off").info[0]));
    $("#movementDown").append(getImageDiv(getImageFromName("icon_arrow_down").info[0]));
    $("#movementDownOff").append(getImageDiv(getImageFromName("icon_arrow_down_off").info[0]));
    $("#movementRight").append(getImageDiv(getImageFromName("icon_arrow_right").info[0]));
    $("#movementRightOff").append(getImageDiv(getImageFromName("icon_arrow_right_off").info[0]));
}

function uiDrawWorldMap() {
    for (var t = 0; t < mainWorld.mapInfo.length; t++) {
        var m = mainWorld.mapInfo[t].mapRef;

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
                var newMap = mainWorld.mapInfo[t].mapRef;

                if (newMap.active)
                    uiSetSelectedMap(newMap.id);
            }
        }
    }
}