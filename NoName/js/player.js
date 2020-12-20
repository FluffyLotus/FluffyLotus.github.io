function playerInformation() {
    this.vitality = 500;
    this.maxVatility = 500;
    this.strength = 10;
    this.defence = 0;
    this.vitalityMul = 100;
    this.strengthMul = 10;
    this.defenceMul = 10;

    this.vitalityTickDelta = 0;
}

playerInformation.prototype.prepareTick = function () {
    this.vitalityTickDelta = 0;
}

playerInformation.prototype.addVitality = function (d) {
    this.vitality += d;
    this.vitalityTickDelta += d;
}

playerInformation.prototype.isDead = function () {
    return this.vitality <= 0;
}