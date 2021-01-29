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
    resources[0] = new resourceInformation();
    resources[0].id = 0;
    resources[0].name = "Wood";

    resources[1] = new resourceInformation();
    resources[1].id = 1;
    resources[1].name = "Stone";

    resources[2] = new resourceInformation();
    resources[2].id = 2;
    resources[2].name = "Green Mana";

    resources[3] = new resourceInformation();
    resources[3].id = 3;
    resources[3].name = "Plank";

    resources[4] = new resourceInformation();
    resources[4].id = 4;
    resources[4].name = "Blue Mana";

    resources[5] = new resourceInformation();
    resources[5].id = 5;
    resources[5].name = "Green Essence";

    resources[6] = new resourceInformation();
    resources[6].id = 6;
    resources[6].name = "Blue Essence";

    resources[7] = new resourceInformation();
    resources[7].id = 7;
    resources[7].name = "Red Essence";

    resources[8] = new resourceInformation();
    resources[8].id = 8;
    resources[8].name = "Red Mana";

    resources[9] = new resourceInformation();
    resources[9].id = 9;
    resources[9].name = "Time Essence";

    resources[10] = new resourceInformation();
    resources[10].id = 10;
    resources[10].name = "Coal";

    resources[11] = new resourceInformation();
    resources[11].id = 11;
    resources[11].name = "Block";

    resources[12] = new resourceInformation();
    resources[12].id = 12;
    resources[12].name = "Ore";

    resources[13] = new resourceInformation();
    resources[13].id = 13;
    resources[13].name = "Iron";

    resources[14] = new resourceInformation();
    resources[14].id = 14;
    resources[14].name = "Energy";

    resources[15] = new resourceInformation();
    resources[15].id = 15;
    resources[15].name = "Gear";

    resources[16] = new resourceInformation();
    resources[16].id = 16;
    resources[16].name = "Time Mana";
}