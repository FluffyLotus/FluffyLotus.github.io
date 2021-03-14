var XP_PER_POINT = 500;

function playerInformation() {
    this.vitality = 500;

    this.baseVitality = 490; //500;
    this.baseStrength = 9; //10;
    this.baseDefence = -1; //0;

    this.vitalityTickDelta = 0;
    this.deathCount = 0;

    this.imageName = "character_main_Size2_NE";

    this.skills = [];
}

playerInformation.prototype.getVitality = function () {
    return this.baseVitality + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_VITALITY);
}

playerInformation.prototype.getStrength = function () {
    return this.baseStrength + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_STRENGTH);
}

playerInformation.prototype.getDefence = function () {
    return this.baseDefence + getSkillValueFromSubType(this.skills, SKILL_SUBTYPE_DEFENCE);
}

playerInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

playerInformation.prototype.processTick = function () {
    for (var i = 0; i < this.skills.length; i++) {
        this.skills[i].processTraining();
        this.skills[i].processTick();
    }
}

playerInformation.prototype.addVitality = function (d) {
    this.vitality += d;
    this.vitalityTickDelta += d;
}

playerInformation.prototype.isDead = function () {
    return this.vitality <= 0;
}

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
    var attackSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_ATTACK);

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

playerInformation.prototype.processDefenceSkills = function () {
    var attackSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_SHIELD);

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

playerInformation.prototype.getAllAttack = function () {
    var ret = [];
    var attackSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_ATTACK);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (attackSkills[t].isExecuting()) {
                var skill = getSkillFromId(attackSkills[t].skillId);

                appendElementValue(ret, skill.element, attackSkills[t].getAmount());
            }
        }
    }

    appendElementValue(ret, ELEMENT_NORMAL, this.getStrength());

    return ret;
}

playerInformation.prototype.getAllDefence = function () {
    var ret = [];
    var attackSkills = getSkillInstanceFromType(this.skills, SKILL_TYPE_SHIELD);

    for (var t = 0; t < attackSkills.length; t++) {
        if (attackSkills[t].isEquip) {
            if (attackSkills[t].isExecuting()) {
                var skill = getSkillFromId(attackSkills[t].skillId);

                appendElementValue(ret, skill.element, attackSkills[t].getAmount());
            }
        }
    }

    appendElementValue(ret, ELEMENT_NORMAL, this.getDefence());

    return ret;
}

function createPlayer() {
    var pi = new playerInformation();
    var si;

    si = createSkillInstance(SKILL_VITALITY, false);
    si.isEquip = true;
    pi.skills.push(si);

    si = createSkillInstance(SKILL_STRENGTH, false);
    si.isEquip = true;
    pi.skills.push(si);

    si = createSkillInstance(SKILL_DEFENCE, false);
    si.isEquip = true;
    pi.skills.push(si);

    pi.skills.push(createSkillInstance(SKILL_HEAL, false));
    pi.skills.push(createSkillInstance(SKILL_FIRE, false));

    return pi;
}

function processSkillTick() {
    for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
        var curSkill = currentMapAdventure.currentPlayer.skills[t];

        if (curSkill.canUpgrade())
            curSkill.upgrade();
    }
}