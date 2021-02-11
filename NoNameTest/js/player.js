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

    this.passiveSkills = [];
    this.activeSkills = [];

    //this.canUseHealMagic = false; // REMOVE
    //this.canUseFireMagic = false; // REMOVE
}

playerInformation.prototype.getVitality = function () {
    return this.baseVitality + this.getSkillInstance(SKILL_VITALITY).getAmount(); //  + this.pointVitality * this.mulVitality
}

playerInformation.prototype.getStrength = function () {
    return this.baseStrength + this.getSkillInstance(SKILL_STRENGTH).getAmount(); //  + this.pointStrength * this.mulStrength
}

playerInformation.prototype.getDefence = function () {
    return this.baseDefence + this.getSkillInstance(SKILL_DEFENCE).getAmount(); //  + this.pointDefence * this.mulDefence
}

playerInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

playerInformation.prototype.processTick = function () {
    for (var i = 0; i < this.passiveSkills.length; i++) {
        //this.passiveSkills[i].train();
        this.passiveSkills[i].processTick();
    }

    for (var i = 0; i < this.activeSkills.length; i++) {
        //this.activeSkills[i].train();
        this.activeSkills[i].processTick();
    }
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
    for (var i = 0; i < this.passiveSkills.length; i++) {
        if (this.passiveSkills[i].skillId == skillId) {
            return this.passiveSkills[i];
        }
    }

    for (var i = 0; i < this.activeSkills.length; i++) {
        if (this.activeSkills[i].skillId == skillId) {
            return this.activeSkills[i];
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

function createPlayer() {
    var pi = new playerInformation();

    pi.passiveSkills.push(createSkillInstance(SKILL_VITALITY, false));
    pi.passiveSkills.push(createSkillInstance(SKILL_STRENGTH, true));
    pi.passiveSkills.push(createSkillInstance(SKILL_DEFENCE, true));

    pi.activeSkills.push(createSkillInstance(SKILL_HEAL, false));
    pi.activeSkills.push(createSkillInstance(SKILL_FIRE, false));

    return pi;
}