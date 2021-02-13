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
}

enemyInformation.prototype.getShardCount = function () {
    var ret = 0;

    for (var k in this.deathCount) {
        if (this.deathCount.hasOwnProperty(k)) {
            var needed = 100;

            value = parseInt(this.deathCount[k]);

            while (value >= needed) {
                ret += 1;
                value -= needed;
                needed *= 4;
            }
        }
    }

    return ret;
}

enemyInformation.prototype.getNextShard = function () {
    var ret = "";

    for (var k in this.deathCount) {
        if (this.deathCount.hasOwnProperty(k)) {
            var needed = 100;

            value = parseInt(this.deathCount[k]);

            while (value >= needed) {
                value -= needed;
                needed *= 4;
            }

            if (ret != "")
                ret += ", ";

            ret += k + ": " + parseInt(value * 100 / needed) + "%";
        }
    }

    return ret;
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

    if (this.deathCount[level] == 100 || this.deathCount[level] == 400 || this.deathCount[level] == 1600 || this.deathCount[level] == 6400)
        getResourceFromId(RESOURCE_SHARD).addAmount(1);

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

function getEnemyFromId(id) {
    for (var t = 0; t < enemies.length; t++) {
        if (enemies[t].id == id)
            return enemies[t];
    }

    return null;
}

function loadEnemies() {
    var newItem;

    newItem = new enemyInformation();
    newItem.id = 0;
    newItem.name = "Evil Bunny";
    newItem.baseVitality = 30;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 10;
    newItem.mulStrength = 10;
    newItem.mulDefence = 0;
    enemies.push(newItem);
    
    newItem = new enemyInformation();
    newItem.id = 1;
    newItem.name = "Evil Rat";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 10;
    newItem.mulStrength = 10;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 1;
    newItem.name = "Devil";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 3;
    newItem.name = "Bear";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 4;
    newItem.name = "Bird";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 5;
    newItem.name = "Dog";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 6;
    newItem.name = "Pig";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);

    newItem = new enemyInformation();
    newItem.id = 7;
    newItem.name = "Wolf";
    newItem.baseVitality = 50;
    newItem.baseStrength = 10;
    newItem.baseDefence = 0;
    newItem.mulVitality = 20;
    newItem.mulStrength = 15;
    newItem.mulDefence = 10;
    enemies.push(newItem);
}