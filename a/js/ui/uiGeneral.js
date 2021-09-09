function nFormatter(x) {
    var isNeg = false;
    var pi = -1;
    var p = ["K", "M", "B", "T", "q", "Q"]; // https://clickerheroes.fandom.com/wiki/Units
    var str = "";

    if (x < 0) {
        x -= x;
        isNeg = true;
    }

    while (x > 1000) {
        x /= 1000;
        pi++;
    }

    x = Math.floor(x * 10) / 10;

    str = x;

    if (pi >= 0)
        str += p[pi];

    if (isNeg)
        return "-" + str;
    return str;
}

function nComaFormatter(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getImageDiv(imageInfo) {
    return "<div class=\"spriteSheetBackground\" style=\"background-position-x: " + (-imageInfo.x) + "px; background-position-y: " + (-imageInfo.y) + "px; width: " + imageInfo.w + "px; height: " + imageInfo.h + "px;\"></div>";
    //return "<div style=\"background: url(sheet/spritesheet.png) -10px 0px; width: " + imageInfo.w + "px; height: " + imageInfo.h + "px;\"></div>";
}

function dataLinksToString(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (dl[t].typeId == DLTYPE_RESOURCE)
            //str += getResourceFromId(dl[t].objectId).name + ": " + (dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + nFormatter(dl[t].amount) + "<br />";
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //str += getEnemyFromId(dl[t].objectId).name + ": " + nFormatter(getEnemyFromId(dl[t].objectId).totalKill) + "/" + nFormatter(dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + nFormatter(dl[t].objectRef.totalKill) + "/" + nFormatter(dl[t].amount) + "<br />";
        }
        else
            str += "???<br />";
    }

    return str;
}

function dataLinksToStringOneLine(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (t > 0)
            str += ", ";

        if (dl[t].typeId == DLTYPE_RESOURCE)
            //str += dl[t].amount + " " + getResourceFromId(dl[t].objectId).name;
            str += nFormatter(dl[t].amount) + " " + dl[t].objectRef.name;
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //str += getEnemyFromId(dl[t].objectId).name + ": " + nFormatter(getEnemyFromId(dl[t].objectId).totalKill) + "/" + nFormatter(dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + nFormatter(dl[t].objectRef.totalKill) + "/" + nFormatter(dl[t].amount) + "<br />";
        }
        else
            str += "???";
    }

    return str;
}

function dataLinksToStringOneAvailableLine(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (t > 0)
            str += ", ";

        var amt, needed, name;

        if (dl[t].typeId == DLTYPE_RESOURCE) {
            //amt = getResourceFromId(dl[t].objectId).amount;
            amt = dl[t].objectRef.amount;
            needed = dl[t].amount;
            //name = getResourceFromId(dl[t].objectId).name;
            name = dl[t].objectRef.name;
        }
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //amt = getEnemyFromId(dl[t].objectId).totalKill;
            amt = dl[t].objectRef.totalKill;
            needed = dl[t].amount;
            //name = getEnemyFromId(dl[t].objectId).name;
            name = dl[t].objectRef.name;
        }
        else
            str += "???";

        if (amt < needed)
            str += "<span style='color: lightgray;'>" + nFormatter(amt) + "/" + nFormatter(needed) + " " + name + "</span>";
        else
            str += "<span>" + nFormatter(amt) + "/" + nFormatter(needed) + " " + name + "</span>";
    }

    return str;
}

function dataLinksToStringRequirementVertical(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (t > 0)
            str += "<br />";

        var amt, needed, name;

        if (dl[t].typeId == DLTYPE_RESOURCE) {
            //amt = getResourceFromId(dl[t].objectId).amount;
            amt = dl[t].objectRef.amount;
            needed = dl[t].amount;
            //name = getResourceFromId(dl[t].objectId).name;
            name = dl[t].objectRef.name;
        }
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //amt = getEnemyFromId(dl[t].objectId).totalKill;
            amt = dl[t].objectRef.totalKill;
            needed = dl[t].amount;
            //name = getEnemyFromId(dl[t].objectId).name;
            name = dl[t].objectRef.name;
        }
        else
            str += "???";

        if (amt < needed)
            str += name + ": <span style='color: lightgray;'>" + nFormatter(amt) + "/" + nFormatter(needed) + "</span>";
        else
            str += name + ": <span>" + nFormatter(amt) + "/" + nFormatter(needed) + "</span>";
    }

    return str;
}