function mapGridParticleInformation() {
    this.particleId = -1;
    this.particleLevel = -1;
}

function mapGridInformation() {
    this.cellId = 0;

    this.buildingId = -1;
    this.buildingLevel = -1;

    this.particles = [];

    this.processBuildingTick = false;

    this.isConnectedToStorage = false;
    this.isConnectedToWater = false;
}

mapGridInformation.prototype.canBuildOn = function () {
    if (this.cellId == CELL_GRASS && this.buildingId == -1)
        return true;
    return false;
}

mapGridInformation.prototype.prepareTick = function () {
    this.processBuildingTick = false;
    this.particles = [];
}

mapGridInformation.prototype.addParticle = function (particleId, particleLevel) {
    var found = false;

    for (var i = 0; i < this.particles.length; i++) {
        if (this.particles[i].particleId == particleId) {
            this.particles[i].particleLevel += particleLevel;
            found = true;
        }
    }

    if (!found) {
        var newP = new mapGridParticleInformation();

        newP.particleId = particleId;
        newP.particleLevel = particleLevel;

        this.particles.push(newP);
    }
}

mapGridInformation.prototype.getOutputParticleId = function () {
    if (this.particles.length == 0)
        return -1;
    if (this.particles.length == 1)
        return this.particles[0].particleId;
    return PARTICLE_STEAM;
}

mapGridInformation.prototype.getOutputParticleLevel = function () {
    if (this.particles.length == 0)
        return -1;
    if (this.particles.length == 1)
        return this.particles[0].particleLevel;
    return 1;
}