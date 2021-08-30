var resources = [];

var RESOURCE_WOOD = 0;
var RESOURCE_STONE = 1;
var RESOURCE_KILL = 2;
var RESOURCE_DEATH = 3;
var RESOURCE_FLOWER = 4;
var RESOURCE_FISH = 5;
var RESOURCE_PLANK = 6;
var RESOURCE_COAL = 7;
var RESOURCE_BLOCK = 8;

function ResourceInfo() {
    this.id = 0;
    this.name = "";
    this.amount = 0;
    this.deltaAmount = 0;
}

ResourceInfo.prototype.isVisible = function () {
    if (this.amount > 0)
        return true;
    return false;
}

ResourceInfo.prototype.addAmount = function (a) {
    this.amount += a;
    this.deltaAmount += a;
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
    var item;

    item = new ResourceInfo();
    item.id = 0;
    item.name = "Wood";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 1;
    item.name = "Stone";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 2;
    item.name = "Kill";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 3;
    item.name = "Death";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 4;
    item.name = "Flower";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 5;
    item.name = "Fish";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 6;
    item.name = "Plank";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 7;
    item.name = "Coal";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 8;
    item.name = "Block";
    resources.push(item);
}