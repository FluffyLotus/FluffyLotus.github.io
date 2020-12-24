var BUILDING_NONE = -1;
var BUILDING_AXE = 0;
var BUILDING_PICK = 1;
var BUILDING_STORAGEPIPE = 2;
var BUILDING_STORAGE = 3;
var BUILDING_ESSENCEPULL = 4;
var BUILDING_SAWMILL = 5;
var BUILDING_WATERPIPE = 6;
var BUILDING_GREENPUSH = 7;
var BUILDING_GREENCONVERT = 8;
var BUILDING_BLUEPUSH = 9;
var BUILDING_BLUECONVERT = 10;
var BUILDING_REDPUSH = 11;
var BUILDING_REDCONVERT = 12;
var BUILDING_WATERPUMP = 13;
var BUILDING_WATERGEN = 14;
var BUILDING_ESSENCEGRAB = 15;
var BUILDING_STONEMASSON = 16;
var BUILDING_STEAMENERGY = 17;

function buildingParticleOutputInformation() {
    this.particleId = -1;
    this.rewards = [];
}

function createBuildingParticleOutput(particleId, rewards) {
    var ret = new buildingParticleOutputInformation();

    ret.particleId = particleId;
    ret.rewards = rewards;

    return ret;
}

function buildingInformation() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.costRequirements = [];
    this.upgradeRequirements = [];
    this.requirements = [];
    this.rewards = [];
    this.buildOnCellIds = [];
    this.extractCellParticle = false;
    this.particleOutput = [];
    this.generateParticleId = -1;
    this.gradeLevel = 0;

    this.buildAmount = 0;
}

buildingInformation.prototype.addBuildingAmount = function (d) {
    this.buildAmount += d;
}

buildingInformation.prototype.hasCost = function () {
    return hasResourceLink(this.costRequirements, this.buildAmount);
}

buildingInformation.prototype.processCost = function () {
    removeResourceLink(this.costRequirements, this.buildAmount);
}

buildingInformation.prototype.hasUpgradeRequirements = function (buildingLevel) {
    if (this.upgradeRequirements.length == 0)
        return false;

    return hasResourceLink(this.upgradeRequirements, buildingLevel);
}

buildingInformation.prototype.processUpgradeRequirements = function (buildingLevel) {
    removeResourceLink(this.upgradeRequirements, buildingLevel);
}

buildingInformation.prototype.hasTickRequirements = function (buildingLevel) {
    return hasResourceLink(this.requirements, buildingLevel);
}

buildingInformation.prototype.processTickRequirements = function (buildingLevel) {
    removeResourceLink(this.requirements, buildingLevel);
}

buildingInformation.prototype.processTickRewards = function (buildingLevel) {
    addResourceLink(this.rewards, buildingLevel);
}

buildingInformation.prototype.processParticleOutput = function (particleId, particleLevel) {
    for (var i = 0; i < this.particleOutput.length; i++) {
        if (this.particleOutput[i].particleId == particleId) {
            addResourceLink(this.particleOutput[i].rewards, particleLevel);
        }
    }
}

buildingInformation.prototype.getCostRequirementsString = function () {
    return getResourceLinkString(this.costRequirements, this.buildAmount);
}

buildingInformation.prototype.getUpgradeRequirementsString = function (buildingLevel) {
    return getResourceLinkString(this.upgradeRequirements, buildingLevel);
}

buildingInformation.prototype.getTickRequirementsString = function (buildingLevel) {
    return getResourceLinkString(this.requirements, buildingLevel);
}

buildingInformation.prototype.getTickRewardsString = function (buildingLevel) {
    return getResourceLinkString(this.rewards, buildingLevel);
}

buildingInformation.prototype.canBuildHere = function (mapGrid) {
    for (var i = 0; i < this.buildOnCellIds.length; i++) {
        if (this.buildOnCellIds[i] == mapGrid.cellId)
            return true;
    }

    return false;
}

function loadBuildings() {
    buildings[0] = new buildingInformation();
    buildings[0].id = 0;
    buildings[0].name = "Axe";
    buildings[0].description = "Red particle: 10% coal generation.";
    buildings[0].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[0].upgradeRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[0].rewards.push(createResourceLink(RESOURCE_WOOD, 0, 1, 0, 1.0));
    buildings[0].buildOnCellIds = [CELL_TREE];
    buildings[0].particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, 0, 1, 0, 0.1)]));

    buildings[1] = new buildingInformation();
    buildings[1].id = 1;
    buildings[1].name = "Quarry";
    buildings[1].description = "Blue particle: 10% ore generation.";
    buildings[1].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[1].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[1].rewards.push(createResourceLink(RESOURCE_STONE, 0, 1, 0, 1.0));
    buildings[1].buildOnCellIds = [CELL_MOUNTAIN];
    buildings[1].particleOutput.push(createBuildingParticleOutput(PARTICLE_BLUE, [createResourceLink(RESOURCE_ORE, 0, 1, 0, 0.1)]));

    buildings[2] = new buildingInformation();
    buildings[2].id = 2;
    buildings[2].name = "Resource Pipe";
    buildings[2].description = "Transfer resource to/from storage unit.";
    buildings[2].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[2].buildOnCellIds = [CELL_GRASS];

    buildings[3] = new buildingInformation();
    buildings[3].id = 3;
    buildings[3].name = "Storage";
    buildings[3].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[3].buildOnCellIds = [CELL_GRASS];

    buildings[4] = new buildingInformation();
    buildings[4].id = 4;
    buildings[4].name = "Essence Pull";
    buildings[4].description = "Pull magic essence out of the land";
    buildings[4].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[4].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[4].extractCellParticle = true;
    buildings[4].buildOnCellIds = [CELL_GRASS, CELL_WATER, CELL_LAVA];

    buildings[5] = new buildingInformation();
    buildings[5].id = 5;
    buildings[5].name = "Saw Mill";
    buildings[5].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[5].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 100, 0, 1.0));
    buildings[5].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[5].upgradeRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[5].requirements.push(createResourceLink(RESOURCE_WOOD, 0, 10, 0, 1.0));
    buildings[5].rewards.push(createResourceLink(RESOURCE_PLANK, 0, 1, 0, 1.0));
    buildings[5].buildOnCellIds = [CELL_GRASS];

    buildings[6] = new buildingInformation();
    buildings[6].id = 6;
    buildings[6].name = "Water Pipe";
    buildings[6].description = "Transfer water to a unit.";
    buildings[6].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[6].buildOnCellIds = [CELL_GRASS];

    buildings[7] = new buildingInformation();
    buildings[7].id = 7;
    buildings[7].name = "Green Mana Push";
    buildings[7].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[7].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[7].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[7].buildOnCellIds = [CELL_GRASS];
    buildings[7].generateParticleId = PARTICLE_GREEN;

    buildings[8] = new buildingInformation();
    buildings[8].id = 8;
    buildings[8].name = "Green Converter";
    buildings[8].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[8].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[8].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 0, 10, 0, 1.0));
    buildings[8].rewards.push(createResourceLink(RESOURCE_GREENMANA, 0, 1, 0, 1.0));
    buildings[8].buildOnCellIds = [CELL_GRASS];

    buildings[9] = new buildingInformation();
    buildings[9].id = 9;
    buildings[9].name = "Blue Mana Push";
    buildings[9].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[9].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[9].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[9].buildOnCellIds = [CELL_GRASS];
    buildings[9].generateParticleId = PARTICLE_BLUE;

    buildings[10] = new buildingInformation();
    buildings[10].id = 10;
    buildings[10].name = "Blue Converter";
    buildings[10].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[10].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[10].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 0, 10, 0, 1.0));
    buildings[10].rewards.push(createResourceLink(RESOURCE_BLUEMANA, 0, 1, 0, 1.0));
    buildings[10].buildOnCellIds = [CELL_GRASS];

    buildings[11] = new buildingInformation();
    buildings[11].id = 11;
    buildings[11].name = "Red Mana Push";
    buildings[11].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[11].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[11].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[11].buildOnCellIds = [CELL_GRASS];
    buildings[11].generateParticleId = PARTICLE_RED;

    buildings[12] = new buildingInformation();
    buildings[12].id = 12;
    buildings[12].name = "Red Converter";
    buildings[12].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[12].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[12].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 0, 10, 0, 1.0));
    buildings[12].rewards.push(createResourceLink(RESOURCE_REDMANA, 0, 1, 0, 1.0));
    buildings[12].buildOnCellIds = [CELL_GRASS];

    buildings[13] = new buildingInformation();
    buildings[13].id = 13;
    buildings[13].name = "Water Pump";
    buildings[13].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[13].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[13].rewards.push(createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0));
    buildings[13].buildOnCellIds = [CELL_WATER];

    buildings[14] = new buildingInformation();
    buildings[14].id = 14;
    buildings[14].name = "Water Generator";
    buildings[14].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[14].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[14].rewards.push(createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0));
    buildings[14].buildOnCellIds = [CELL_GRASS];

    buildings[15] = new buildingInformation();
    buildings[15].id = 15;
    buildings[15].name = "Grab Essence";
    buildings[15].description = "Grab essence from the air for storage.";
    buildings[15].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[15].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[15].buildOnCellIds = [CELL_GRASS, CELL_WATER, CELL_LAVA];
    buildings[15].particleOutput.push(createBuildingParticleOutput(PARTICLE_GREEN, [createResourceLink(RESOURCE_GREENESSENCE, 0, 1, 0, 1.0)]));
    buildings[15].particleOutput.push(createBuildingParticleOutput(PARTICLE_BLUE, [createResourceLink(RESOURCE_BLUEESSENCE, 0, 1, 0, 1.0)]));
    buildings[15].particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0)]));

    buildings[16] = new buildingInformation();
    buildings[16].id = 16;
    buildings[16].name = "Masson";
    buildings[16].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[16].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 100, 0, 1.0));
    buildings[16].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[16].upgradeRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[16].requirements.push(createResourceLink(RESOURCE_STONE, 0, 10, 0, 1.0));
    buildings[16].rewards.push(createResourceLink(RESOURCE_BLOCK, 0, 1, 0, 1.0));
    buildings[16].buildOnCellIds = [CELL_GRASS];

    buildings[17] = new buildingInformation();
    buildings[17].id = 17;
    buildings[17].name = "Iron Factory";
    buildings[17].costRequirements.push(createResourceLink(RESOURCE_PLANK, 10, 100, 0, 1.0));
    buildings[17].costRequirements.push(createResourceLink(RESOURCE_BLOCK, 10, 100, 0, 1.0));
    buildings[17].upgradeRequirements.push(createResourceLink(RESOURCE_PLANK, 10, 10, 0, 1.0));
    buildings[17].upgradeRequirements.push(createResourceLink(RESOURCE_BLOCK, 10, 10, 0, 1.0));
    buildings[17].requirements.push(createResourceLink(RESOURCE_ORE, 0, 10, 0, 1.0));
    buildings[17].requirements.push(createResourceLink(RESOURCE_COAL, 0, 10, 0, 1.0));
    buildings[17].rewards.push(createResourceLink(RESOURCE_IRON, 0, 1, 0, 1.0));
    buildings[17].buildOnCellIds = [CELL_GRASS];

    buildings[18] = new buildingInformation();
    buildings[18].id = 18;
    buildings[18].name = "Steam Energy";
    buildings[18].description = "Grab steam from the air for energy.";
    buildings[18].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[18].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[18].buildOnCellIds = [CELL_GRASS];
    buildings[18].particleOutput.push(createBuildingParticleOutput(PARTICLE_STEAM, [createResourceLink(RESOURCE_ENERGY, 0, 1, 0, 1.0)]));
}