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

    /*
    var item;

    item = new ResourceInfo();
    item.id = 0;
    item.name = "Wood";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 1;
    item.name = "Stone";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 2;
    item.name = "Kill";
    item.description = "";
    item.alwaysHidden = true;
    resources.push(item);

    item = new ResourceInfo();
    item.id = 3;
    item.name = "Death";
    item.description = "";
    item.alwaysHidden = true;
    resources.push(item);

    item = new ResourceInfo();
    item.id = 4;
    item.name = "Flower";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 5;
    item.name = "Fish";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 6;
    item.name = "Plank";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 7;
    item.name = "Coal";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 8;
    item.name = "Block";
    item.description = "";
    resources.push(item);

    item = new ResourceInfo();
    item.id = 9;
    item.name = "Fruit";
    item.description = "";
    resources.push(item);
    */
}

function finishInitResource() {
}