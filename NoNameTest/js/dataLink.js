var DL_CAT =
    [
        {
            p: "adventure", c: ["maxDistance", "currentDistance", "isActive"]},
        { p: "resource", c: ["amount"]},
        { p: "building", c: ["available", "buildAmount"]},
        { p: "quest", c: ["isActivated"] },
        { p: "playerSkills", c: ["level", "isActive"] },
        { p: "other", c: ["startAdventure"] },
        { p: "buildingMap", c: ["isActive"] }
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
        if (this.subCategory == "currentDistance") {
            return getMapAdventureFromId(this.entityId).currentDistance;
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
            return getBuildingFromId(this.entityId).buildingInstances.length;
        }
    } 
    if (this.category == "quest") {
        if (this.subCategory == "isActivated") {
            return getQuestFromId(this.entityId).isActivated;
        }
    }
    if (this.category == "playerSkills") {
        if (this.subCategory == "level") {
            return currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).level;
        }
    }
}

dataLink.prototype.getDataName = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            return getMapAdventureFromId(this.entityId).name + " Maximum Walking Distance";
        }
        if (this.subCategory == "currentDistance") {
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
    if (this.category == "playerSkills") {
        if (this.subCategory == "level") {
            return getSkillFromId(currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).skillId).name + " Level";
        }
    }
    
    return "";
}

dataLink.prototype.processDataLink = function (v) {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            //return getMapAdventureFromId(this.entityId).name + " Walking Distance";
        }
        if (this.subCategory == "currentDistance") {
            //return getMapAdventureFromId(this.entityId).name + " Walking Distance";
        }
        if (this.subCategory == "isActive") {
            if (v == 1)
                getMapAdventureFromId(this.entityId).isActive = true;
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
    if (this.category == "playerSkills") {
        if (this.subCategory == "isActive") {
            if (v == 1)
                currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).isActive = true;
        }
    }
    if (this.category == "buildingMap") {
        if (this.subCategory == "isActive") {
            if (v == 1)
                getMapBuildingFromId(this.entityId).isActive = true;
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