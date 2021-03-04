function enemyInstanceInformation() {
    this.enemyId = 0;
    this.level = 0;
    this.maxVitality = 0;
    this.vitality = 0;
    this.strength = 0;
    this.defence = 0;

    this.skillInstances = [];

    this.vitalityTickDelta = 0;
}

enemyInstanceInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

enemyInstanceInformation.prototype.processTick = function () {
    for (var t = 0; t < this.skillInstances.length; t++) {
        this.skillInstances[t].processTick();
    }
}

enemyInstanceInformation.prototype.addVitality = function (d) {
    this.vitality += d;
    this.vitalityTickDelta += d;
}

enemyInstanceInformation.prototype.isDead = function () {
    return this.vitality <= 0;
}

enemyInstanceInformation.prototype.processDeath = function () {
    getEnemyFromId(this.enemyId).processDeath(this.level);
}

enemyInstanceInformation.prototype.processAttackSkills = function () {
    var add = 0;
    var attackSkills = getSkillInstanceFromType(this.skillInstances, SKILL_TYPE_ATTACK);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (attackSkills[t].isExecuting()) {
                add += attackSkills[t].getAmount();
            }
            else {
                if (attackSkills[t].canExecute()) {
                    attackSkills[t].execute();
                    add += attackSkills[t].getAmount();
                }
            }
        }
    }

    return add;
}

/*
enemyInstanceInformation.prototype.experienceGiven = function () {
    return enemies[this.enemyId].experienceGiven(this.level);
}
*/
function createEnemyInstance(enemyId, level) {
    var inst = new enemyInstanceInformation();
    var enemy = getEnemyFromId(enemyId);

    inst.enemyId = enemyId;
    inst.level = level;
    inst.maxVitality = enemy.getVitality(level);
    inst.vitality = inst.maxVitality;
    inst.strength = enemy.getStrength(level);
    inst.defence = enemy.getDefence(level);

    for (var t = 0; t < enemy.skills.length; t++) {
        var si = createSkillInstance(enemy.skills[t], true);
        si.isEquip = true;

        inst.skillInstances.push(si);
    }

    return inst;
}