function mapGridParticleInformation() {
    this.particleId = -1;
    this.particleLevel = -1;
}

function mapGridInformation() {
    this.cellId = 0;

    this.buildingId = -1;
    this.buildingLevel = -1;
    this.buildingRotation = 0;

    this.particles = [];

    this.processBuildingTick = false;

    this.isConnectedToStorage = false;
    this.isConnectedToWater = false;
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

mapGridInformation.prototype.processClick = function () {
    var curCell = cells[this.cellId];

    addResourceLink(curCell.clickReward, 1);

    if (this.buildingId != -1) {
        this.buildingRotation += 1;

        if (this.buildingRotation >= 8)
            this.buildingRotation = 0;
    }
}

mapGridInformation.prototype.processUpgrade = function () {
    if (this.buildingId >= 0) {
        var building = buildings[this.buildingId];

        if (building.upgradeRequirements.length > 0) {
            if (building.hasUpgradeRequirements(this.buildingLevel)) {
                building.processUpgradeRequirements(this.buildingLevel);

                this.buildingLevel += 1;
            }
        }
    }
}

mapGridInformation.prototype.processDowngrade = function () {
    if (this.buildingId >= 0) {
        var building = buildings[this.buildingId];

        if (building.upgradeRequirements.length > 0) {
            if (this.buildingLevel > 1) {
                this.buildingLevel -= 1;
                building.processDowngradeRequirements(this.buildingLevel);
            }
        }
    }
}

mapGridInformation.prototype.processAddBuilding = function (buildingId) {
    if (this.buildingId == -1) {
        var curBuilding = buildings[buildingId];

        if (curBuilding.hasCost()) {
            if (curBuilding.canBuildHere(this)) {
                curBuilding.processCost();

                curBuilding.addBuildingAmount(1);
                this.buildingId = curBuilding.id;
                this.buildingLevel = 1;
                this.buildingRotation = 0;

                return true;
            }
        }
    }

    return false;
}

mapGridInformation.prototype.processSellBuilding = function () {
    if (this.buildingId >= 0) {
        var curBuilding = buildings[this.buildingId];

        if (curBuilding.upgradeRequirements.length > 0) {
            while (this.buildingLevel > 1) {
                this.processDowngrade();
            }
        }

        curBuilding.buildAmount -= 1;
        curBuilding.processSellCost();

        this.buildingId = -1;
        this.buildingRotation = 0;

        return true;
    }

    return false;
}

