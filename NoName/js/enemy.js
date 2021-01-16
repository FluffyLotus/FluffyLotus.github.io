var ENEMY_BUNNY = 0;
var ENEMY_RAT = 1;
var ENEMY_DEVIL = 2;
var ENEMY_BEAR = 3;
var ENEMY_BIRD = 4;
var ENEMY_DOG = 5;
var ENEMY_PIG = 6;
var ENEMY_WOLF = 7;

function enemyInformation() {
    this.id = 0;
    this.name = "";
    this.baseVitality = 0;
    this.baseStrength = 0
    this.baseDefence = 0;
    this.mulVitality = 0;
    this.mulStrength = 0;
    this.mulDefence = 0;

    this.totalDeath = 0;
    this.deathCount = []; // How many time it died
    this.killCount = 0; // How many time it killed something

    this.cardGiven = 0;
}

enemyInformation.prototype.getVitality = function (level) {
    return this.baseVitality + (level - 1) * this.mulVitality;
}

enemyInformation.prototype.getStrength = function (level) {
    return this.baseStrength + (level - 1) * this.mulStrength;
}

enemyInformation.prototype.getDefence = function (level) {
    return this.baseDefence + (level - 1) * this.mulDefence;
}

enemyInformation.prototype.processDeath = function (level) {
    if (this.deathCount[level] == null)
        this.deathCount[level] = 1;
    else
        this.deathCount[level] += 1;

    this.totalDeath += 1;
}
/*
enemyInformation.prototype.experienceGiven = function (level) {
    var dc = this.deathCount[level];
    var xp = 10;

    if (dc == null)
        dc = 0;

    while (dc > 50) {
        dc -= 50;
        xp /= 2;
    }

    return xp;
}
*/
function loadEnemies() {
    enemies[0] = new enemyInformation();
    enemies[0].id = 0;
    enemies[0].name = "Evil Bunny";
    enemies[0].baseVitality = 30;
    enemies[0].baseStrength = 10;
    enemies[0].baseDefence = 0;
    enemies[0].mulVitality = 10;
    enemies[0].mulStrength = 10;
    enemies[0].mulDefence = 0;
    enemies[0].cardGiven = CARD_RABBIT;
    
    enemies[1] = new enemyInformation();
    enemies[1].id = 1;
    enemies[1].name = "Evil Rat";
    enemies[1].baseVitality = 50;
    enemies[1].baseStrength = 10;
    enemies[1].baseDefence = 0;
    enemies[1].mulVitality = 10;
    enemies[1].mulStrength = 10;
    enemies[1].mulDefence = 10;
    enemies[1].cardGiven = CARD_RAT;

    enemies[2] = new enemyInformation();
    enemies[2].id = 1;
    enemies[2].name = "Devil";
    enemies[2].baseVitality = 50;
    enemies[2].baseStrength = 10;
    enemies[2].baseDefence = 0;
    enemies[2].mulVitality = 20;
    enemies[2].mulStrength = 15;
    enemies[2].mulDefence = 10;
    enemies[2].cardGiven = CARD_DEVIL;

    enemies[3] = new enemyInformation();
    enemies[3].id = 3;
    enemies[3].name = "Bear";
    enemies[3].baseVitality = 50;
    enemies[3].baseStrength = 10;
    enemies[3].baseDefence = 0;
    enemies[3].mulVitality = 20;
    enemies[3].mulStrength = 15;
    enemies[3].mulDefence = 10;
    enemies[3].cardGiven = CARD_BEAR;

    enemies[4] = new enemyInformation();
    enemies[4].id = 4;
    enemies[4].name = "Bird";
    enemies[4].baseVitality = 50;
    enemies[4].baseStrength = 10;
    enemies[4].baseDefence = 0;
    enemies[4].mulVitality = 20;
    enemies[4].mulStrength = 15;
    enemies[4].mulDefence = 10;
    enemies[4].cardGiven = CARD_BIRD;

    enemies[5] = new enemyInformation();
    enemies[5].id = 5;
    enemies[5].name = "Dog";
    enemies[5].baseVitality = 50;
    enemies[5].baseStrength = 10;
    enemies[5].baseDefence = 0;
    enemies[5].mulVitality = 20;
    enemies[5].mulStrength = 15;
    enemies[5].mulDefence = 10;
    enemies[5].cardGiven = CARD_DOG;

    enemies[6] = new enemyInformation();
    enemies[6].id = 6;
    enemies[6].name = "Pig";
    enemies[6].baseVitality = 50;
    enemies[6].baseStrength = 10;
    enemies[6].baseDefence = 0;
    enemies[6].mulVitality = 20;
    enemies[6].mulStrength = 15;
    enemies[6].mulDefence = 10;
    enemies[6].cardGiven = CARD_PIG;

    enemies[7] = new enemyInformation();
    enemies[7].id = 7;
    enemies[7].name = "Wolf";
    enemies[7].baseVitality = 50;
    enemies[7].baseStrength = 10;
    enemies[7].baseDefence = 0;
    enemies[7].mulVitality = 20;
    enemies[7].mulStrength = 15;
    enemies[7].mulDefence = 10;
    enemies[7].cardGiven = CARD_WOLF;
}