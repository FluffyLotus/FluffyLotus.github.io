var CARD_RABBIT = 0;
var CARD_RAT = 1;
var CARD_DEVIL = 2;

function cardInformation() {
    this.id = 0;
    this.name = "";
    this.amount = 0;
    this.description = 0;

    this.level = 0;
}

cardInformation.prototype.getAmountNeeded = function () {
    return 100;
}

cardInformation.prototype.getCurrentLevelAmount = function () {
    return this.amount;
}

cardInformation.prototype.getCurrentLevel = function () {
    return this.level;
}

cardInformation.prototype.canUpgrade = function () {
    if (this.amount >= 100)
        return true;
    return false;
}

cardInformation.prototype.upgrade = function () {
    if (!this.canUpgrade())
        return;

    this.amount = 0;
    this.level += 1;
}

function loadCards() {
    cards[0] = new cardInformation();
    cards[0].id = 0;
    cards[0].name = "Bunny";
    cards[0].description = "Each level increase attack by 5.";

    cards[1] = new cardInformation();
    cards[1].id = 1
    cards[1].name = "Rat";
    cards[1].description = "Each level increase vitality by 50.";

    cards[2] = new cardInformation();
    cards[2].id = 2;
    cards[2].name = "Devil";
    cards[2].description = "Each level increase defence by 5.";
}