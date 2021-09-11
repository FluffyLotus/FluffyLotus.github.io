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

    this.objectRef = null;
}

function duplicateDataLink(srcDl) {
    var dl = new DataLinkInfo();

    dl.typeId = srcDl.typeId;
    dl.subTypeId = srcDl.subTypeId;
    dl.objectId = srcDl.objectId;
    dl.amount = srcDl.amount;

    dl.objectRef = srcDl.objectRef;

    return dl;
}

function createDataLink(typeId, subTypeId, objectId, amount) {
    var dl = new DataLinkInfo();

    dl.typeId = typeId;
    dl.subTypeId = subTypeId;
    dl.objectId = objectId;
    dl.amount = amount;

    finishDataLinkInit(dl);

    return dl;
}

function createDataLink_ResourceAmount(objectId, amount) {
    return createDataLink(DLTYPE_RESOURCE, DLSUBTYPE_AMOUNT, objectId, amount);
}

function hasDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            if (link.objectRef.amount >= link.amount)
                return true;
        }
    }
    if (link.typeId == DLTYPE_ENEMY) {
        if (link.subTypeId ==DLSUBTYPE_KILL) {
            if (link.objectRef.totalKill >= link.amount)
                return true;
        }
    }

    return false;
}

function removeDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            link.objectRef.addAmount(-link.amount);
        }
    }
}

function addDataLink(link) {
    if (link.typeId == DLTYPE_RESOURCE) {
        if (link.subTypeId == DLSUBTYPE_AMOUNT) {
            link.objectRef.addAmount(link.amount);
        }
    }
    if (link.typeId == DLTYPE_MAP) {
        if (link.subTypeId == DLSUBTYPE_ACTIVE) {
            link.objectRef.active = (link.amount == 1);
        }
    }
    if (link.typeId == DLTYPE_BUILDING) {
        if (link.subTypeId == DLSUBTYPE_VISIBLE) {
            link.objectRef.isVisible = (link.amount == 1);
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

/////////

function finishDataLinkInit(link) {
    if (link.typeId == DLTYPE_RESOURCE)
        link.objectRef = getResourceFromId(link.objectId);
    if (link.typeId == DLTYPE_MAP)
        link.objectRef = getMapFromId(link.objectId);
    if (link.typeId == DLTYPE_BUILDING)
        link.objectRef = getBuildingFromId(link.objectId);
    if (link.typeId == DLTYPE_ENEMY)
        link.objectRef = getEnemyFromId(link.objectId);
}

function finishDataLinksInit(links) {
    for (var t = 0; t < links.length; t++) {
        finishDataLinkInit(links[t]);
    }
}