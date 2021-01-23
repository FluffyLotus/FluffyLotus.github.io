var CARD_RABBIT = 0;
var CARD_RAT = 1;
var CARD_DEVIL = 2;
var CARD_BEAR = 3;
var CARD_BIRD = 4;
var CARD_DOG = 5;
var CARD_PIG = 6;
var CARD_WOLF = 7;

function cardInformation() {
    this.id = 0;
    this.name = "";
    this.amount = 0;
    this.description = 0;

    this.level = 0;
}

cardInformation.prototype.isVisible = function () {
    for (var t = 0; t < enemies.length; t++) {
        if (enemies[t].cardGiven == this.id && enemies[t].totalDeath > 0)
            return true;
    }

    return false;
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

    cards[3] = new cardInformation();
    cards[3].id = 3;
    cards[3].name = "Bear";
    cards[3].description = "Nothing";

    cards[4] = new cardInformation();
    cards[4].id = 4;
    cards[4].name = "Bird";
    cards[4].description = "Nothing";

    cards[5] = new cardInformation();
    cards[5].id = 5;
    cards[5].name = "Dog";
    cards[5].description = "Nothing";

    cards[6] = new cardInformation();
    cards[6].id = 6;
    cards[6].name = "Pig";
    cards[6].description = "Nothing";

    cards[7] = new cardInformation();
    cards[7].id = 7;
    cards[7].name = "Wolf";
    cards[7].description = "Nothing";
}