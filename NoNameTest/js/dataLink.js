var DL_CAT =
    [
        { p: "adventure", c: ["maxDistance"]},
        { p: "resource", c: ["amount"]},
        { p: "building", c: ["available", "buildAmount"]},
        { p: "quest", c: ["isActivated"]},
        { p: "other", c: ["startAdventure"]}
    ];

function dataLink() {
    this.category = "";
    this.subCategory = "";
    this.entityId = 0;
    this.amount = 0;
}

dataLink.prototype.getCurrentValue = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            return getMapAdventureFromId(this.entityId).maxDistance;
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            return getResourceFromId(this.entityId).amount;
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "available") {
            return getBuildingFromId(this.entityId).available;
        }
        if (this.subCategory == "buildAmount") {
            return getBuildingFromId(this.entityId).buildAmount;
        }
    } 
    if (this.category == "quest") {
        if (this.subCategory == "isActivated") {
            return getQuestFromId(this.entityId).isActivated;
        }
    }
}

dataLink.prototype.getDataName = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            return getMapAdventureFromId(this.entityId).name + " Walking Distance";
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            return getResourceFromId(this.entityId).name + " Amount";
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "buildAmount") {
            return getBuildingFromId(this.entityId).name + " Builded";
        }
    }
    //if (this.category == "quest") {
    //    if (this.subCategory == "isActivated") {
    //        return getQuestFromId(this.entityId).isActivated;
    //    }
    //}
    
    return "";
}

dataLink.prototype.processDataLink = function (v) {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            //return getMapAdventureFromId(this.entityId).name + " Walking Distance";
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            getResourceFromId(this.entityId).addAmount(v);
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "available") {
            if(v == 1)
                getBuildingFromId(this.entityId).available = true;
            else
                getBuildingFromId(this.entityId).available = false;
        }
    }
    if (this.category == "quest") {
        if (this.subCategory == "isActivated") {
            if (v == 1)
                getQuestFromId(this.entityId).setAsActive();
        }
    }
    if (this.category == "other") {
        if (this.subCategory == "startAdventure") {
            if (v == 1)
                currentMapAdventure.canRun = true;
        }
    }
}

dataLink.prototype.removeDataLink = function () {
    this.processDataLink(-this.amount);
}

dataLink.prototype.addDataLink = function () {
    this.processDataLink(this.amount);
}

dataLink.prototype.getNeededValue = function () {
    return this.amount;
}

dataLink.prototype.hasDataLink = function () {
    if (this.getCurrentValue() >= this.getNeededValue())
        return true;

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

function removeDataLink(links) {
    for (var t = 0; t < links.length; t++) {
        links[t].removeDataLink();
    }
}

function addDataLink(links) {
    for (var t = 0; t < links.length; t++) {
        links[t].addDataLink();
    }
}