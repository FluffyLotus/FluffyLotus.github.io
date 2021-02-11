function skillInstanceInformation() {
    this.skillId = 0;
    this.level = 1;
    this.trainingLevel = 0;
    this.colldown = 0;
    this.isActive = false;

    this.isTraining = false;
    this.isEquip = false;
}

skillInstanceInformation.prototype.isVisible = function () {
    return this.isActive;
}

skillInstanceInformation.prototype.canTrain = function () {
    if (!this.isTraining)
        return false;

    if (this.trainingLevel >= 100)
        return false;

    return getSkillFromId(this.skillId).canTrain(this.level);
}

skillInstanceInformation.prototype.train = function () {
    if (this.canTrain()) {
        getSkillFromId(this.skillId).train(this.level);

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

    if (this.colldown <= 0) {
        return getSkillFromId(this.skillId).canExecute(this.level);
    }

    return false;
}

skillInstanceInformation.prototype.execute = function () {
    if (this.canExecute()) {
        this.colldown = getSkillFromId(this.skillId).cooldown;
        getSkillFromId(this.skillId).execute(this.level);

        return true;
    }

    return false;
}

skillInstanceInformation.prototype.processTick = function () {
    if (this.colldown > 0)
        this.colldown -= 1;

    if (this.canTrain())
        this.train();
}

skillInstanceInformation.prototype.getAmount = function () {
    return getSkillFromId(this.skillId).getAmount(this.level);
}

function createSkillInstance(skillId, isActive) {
    var ret = new skillInstanceInformation();

    ret.skillId = skillId;
    ret.level = 1;
    ret.trainingLevel = 0;
    ret.isTraining = false;
    ret.isEquip = false;
    ret.isActive = isActive;

    return ret;
}