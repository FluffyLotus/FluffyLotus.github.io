var ENEMY_BUNNY = 0;
var ENEMY_RAT = 1;
var ENEMY_DEVIL = 2;

function enemyInformation() {
    this.id = 0;
    this.name = "";
    this.baseVitality = 0;
    this.baseStrength = 0
    this.baseDefence = 0;
    this.mulVitality = 0;
    this.mulStrength = 0;
    this.mulDefence = 0;

    this.deathCount = []; // How many time it died
    this.killCount = 0; // How many time it killed something
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
}

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

    enemies[1] = new enemyInformation();
    enemies[1].id = 1;
    enemies[1].name = "Evil Rat";
    enemies[1].baseVitality = 50;
    enemies[1].baseStrength = 10;
    enemies[1].baseDefence = 0;
    enemies[1].mulVitality = 10;
    enemies[1].mulStrength = 10;
    enemies[1].mulDefence = 10;

    enemies[2] = new enemyInformation();
    enemies[2].id = 1;
    enemies[2].name = "Devil";
    enemies[2].baseVitality = 50;
    enemies[2].baseStrength = 10;
    enemies[2].baseDefence = 0;
    enemies[2].mulVitality = 20;
    enemies[2].mulStrength = 15;
    enemies[2].mulDefence = 10;
}