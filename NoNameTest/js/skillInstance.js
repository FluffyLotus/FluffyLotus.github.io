var skillInstanceUniqueId = 0;

function skillInstanceInformation() {
    this.skillInstanceId = skillInstanceUniqueId++;
    this.skillId = 0;
    this.level = 1;
    this.trainingLevel = 0;
    this.cooldown = 0;
    this.duration = 0;
    this.isActive = false;

    this.isTraining = false;
    this.isEquip = false;

    this.skillRef = null;
}

skillInstanceInformation.prototype.isVisible = function () {
    return this.isActive;
}

skillInstanceInformation.prototype.canTrain = function () {
    if (!this.isTraining)
        return false;

    if (this.trainingLevel >= 100)
        return false;

    //return getSkillFromId(this.skillId).canTrain(this.level);
    return this.skillRef.canTrain(this.level);
}

skillInstanceInformation.prototype.train = function () {
    if (this.canTrain()) {
        //getSkillFromId(this.skillId).train(this.level);
        this.skillRef.train(this.level);

        this.trainingLevel += 1;

        return true;
    }

    return false;
}

skillInstanceInformation.prototype.canUpgrade = function () {
    if (this.trainingLevel >= 100)
        return true;
    return false;
}

skillInstanceInformation.prototype.upgrade = function () {
    if (!this.canUpgrade())
        return;

    this.trainingLevel = 0;
    this.level += 1;
}

skillInstanceInformation.prototype.canExecute = function () {
    if (!this.isEquip)
        return false;

    if (this.cooldown <= 0 && this.duration <= 0) {
        //return getSkillFromId(this.skillId).canExecute(this.level);
        return this.skillRef.canExecute(this.level);
    }

    return false;
}

skillInstanceInformation.prototype.execute = function () {
    if (this.canExecute()) {
        //this.cooldown = getSkillFromId(this.skillId).cooldown;
        //this.duration = getSkillFromId(this.skillId).duration;
        //getSkillFromId(this.skillId).execute(this.level);
        this.cooldown = this.skillRef.cooldown;
        this.duration = this.skillRef.duration;
        this.skillRef.execute(this.level);

        return true;
    }

    return false;
}

skillInstanceInformation.prototype.isExecuting = function () {
    return this.duration > 0;
}

skillInstanceInformation.prototype.processTick = function () {
    if (this.duration > 0) {
        this.duration -= 1;
    }
    else {
        if (this.cooldown > 0)
            this.cooldown -= 1;
    }
}

skillInstanceInformation.prototype.processTraining = function () {
    if (this.canTrain())
        this.train();
}

skillInstanceInformation.prototype.getAmount = function () {
    //return getSkillFromId(this.skillId).getAmount(this.level);
    return this.skillRef.getAmount(this.level);
}

function createSkillInstance(skillId, isActive) { // TODO: Pass reference
    var ret = new skillInstanceInformation();

    ret.skillId = skillId;
    ret.skillRef = getSkillFromId(skillId);
    ret.level = 1;
    ret.trainingLevel = 0;
    ret.isTraining = false;
    ret.isEquip = false;
    ret.isActive = isActive;

    return ret;
}

function getSkillInstanceFromType(skillInstances, skillType) {
    var ret = [];

    for (var t = 0; t < skillInstances.length; t++) {
        //if (getSkillFromId(skillInstances[t].skillId).skillType == skillType)
        if (skillInstances[t].skillRef.skillType == skillType)
            ret.push(skillInstances[t]);
    }

    return ret;
}

function getSkillInstanceFromSubType(skillInstances, skillSubType) {
    var ret = [];

    for (var t = 0; t < skillInstances.length; t++) {
        //if(getSkillFromId(skillInstances[t].skillId).skillSubType == skillSubType)
        if (skillInstances[t].skillRef.skillSubType == skillSubType)
            ret.push(skillInstances[t]);
    }

    return ret;
}

function getSkillInstanceFromElement(skillInstances, element) {
    var ret = [];

    for (var t = 0; t < skillInstances.length; t++) {
        //if (getSkillFromId(skillInstances[t].skillId).element == element)
        if (skillInstances[t].skillRef.element == element)
            ret.push(skillInstances[t]);
    }

    return ret;
}

function getSkillInstanceTotalAmount(skillInstances) {
    var ret = 0;

    for (var t = 0; t < skillInstances.length; t++) {
        if (skillInstances[t].isExecuting())
            ret += skillInstances[t].getAmount();
    }

    return ret;
}

function getSkillValueFromSubType(skillInstances, skillSubType) {
    var ret = [];
    var retVal = 0;

    ret = getSkillInstanceFromSubType(skillInstances, skillSubType);
    retVal += getSkillInstanceTotalAmount(ret);

    return retVal;
}

function getSkillValueFromType(skillInstances, skillType) {
    var ret = [];
    var retVal = 0;

    ret = getSkillInstanceFromType(skillInstances, skillType);
    retVal += getSkillInstanceTotalAmount(ret);

    return retVal;
}