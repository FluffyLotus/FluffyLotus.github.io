function resourceLink() {
    this.resourceId = 0;
    this.formula = null;
    this.chance = 1;
}

resourceLink.prototype.getAmount = function (x, extraMul = 1) {
    return (this.formula.getResult(x) * extraMul);
}

resourceLink.prototype.hasResource = function (x, extraMul = 1) {
    return getResourceFromId(this.resourceId).amount >= this.getAmount(x, extraMul);
}

resourceLink.prototype.removeResource = function (x, extraMul = 1) {
    return getResourceFromId(this.resourceId).addAmount(-this.getAmount(x, extraMul));
}

resourceLink.prototype.addResource = function (x, extraMul = 1) {
    return getResourceFromId(this.resourceId).addAmount(this.getAmount(x, extraMul));
}

resourceLink.prototype.gotChance = function () {
    if (this.chance == 1)
        return true;
    return Math.random() <= this.chance;
}

function createResourceLink(resourceId, formula, chance) {
    var item = new resourceLink();

    item.resourceId = resourceId;
    item.formula = formula;
    item.chance = chance;

    return item;
}

function hasResourceLink(links, x, extraMul = 1) {
    for (var t = 0; t < links.length; t++) {
        if (!links[t].hasResource(x, extraMul))
            return false;
    }

    return true;
}

function removeResourceLink(links, x, extraMul = 1) {
    for (var t = 0; t < links.length; t++) {
        if (links[t].gotChance())
            links[t].removeResource(x, extraMul);
    }
}

function addResourceLink(links, x, extraMul = 1) {
    for (var t = 0; t < links.length; t++) {
        if (links[t].gotChance())
            links[t].addResource(x, extraMul);
    }
}

function getResourceLinkString(links, x, extraMul = 1) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        if (str != "")
            str += ", ";

        str += nFormatter(links[t].getAmount(x, extraMul)) + " " + getResourceFromId(links[t].resourceId).name;
    }

    return str;
}