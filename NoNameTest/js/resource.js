var RESOURCE_WOOD = 0
var RESOURCE_STONE = 1
var RESOURCE_GREENMANA = 2;
var RESOURCE_PLANK = 3;
var RESOURCE_BLUEMANA = 4;
var RESOURCE_GREENESSENCE = 5;
var RESOURCE_BLUEESSENCE = 6;
var RESOURCE_REDESSENCE = 7;
var RESOURCE_REDMANA = 8;
var RESOURCE_TIMEESSENCE = 9;
var RESOURCE_COAL = 10;
var RESOURCE_BLOCK = 11;
var RESOURCE_ORE = 12;
var RESOURCE_IRON = 13;
var RESOURCE_ENERGY = 14;
var RESOURCE_GEAR = 15;
var RESOURCE_TIMEMANA = 16;
var RESOURCE_SHARD = 17;
var RESOURCE_MAGICSPACE = 18;
var RESOURCE_DARKESSENCE = 19;
var RESOURCE_LIGHTESSENCE = 20;

function resourceInformation() {
    this.id = 0;
    this.name = "";
    this.amount = 0;
    this.isSpecial = false; // Resource needed for a short period of time

    this.maxAmount = 0;
    this.totalAmount = 0;

    this.tickDelta = 0;
}

resourceInformation.prototype.prepareTick = function () {
    this.tickDelta = 0;
}

resourceInformation.prototype.addAmount = function (a) {
    this.amount += a;
    this.tickDelta += a;

    if (a > 0)
        this.totalAmount += a;
    if (this.amount > this.maxAmount)
        this.maxAmount = this.amount;
}

resourceInformation.prototype.isVisible = function () {
    if (this.isSpecial)
        return this.amount > 0;
    return this.maxAmount > 0;
}

function getResourceFromId(id) {
    for (var t = 0; t < resources.length; t++) {
        if (resources[t].id == id)
            return resources[t];
    }

    return null;
}

function loadResources() {
    var newItem;

    newItem = new resourceInformation();
    newItem.id = 0;
    newItem.name = "Wood";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 1;
    newItem.name = "Stone";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 2;
    newItem.name = "Green Mana";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 3;
    newItem.name = "Plank";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 4;
    newItem.name = "Blue Mana";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 5;
    newItem.name = "Green Essence";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 6;
    newItem.name = "Blue Essence";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 7;
    newItem.name = "Red Essence";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 8;
    newItem.name = "Red Mana";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 9;
    newItem.name = "Time Essence";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 10;
    newItem.name = "Coal";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 11;
    newItem.name = "Block";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 12;
    newItem.name = "Ore";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 13;
    newItem.name = "Iron";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 14;
    newItem.name = "Energy";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 15;
    newItem.name = "Gear";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 16;
    newItem.name = "Time Mana";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 17;
    newItem.name = "Soul Shard";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 18;
    newItem.name = "Magic Space";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 19;
    newItem.name = "Dark Mana";
    resources.push(newItem);

    newItem = new resourceInformation();
    newItem.id = 20;
    newItem.name = "Light Mana";
    resources.push(newItem);
}