var ENEMY_BUNNY = 0;
var ENEMY_RAT = 1;
var ENEMY_DEVIL = 2;

function enemyInformation() {
    this.id = 0;
    this.name = "";
    this.vitality = 0;
    this.strength = 0
    this.defence = 0;
    this.vitalityMul = 0;
    this.strengthMul = 0;
    this.defenceMul = 0;
}

enemyInformation.prototype.getVitality = function (level) {
    return this.vitality + level * this.vitalityMul;
}

enemyInformation.prototype.getStrength = function (level) {
    return this.strength + level * this.strengthMul;
}

enemyInformation.prototype.getDefence = function (level) {
    return this.defence + level * this.defenceMul;
}

function loadEnemies() {
    enemies[0] = new enemyInformation();
    enemies[0].id = 0;
    enemies[0].name = "Evil Bunny";
    enemies[0].vitality = 20;
    enemies[0].strength = 10;
    enemies[0].defence = 0;
    enemies[0].vitalityMul = 10;
    enemies[0].strengthMul = 10;
    enemies[0].defenceMul = 0;

    enemies[1] = new enemyInformation();
    enemies[1].id = 1;
    enemies[1].name = "Evil Rat";
    enemies[1].vitality = 50;
    enemies[1].strength = 10;
    enemies[1].defence = 0;
    enemies[1].vitalityMul = 10;
    enemies[1].strengthMul = 10;
    enemies[1].defenceMul = 10;

    enemies[2] = new enemyInformation();
    enemies[2].id = 1;
    enemies[2].name = "Devil";
    enemies[2].vitality = 50;
    enemies[2].strength = 10;
    enemies[2].defence = 0;
    enemies[2].vitalityMul = 20;
    enemies[2].strengthMul = 15;
    enemies[2].defenceMul = 10;
}