function skillInstanceInformation() {
    this.skillId = 0;
    this.level = 1;
    this.trainingLevel = 0;
    this.colldown = 0;

    this.isTraining = false;
    this.isEquip = false;
}

skillInstanceInformation.prototype.canTrain = function () {
    if (!this.isTraining)
        return false;

    return skills[this.skillId].canTrain(this.level);
}

skillInstanceInformation.prototype.train = function () {
    if (this.canTrain()) {
        skills[this.skillId].train(this.level);

        this.trainingLevel += 1;

        if (this.trainingLevel == 100) {
            this.trainingLevel = 0;
            this.level += 1;
        }

        return true;
    }

    return false;
}

skillInstanceInformation.prototype.canExecute = function () {
    if (!this.isEquip)
        return false;

    if (this.colldown <= 0) {
        return skills[this.skillId].canExecute(this.level);
    }

    return false;
}

skillInstanceInformation.prototype.execute = function () {
    if (this.canExecute()) {
        this.colldown = skills[this.skillId].cooldown;
        skills[this.skillId].execute(this.level);

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
    return skills[this.skillId].getAmount(this.level);
}

function createSkillInstance(skillId) {
    var ret = new skillInstanceInformation();

    ret.skillId = skillId;
    ret.level = 1;
    ret.trainingLevel = 0;
    ret.isTraining = false;
    ret.isEquip = false;

    return ret;
}