function enemyInstanceInformation() {
    this.enemyId = 0;
    this.level = 0;
    this.maxVitality = 0;
    this.vitality = 0;
    this.strength = 0;
    this.defence = 0;

    this.skillInstances = [];

    this.vitalityTickDelta = 0;

    this.enemyRef = null;
}

enemyInstanceInformation.prototype.getSkillInstance = function (skillId) {
    for (var i = 0; i < this.skillInstances.length; i++) {
        if (this.skillInstances[i].skillId == skillId) {
            return this.skillInstances[i];
        }
    }
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
    //getEnemyFromId(this.enemyId).processDeath(this.level);
    this.enemyRef.processDeath(this.level);
}

enemyInstanceInformation.prototype.processAttackSkills = function () {
    var attackSkills = getSkillInstanceFromType(this.skillInstances, SKILL_TYPE_ATTACK);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (!attackSkills[t].isExecuting()) {
                if (attackSkills[t].canExecute()) {
                    attackSkills[t].execute();
                }
            }
        }
    }
}

enemyInstanceInformation.prototype.processDefenceSkills = function () {
    var attackSkills = getSkillInstanceFromType(this.skillInstances, SKILL_TYPE_SHIELD);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (!attackSkills[t].isExecuting()) {
                if (attackSkills[t].canExecute()) {
                    attackSkills[t].execute();
                }
            }
        }
    }
}

enemyInstanceInformation.prototype.getAllAttack = function () {
    var ret = [];
    var attackSkills = getSkillInstanceFromType(this.skillInstances, SKILL_TYPE_ATTACK);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (attackSkills[t].isExecuting()) {
                //var skill = getSkillFromId(attackSkills[t].skillId);
                var skill = attackSkills[t].skillRef;

                appendElementValue(ret, skill.element, attackSkills[t].getAmount());
            }
        }
    }

    appendElementValue(ret, ELEMENT_NORMAL, this.strength);

    return ret;
}

enemyInstanceInformation.prototype.getAllDefence = function () {
    var ret = [];
    var attackSkills = getSkillInstanceFromType(this.skillInstances, SKILL_TYPE_SHIELD);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (attackSkills[t].isExecuting()) {
                //var skill = getSkillFromId(attackSkills[t].skillId);
                var skill = attackSkills[t].skillRef;

                appendElementValue(ret, skill.element, attackSkills[t].getAmount());
            }
        }
    }

    appendElementValue(ret, ELEMENT_NORMAL, this.defence);

    return ret;
}

function createEnemyInstance(enemyId, level) {
    var inst = new enemyInstanceInformation();
    var enemy = getEnemyFromId(enemyId);

    inst.enemyId = enemyId;
    inst.enemyRef = getEnemyFromId(inst.enemyId);
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