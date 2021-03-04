var XP_PER_POINT = 500;

function playerInformation() {
    this.vitality = 500;

    this.baseVitality = 490; //500;
    this.baseStrength = 9; //10;
    this.baseDefence = -1; //0;

    //this.mulVitality = 100; // REMOVE
    //this.mulStrength = 10; // REMOVE
    //this.mulDefence = 10; // REMOVE

    //this.pointVitality = 0; // REMOVE
    //this.pointStrength = 0; // REMOVE
    //this.pointDefence = 0; // REMOVE

    //this.experience = 0; // REMOVE

    this.vitalityTickDelta = 0;
    this.deathCount = 0;

    this.skills = [];

    //this.canUseHealMagic = false; // REMOVE
    //this.canUseFireMagic = false; // REMOVE
}

playerInformation.prototype.getVitality = function () {
    return this.baseVitality + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_VITALITY); //  + this.pointVitality * this.mulVitality
}

playerInformation.prototype.getStrength = function () {
    return this.baseStrength + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_STRENGTH); //  + this.pointStrength * this.mulStrength
}

playerInformation.prototype.getDefence = function () {
    return this.baseDefence + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_DEFENCE); //  + this.pointDefence * this.mulDefence
}

playerInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

playerInformation.prototype.processTick = function () {

    // Execute passive skills all the time
    this.processPassiveSkills();
    this.processHealthSkills();
}

playerInformation.prototype.addVitality = function (d) {
    this.vitality += d;
    this.vitalityTickDelta += d;

    //if (this.vitality > this.getVitality())
    //    this.vitality = this.getVitality();
}

playerInformation.prototype.isDead = function () {
    return this.vitality <= 0;
}
/*
playerInformation.prototype.getPointLeft = function () {
    return this.getTotalPoint() - this.getUsedTotalPoint();
}

playerInformation.prototype.getTotalPoint = function () {
    return parseInt(this.experience / XP_PER_POINT);
}

playerInformation.prototype.getUsedTotalPoint = function () {
    return this.pointVitality + this.pointStrength + this.pointDefence;
}

playerInformation.prototype.changeVitalityPoint = function (pointDelta) {
    if (pointDelta < 0) {
        if (this.pointVitality > 0)
            this.pointVitality -= 1;
    }
    else if (pointDelta > 0) {
        if (this.getPointLeft() > 0)
            this.pointVitality += 1;
    }
}

playerInformation.prototype.changeStrengthPoint = function (pointDelta) {
    if (pointDelta < 0) {
        if (this.pointStrength > 0)
            this.pointStrength -= 1;
    }
    else if (pointDelta > 0) {
        if (this.getPointLeft() > 0)
            this.pointStrength += 1;
    }
}

playerInformation.prototype.changeDefencePoint = function (pointDelta) {
    if (pointDelta < 0) {
        if (this.pointDefence > 0)
            this.pointDefence -= 1;
    }
    else if (pointDelta > 0) {
        if (this.getPointLeft() > 0)
            this.pointDefence += 1;
    }
}
*/
playerInformation.prototype.revive = function () {
    this.vitality = this.getVitality();
}

playerInformation.prototype.getSkillInstance = function (skillId) {
    for (var i = 0; i < this.skills.length; i++) {
        if (this.skills[i].skillId == skillId) {
            return this.skills[i];
        }
    }
}

playerInformation.prototype.setSkillTrainingStatus = function (skillId, isTraining) {
    var si = getSkillInstance(skillId);

    si.isTraining = isTraining;
}

playerInformation.prototype.setSkillEquipStatus = function (skillId, isEquip) {
    var si = getSkillInstance(skillId);

    si.isEquip = isEquip;
}

playerInformation.prototype.processPassiveSkills = function () {
    for (var i = 0; i < this.skills.length; i++) {
        var curSkillInst = this.skills[i];

        curSkillInst.processTick();

        // Passive skills
        if (curSkillInst.isEquip && getSkillFromId(curSkillInst.skillId).isPassive()) {
            curSkillInst.execute();
        }
    }
}

playerInformation.prototype.processHealthSkills = function () {
    if (this.vitality < this.getVitality()) {
        var healSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_HEAL);

        for (var t = 0; t < healSkills.length; t++) {
            var curHealSkill = healSkills[t];

            if (curHealSkill.isEquip) {
                if (this.vitality < this.getVitality()) {
                    if (curHealSkill.isExecuting()) {
                        this.addVitality(curHealSkill.getAmount());
                    }
                    else {
                        if (curHealSkill.canExecute()) {
                            curHealSkill.execute();
                            this.addVitality(curHealSkill.getAmount());
                        }
                    }
                }
            }
        }
    }
}

playerInformation.prototype.processAttackSkills = function () {
    var add = 0;
    var attackSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_ATTACK);

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

function createPlayer() {
    var pi = new playerInformation();
    var si;

    si = createSkillInstance(SKILL_VITALITY, true);
    si.isEquip = true;
    pi.skills.push(si);

    si = createSkillInstance(SKILL_STRENGTH, true);
    si.isEquip = true;
    pi.skills.push(si);

    si = createSkillInstance(SKILL_DEFENCE, true);
    si.isEquip = true;
    pi.skills.push(si);

    pi.skills.push(createSkillInstance(SKILL_HEAL, true));
    pi.skills.push(createSkillInstance(SKILL_FIRE, true));

    return pi;
}

function processSkillTick() {
    for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
        var curSkill = currentMapAdventure.currentPlayer.skills[t];

        if (curSkill.canUpgrade())
            curSkill.upgrade();
    }
}