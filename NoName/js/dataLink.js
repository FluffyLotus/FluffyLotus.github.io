var DL_CAT = ["adventure"];
var DL_SUBCAT = ["maxDistance"];

function dataLink() {
    this.category = "";
    this.subCategory = "";
    this.entityId = 0;
    this.amount = 0;
}

dataLink.prototype.getCurrentValue = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            return mapAdventures[this.entityId].maxDistance;
        }
    }
}

dataLink.prototype.getNeededValue = function () {
    return this.amount;
}

dataLink.prototype.getDataName = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            return "Walking Distance";
        }
    }

    return "";
}

dataLink.prototype.hasDataLink = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            if (this.getCurrentValue() >= this.getNeededValue())
                return true;
        }
    }

    return false;
}

function createDataLink(cat, subCat, eId, amount) {
    var ret = new dataLink();

    ret.category = cat;
    ret.subCategory = subCat;
    ret.entityId = eId;
    ret.amount = amount;

    return ret;
}

function hasDataLink(links) {
    for (var t = 0; t < links.length; t++) {
        if (!links[t].hasDataLink())
            return false;
    }

    return true;
}