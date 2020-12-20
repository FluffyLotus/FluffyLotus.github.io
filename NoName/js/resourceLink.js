function resourceLink() {
    this.resourceId = 0;
    this.formulaA = 0;
    this.formulaB = 0;
    this.formulaC = 0;
    this.chance = 1;
}

resourceLink.prototype.getAmount = function (x) {
    return this.formulaA + x * this.formulaB + x * x * this.formulaC;
}

resourceLink.prototype.hasResource = function (x) {
    return resources[this.resourceId].amount >= this.getAmount(x);
}

resourceLink.prototype.removeResource = function (x) {
    return resources[this.resourceId].addAmount(-this.getAmount(x));
}

resourceLink.prototype.addResource = function (x) {
    return resources[this.resourceId].addAmount(this.getAmount(x));
}

resourceLink.prototype.gotChance = function () {
    if (this.chance == 1)
        return true;
    return Math.random() <= this.chance;
}

function createResourceLink(resourceId, formulaA, formulaB, formulaC, chance) {
    var item = new resourceLink();

    item.resourceId = resourceId;
    item.formulaA = formulaA;
    item.formulaB = formulaB;
    item.formulaC = formulaC;
    item.chance = chance;

    return item;
}

function hasResourceLink(links, x) {
    for (var t = 0; t < links.length; t++) {
        if (!links[t].hasResource(x))
            return false;
    }

    return true;
}

function removeResourceLink(links, x) {
    for (var t = 0; t < links.length; t++) {
        if (links[t].gotChance())
            links[t].removeResource(x);
    }
}

function addResourceLink(links, x) {
    for (var t = 0; t < links.length; t++) {
        if (links[t].gotChance())
            links[t].addResource(x);
    }
}

function getResourceLinkString(links, x) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        if (str != "")
            str += ", ";

        str += links[t].getAmount(x) + " " + resources[links[t].resourceId].name;
    }

    return str;
}