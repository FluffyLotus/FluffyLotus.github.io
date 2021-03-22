var DL_CAT =
    [
        {
            p: "adventure", c: ["maxDistance", "currentDistance", "isActive"]
        },
        { p: "resource", c: ["amount"] },
        { p: "building", c: ["available", "buildAmount"] },
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

    this.entityRef = null;
}

dataLink.prototype.getCurrentValue = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            //return getMapAdventureFromId(this.entityId).maxDistance;
            return this.entityRef.maxDistance;
        }
        if (this.subCategory == "currentDistance") {
            //return getMapAdventureFromId(this.entityId).currentDistance;
            return this.entityRef.currentDistance;
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            //return getResourceFromId(this.entityId).amount;
            return this.entityRef.amount;
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "available") {
            //return getBuildingFromId(this.entityId).available;
            return this.entityRef.available;
        }
        if (this.subCategory == "buildAmount") {
            //return getBuildingFromId(this.entityId).buildingInstances.length;
            return this.entityRef.buildingInstances.length;
        }
    }
    if (this.category == "quest") {
        if (this.subCategory == "isActivated") {
            //return getQuestFromId(this.entityId).isActivated;
            return this.entityRef.isActivated;
        }
    }
    if (this.category == "playerSkills") {
        if (this.subCategory == "level") {
            //return currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).level;
            return this.entityRef.level;
        }
    }
}

dataLink.prototype.getDataName = function () {
    if (this.category == "adventure") {
        if (this.subCategory == "maxDistance") {
            //return getMapAdventureFromId(this.entityId).name + " Maximum Walking Distance";
            return this.entityRef.name + " Maximum Walking Distance";
        }
        if (this.subCategory == "currentDistance") {
            //return getMapAdventureFromId(this.entityId).name + " Walking Distance";
            return this.entityRef.name + " Walking Distance";
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            //return getResourceFromId(this.entityId).name + " Amount";
            return this.entityRef.name + " Amount";
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "buildAmount") {
            //return getBuildingFromId(this.entityId).name + " Builded";
            return this.entityRef.name + " Builded";
        }
    }
    //if (this.category == "quest") {
    //    if (this.subCategory == "isActivated") {
    //        return getQuestFromId(this.entityId).isActivated;
    //    }
    //}
    if (this.category == "playerSkills") {
        if (this.subCategory == "level") {
            //return getSkillFromId(currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).skillId).name + " Level";
            return this.entityRef.skillRef.name + " Level";
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
                //getMapAdventureFromId(this.entityId).isActive = true;
                this.entityRef.isActive = true;
        }
    }
    if (this.category == "resource") {
        if (this.subCategory == "amount") {
            //getResourceFromId(this.entityId).addAmount(v);
            this.entityRef.addAmount(v);
        }
    }
    if (this.category == "building") {
        if (this.subCategory == "available") {
            if (v == 1)
                //getBuildingFromId(this.entityId).available = true;
                this.entityRef.available = true;
            else
                //getBuildingFromId(this.entityId).available = false;
                this.entityRef.available = false;
        }
    }
    if (this.category == "quest") {
        if (this.subCategory == "isActivated") {
            if (v == 1)
                //getQuestFromId(this.entityId).setAsActive();
                this.entityRef.setAsActive();
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
                //currentMapAdventure.currentPlayer.getSkillInstance(this.entityId).isActive = true;
                this.entityRef.isActive = true;
        }
    }
    if (this.category == "buildingMap") {
        if (this.subCategory == "isActive") {
            if (v == 1)
                //getMapBuildingFromId(this.entityId).isActive = true;
                this.entityRef.isActive = true;
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

function setRefDataLink(links) {
    if (links == null)
        return;

    for (var t = 0; t < links.length; t++) {
        if (links[t].category == "adventure")
            links[t].entityRef = getMapAdventureFromId(links[t].entityId);
        if (links[t].category == "resource")
            links[t].entityRef = getResourceFromId(links[t].entityId);
        if (links[t].category == "building")
            links[t].entityRef = getBuildingFromId(links[t].entityId);
        if (links[t].category == "quest")
            links[t].entityRef = getQuestFromId(links[t].entityId);
        if (links[t].category == "playerSkills")
            links[t].entityRef = currentMapAdventure.currentPlayer.getSkillInstance(links[t].entityId);
        //if (links[t].category == "other")
        //    links[t].entityRef = currentMapAdventure;
        if (links[t].category == "buildingMap")
            links[t].entityRef = getMapBuildingFromId(links[t].entityId);
    }
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