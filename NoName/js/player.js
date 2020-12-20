function playerInformation() {
    this.vitality = 500;

    this.baseVitality = 500;
    this.baseStrength = 10;
    this.baseDefence = 0;

    this.mulVitality = 100;
    this.mulStrength = 10;
    this.mulDefence = 10;

    this.pointVitality = 0;
    this.pointStrength = 0;
    this.pointDefence = 0;

    this.experience = 0;

    this.vitalityTickDelta = 0;
    this.deathCount = 0;

    this.canUseHealMagic = false;
    this.canUseFireMagic = false;
}

playerInformation.prototype.getVitality = function () {
    return this.baseVitality + this.pointVitality * this.mulVitality;
}

playerInformation.prototype.getStrength = function () {
    return this.baseStrength + this.pointStrength * this.mulStrength;
}

playerInformation.prototype.getDefence = function () {
    return this.baseDefence + this.pointDefence * this.mulDefence;
}

playerInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
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

playerInformation.prototype.getPointLeft = function () {
    return this.getTotalPoint() - this.getUsedTotalPoint();
}

playerInformation.prototype.getTotalPoint = function () {
    return parseInt(this.experience / 1000);
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

playerInformation.prototype.revive = function () {
    this.vitality = this.getVitality();
}