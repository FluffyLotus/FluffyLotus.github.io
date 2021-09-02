function nFormatter(x) {
    return x;
}

function dataLinksToString(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (dl[t].typeId == DLTYPE_RESOURCE)
            //str += getResourceFromId(dl[t].objectId).name + ": " + (dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + (dl[t].amount) + "<br />";
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //str += getEnemyFromId(dl[t].objectId).name + ": " + getEnemyFromId(dl[t].objectId).totalKill + "/" + (dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + dl[t].objectRef.totalKill + "/" + (dl[t].amount) + "<br />";
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
            str += dl[t].amount + " " + dl[t].objectRef.name;
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            //str += getEnemyFromId(dl[t].objectId).name + ": " + getEnemyFromId(dl[t].objectId).totalKill + "/" + (dl[t].amount) + "<br />";
            str += dl[t].objectRef.name + ": " + dl[t].objectRef.totalKill + "/" + (dl[t].amount) + "<br />";
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
            str += "<span style='color: lightgray;'>" + amt + "/" + needed + " " + name + "</span>";
        else
            str += "<span>" + amt + "/" + needed + " " + name + "</span>";
    }

    return str;
}