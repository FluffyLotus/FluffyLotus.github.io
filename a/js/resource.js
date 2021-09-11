var resources = [];

var RESOURCE_WOOD = 0;
var RESOURCE_STONE = 1;
//var RESOURCE_KILL = 2;
//var RESOURCE_DEATH = 3;
//var RESOURCE_FLOWER = 4;
//var RESOURCE_FISH = 5;
//var RESOURCE_PLANK = 6;
//var RESOURCE_COAL = 7;
//var RESOURCE_BLOCK = 8;
//var RESOURCE_FRUIT = 9;

function ResourceInfo() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.alwaysHidden = false;
    this.amount = 0;
    this.deltaAmount = 0;

    this.totalAmount = 0;
}

ResourceInfo.prototype.isVisible = function () {
    if (this.alwaysHidden)
        return false;
    if (this.totalAmount > 0)
        return true;
    return false;
}

ResourceInfo.prototype.addAmount = function (a) {
    this.amount += a;
    this.deltaAmount += a;

    if (a > 0)
        this.totalAmount += a;
}

function getResourceFromId(id) {
    for (var i = 0; i < resources.length; i++) {
        if (resources[i].id == id)
            return resources[i];
    }

    return null;
}

function resetResourceDelta() {
    if (mainTimer.canExecute(1000)) {
        for (var i = 0; i < resources.length; i++) {
            resources[i].deltaAmount = 0;
        }
    }
}

function initResource() {
    for (var t = 0; t < resourceData.length; t++) {
        var item = new ResourceInfo();

        item.id = resourceData[t].id;
        item.name = resourceData[t].n;
        item.description = resourceData[t].d;
        item.alwaysHidden = resourceData[t].ah;
        resources.push(item);
    }
}

function finishInitResource() {
}