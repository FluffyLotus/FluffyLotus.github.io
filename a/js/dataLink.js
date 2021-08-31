var DLTYPE_RESOURCE = 0;
var DLTYPE_MAP = 1;
var DLTYPE_BUILDING = 2;
var DLTYPE_ENEMY = 3;

var DLSUBTYPE_AMOUNT = 0;
var DLSUBTYPE_ACTIVE = 1;
var DLSUBTYPE_VISIBLE = 2;
var DLSUBTYPE_KILL = 3;

function DataLinkInfo() {
    this.typeId = -1;
    this.subTypeId = -1;

    this.objectId = 0;
    this.amount = 0;
}

function duplicateDataLink(srcDl) {
    var dl = new DataLinkInfo();

    dl.typeId = srcDl.typeId;
    dl.subTypeId = srcDl.subTypeId;
    dl.objectId = srcDl.objectId;
    dl.amount = srcDl.amount;

    return dl;
}

function createDataLink(typeId, subTypeId, objectId, amount) {
    var dl = new DataLinkInfo();

    dl.typeId = typeId;
    dl.subTypeId = subTypeId;
    dl.objectId = objectId;
    dl.amount = amount;

    return dl;
}

function createDataLink_ResourceAmount(objectId, amount) {
    return createDataLink(DLTYPE_RESOURCE, DLSUBTYPE_AMOUNT, objectId, amount);
}

function hasDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            if (getResourceFromId(link.objectId).amount >= link.amount)
                return true;
        }
    }
    if (link.typeId == DLTYPE_ENEMY) {
        if (link.subTypeId ==DLSUBTYPE_KILL) {
            if (getEnemyFromId(link.objectId).totalKill >= link.amount)
                return true;
        }
    }

    return false;
}

function removeDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            getResourceFromId(link.objectId).addAmount(-link.amount);
        }
    }
}

function addDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            getResourceFromId(link.objectId).addAmount(link.amount);
        }
    }
    if (link.typeId == DLTYPE_MAP) {
        if (link.subTypeId == DLSUBTYPE_ACTIVE) {
            getMapFromId(link.objectId).active = (link.amount == 1);
        }
    }
    if (link.typeId == DLTYPE_BUILDING) {
        if (link.subTypeId == DLSUBTYPE_VISIBLE) {
            getBuildingFromId(link.objectId).isVisible = (link.amount == 1);
        }
    }
}

////

function duplicateDataLinks(srcDls) {
    var ret = [];

    for (var i = 0; i < srcDls.length; i++)
        ret.push(duplicateDataLink(srcDls[i]));

    return ret;
}

function hasDataLinks(links) {
    for (var t = 0; t < links.length; t++) {
        if (!hasDataLink(links[t]))
            return false;
    }

    return true;
}

function removeDataLinks(links) {
    for (var t = 0; t < links.length; t++) {
        removeDataLink(links[t]);
    }
}

function addDataLinks(links) {
    for (var t = 0; t < links.length; t++) {
        addDataLink(links[t]);
    }
}