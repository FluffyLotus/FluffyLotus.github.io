function mapGridParticleInformation() {
    this.particleId = -1;
    this.particleLevel = -1;
}

function mapGridInformation() {
    this.cellId = 0;

    this.buildingInst = null;

    this.particles = [];

    this.processBuildingTick = false;

    this.isConnectedToStorage = false;
    //this.isConnectedToWater = false;
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
    var curCell = getCellFromId(this.cellId);

    addResourceLink(curCell.clickReward, 1);

    if (this.buildingInst != null) {
        this.buildingInst.buildingRotation += 1;

        if (this.buildingInst.buildingRotation >= 8)
            this.buildingInst.buildingRotation = 0;
    }
}

mapGridInformation.prototype.processUpgrade = function () {
    if (this.buildingInst != null) {
        var building = getBuildingFromId(this.buildingInst.buildingId);

        if (building.upgradeRequirements.length > 0) {
            if (building.hasUpgradeRequirements(this.buildingInst.buildingLevel, this.buildingInst.buildingGradeLevel)) {
                building.processUpgradeRequirements(this.buildingInst.buildingLevel);

                this.buildingInst.buildingLevel += 1;
            }
        }
    }
}

mapGridInformation.prototype.processDowngrade = function () {
    if (this.buildingInst != null) {
        var building = getBuildingFromId(this.buildingInst.buildingId);

        if (building.upgradeRequirements.length > 0) {
            if (this.buildingInst.buildingLevel > 1) {
                this.buildingInst.buildingLevel -= 1;
                building.processDowngradeRequirements(this.buildingInst.buildingLevel, this.buildingInst.buildingGradeLevel);
            }
        }
    }
}

mapGridInformation.prototype.processAddBuilding = function (buildingId, buildingGradeLevel) {
    if (this.buildingInst == null) {
        var curBuilding = getBuildingFromId(buildingId);

        buildingGradeLevel = curBuilding.getMaxAvailableGrade(buildingGradeLevel);

        if (curBuilding.hasCost(buildingGradeLevel)) {
            if (curBuilding.canBuildHere(this)) {
                curBuilding.processCost(buildingGradeLevel);

                this.buildingInst = new buildingInstance();
                this.buildingInst.buildingId = curBuilding.id;
                this.buildingInst.buildingGradeLevel = buildingGradeLevel;
                this.buildingInst.buildingLevel = 1;
                this.buildingInst.buildingRotation = 0;

                curBuilding.addBuildingInstance(this.buildingInst);

                return true;
            }
        }
    }

    return false;
}

mapGridInformation.prototype.processSellBuilding = function () {
    if (this.buildingInst != null) {
        var curBuilding = getBuildingFromId(this.buildingInst.buildingId);

        if (curBuilding.upgradeRequirements.length > 0) {
            while (this.buildingInst.buildingLevel > 1) {
                this.processDowngrade();
            }
        }

        curBuilding.removeBuildingInstance(this.buildingInst);
        curBuilding.processSellCost(this.buildingInst.buildingGradeLevel);

        this.buildingInst.buildingId = -1;
        this.buildingInst.buildingRotation = 0;
        this.buildingInst = null;

        return true;
    }

    return false;
}

