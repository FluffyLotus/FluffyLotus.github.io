function enemyInstanceInformation() {
    this.enemyId = 0;
    this.level = 0;
    this.maxVitality = 0;
    this.vitality = 0;
    this.strength = 0;
    this.defence = 0;

    this.vitalityTickDelta = 0;
}

enemyInstanceInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

enemyInstanceInformation.prototype.addVitality = function (d) {
    this.vitality += d;
    this.vitalityTickDelta += d;
}

enemyInstanceInformation.prototype.isDead = function () {
    return this.vitality <= 0;
}

function createEnemyInstance(enemyId, level) {
    var inst = new enemyInstanceInformation();
    var enemy = enemies[enemyId];

    inst.enemyId = enemyId;
    inst.level = level;
    inst.maxVitality = enemy.getVitality(level);
    inst.vitality = inst.maxVitality;
    inst.strength = enemy.getStrength(level);
    inst.defence = enemy.getDefence(level);

    return inst;
}