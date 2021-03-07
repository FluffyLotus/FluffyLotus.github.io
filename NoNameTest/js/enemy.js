var ENEMY_BUNNY = 0;
var ENEMY_RAT = 1;
var ENEMY_DEVIL = 2;
var ENEMY_BEAR = 3;
var ENEMY_BIRD = 4;
var ENEMY_DOG = 5;
var ENEMY_PIG = 6;
var ENEMY_WOLF = 7;

function enemyDeathInformation() {
    this.level = -1;
    this.deathCount = 0;
}

enemyDeathInformation.prototype.getExperience = function () {
    var eg = 2;

    for (t = 0; t <= this.deathCount; t += 100) {
        eg /= 2;
    }

    return eg;
}

function enemyInformation() {
    this.id = 0;
    this.name = "";
    this.baseVitality = 0;
    this.baseStrength = 0
    this.baseDefence = 0;
    this.mulVitality = 0;
    this.mulStrength = 0;
    this.mulDefence = 0;

    this.element = 0;
    this.skills = []; // List of skill ID

    this.totalDeath = 0;
    this.deathInfo = [];
    this.killCount = 0; // How many time it killed something

    this.experience = 0;
    this.nextLevel = 100; // Increase by 100 everytime
}

enemyInformation.prototype.calculateNextLevel = function () {
    this.nextLevel = Math.floor(this.experience / 100) * 100 + 100;
}

enemyInformation.prototype.getShardCount = function () {
    return Math.floor(this.experience / 100);
}

enemyInformation.prototype.getNextShard = function () {
    return this.nextLevel - this.experience;
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
    var di = null;

    for (var t = 0; t < this.deathInfo.length; t++) {
        if (this.deathInfo[t].level == level) {
            di = this.deathInfo[t];
        }
    }

    if (di == null) {
        di = new enemyDeathInformation();
        di.level = level;
        this.deathInfo.push(di);
    }

    di.deathCount++;
    this.experience += di.getExperience();

    if (this.experience >= this.nextLevel) {
        getResourceFromId(RESOURCE_SHARD).addAmount(1);
        this.nextLevel += 100;
    }

    this.totalDeath += 1;
}

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
    newItem.baseStrength = 5;
    newItem.baseDefence = 0;
    newItem.mulVitality = 10;
    newItem.mulStrength = 5;
    newItem.mulDefence = 0;
    //newItem.skills.push(SKILL_ENEMY_FIRE);
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