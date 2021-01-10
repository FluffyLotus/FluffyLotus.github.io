var BUILDING_NONE = -1;
var BUILDING_AXE = 0;
var BUILDING_PICK = 1;
var BUILDING_STORAGEPIPE = 2;
var BUILDING_STORAGE = 3;
var BUILDING_ESSENCEPULL1 = 4;
var BUILDING_SAWMILL = 5;
var BUILDING_WATERPIPE = 6;
var BUILDING_GREENPUSH1 = 7;
var BUILDING_GREENCONVERT = 8;
var BUILDING_BLUEPUSH1 = 9;
var BUILDING_BLUECONVERT = 10;
var BUILDING_REDPUSH1 = 11;
var BUILDING_REDCONVERT = 12;
var BUILDING_WATERPUMP = 13;
var BUILDING_WATERGEN = 14;
var BUILDING_ESSENCEGRAB = 15;
var BUILDING_STONEMASSON = 16;
var BUILDING_IRON = 17;
var BUILDING_STEAMENERGY = 18;
var BUILDING_ESSENCEPULL2 = 19;
var BUILDING_ESSENCEPULL3 = 20;
var BUILDING_ESSENCEPULL4 = 21;
var BUILDING_ESSENCEPULL8 = 22;
var BUILDING_BLUEPUSH2 = 23;
var BUILDING_BLUEPUSH3 = 24;
var BUILDING_BLUEPUSH4 = 25;
var BUILDING_BLUEPUSH8 = 26;
var BUILDING_GREENPUSH2 = 27;
var BUILDING_GREENPUSH3 = 28;
var BUILDING_GREENPUSH4 = 29;
var BUILDING_GREENPUSH8 = 30;
var BUILDING_REDPUSH2 = 31;
var BUILDING_REDPUSH3 = 32;
var BUILDING_REDPUSH4 = 33;
var BUILDING_REDPUSH8 = 34;
var BUILDING_GEAR = 35;

var BUILDING_TIMECONVERT = 36;
var BUILDING_TIMEPUSH1 = 37;
var BUILDING_TIMEPUSH2 = 38;
var BUILDING_TIMEPUSH3 = 39;
var BUILDING_TIMEPUSH4 = 40;
var BUILDING_TIMEPUSH8 = 41;

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
    this.buildOnCellIsType = [];
    this.extractCellParticle = false;
    this.particleOutput = [];
    this.generateParticleId = -1;
    this.gradeLevel = 0;
    this.needStorage = true;

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
    for (var i = 0; i < this.buildOnCellIsType.length; i++) {
        if (this.buildOnCellIsType[i] == cells[mapGrid.cellId].type)
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
    buildings[0].buildOnCellIsType = [CELL_TYPE_TREE];
    buildings[0].particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, 0, 1, 0, 0.1)]));

    buildings[1] = new buildingInformation();
    buildings[1].id = 1;
    buildings[1].name = "Quarry";
    buildings[1].description = "Blue particle: 10% ore generation.";
    buildings[1].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[1].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[1].rewards.push(createResourceLink(RESOURCE_STONE, 0, 1, 0, 1.0));
    buildings[1].buildOnCellIsType = [CELL_TYPE_MOUNTAIN];
    buildings[1].particleOutput.push(createBuildingParticleOutput(PARTICLE_BLUE, [createResourceLink(RESOURCE_ORE, 0, 1, 0, 0.1)]));

    buildings[2] = new buildingInformation();
    buildings[2].id = 2;
    buildings[2].name = "Resource Pipe";
    buildings[2].description = "Transfer resource to/from storage unit.";
    buildings[2].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[2].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[3] = new buildingInformation();
    buildings[3].id = 3;
    buildings[3].name = "Storage";
    buildings[3].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[3].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[4] = new buildingInformation();
    buildings[4].id = 4;
    buildings[4].name = "Essence Pull I";
    buildings[4].description = "Pull magic essence out of the land";
    buildings[4].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[4].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[4].extractCellParticle = true;
    buildings[4].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
    buildings[4].needStorage = false;

    buildings[5] = new buildingInformation();
    buildings[5].id = 5;
    buildings[5].name = "Saw Mill";
    buildings[5].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[5].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 100, 0, 1.0));
    buildings[5].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[5].upgradeRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[5].requirements.push(createResourceLink(RESOURCE_WOOD, 0, 10, 0, 1.0));
    buildings[5].rewards.push(createResourceLink(RESOURCE_PLANK, 0, 1, 0, 1.0));
    buildings[5].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[6] = new buildingInformation();
    buildings[6].id = 6;
    buildings[6].name = "Water Pipe";
    buildings[6].description = "Transfer water to a unit.";
    buildings[6].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[6].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[7] = new buildingInformation();
    buildings[7].id = 7;
    buildings[7].name = "Green Mana Push I";
    buildings[7].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[7].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[7].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[7].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[7].generateParticleId = PARTICLE_GREEN;
    buildings[7].needStorage = false;

    buildings[8] = new buildingInformation();
    buildings[8].id = 8;
    buildings[8].name = "Green Converter";
    buildings[8].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[8].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[8].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 0, 10, 0, 1.0));
    buildings[8].rewards.push(createResourceLink(RESOURCE_GREENMANA, 0, 1, 0, 1.0));
    buildings[8].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[9] = new buildingInformation();
    buildings[9].id = 9;
    buildings[9].name = "Blue Mana Push I";
    buildings[9].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[9].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[9].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[9].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[9].generateParticleId = PARTICLE_BLUE;
    buildings[9].needStorage = false;

    buildings[10] = new buildingInformation();
    buildings[10].id = 10;
    buildings[10].name = "Blue Converter";
    buildings[10].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[10].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[10].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 0, 10, 0, 1.0));
    buildings[10].rewards.push(createResourceLink(RESOURCE_BLUEMANA, 0, 1, 0, 1.0));
    buildings[10].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[11] = new buildingInformation();
    buildings[11].id = 11;
    buildings[11].name = "Red Mana Push I";
    buildings[11].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[11].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[11].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[11].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[11].generateParticleId = PARTICLE_RED;
    buildings[11].needStorage = false;

    buildings[12] = new buildingInformation();
    buildings[12].id = 12;
    buildings[12].name = "Red Converter";
    buildings[12].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[12].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[12].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 0, 10, 0, 1.0));
    buildings[12].rewards.push(createResourceLink(RESOURCE_REDMANA, 0, 1, 0, 1.0));
    buildings[12].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[13] = new buildingInformation();
    buildings[13].id = 13;
    buildings[13].name = "Water Pump";
    buildings[13].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[13].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[13].rewards.push(createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0));
    buildings[13].buildOnCellIsType = [CELL_TYPE_WATER];

    buildings[14] = new buildingInformation();
    buildings[14].id = 14;
    buildings[14].name = "Water Generator";
    buildings[14].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[14].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[14].rewards.push(createResourceLink(RESOURCE_REDESSENCE, 0, 1, 0, 1.0));
    buildings[14].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[15] = new buildingInformation();
    buildings[15].id = 15;
    buildings[15].name = "Grab Essence";
    buildings[15].description = "Grab essence from the air for storage.";
    buildings[15].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[15].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[15].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
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
    buildings[16].buildOnCellIsType = [CELL_TYPE_GRASS];

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
    buildings[17].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[18] = new buildingInformation();
    buildings[18].id = 18;
    buildings[18].name = "Steam Energy";
    buildings[18].description = "Grab steam from the air for energy.";
    buildings[18].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[18].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[18].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[18].particleOutput.push(createBuildingParticleOutput(PARTICLE_STEAM, [createResourceLink(RESOURCE_ENERGY, 0, 1, 0, 1.0)]));

    buildings[19] = new buildingInformation();
    buildings[19].id = 19;
    buildings[19].name = "Essence Pull II";
    buildings[19].description = "Pull magic essence out of the land";
    buildings[19].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[19].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[19].extractCellParticle = true;
    buildings[19].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
    buildings[19].gradeLevel = 1;
    buildings[19].needStorage = false;

    buildings[20] = new buildingInformation();
    buildings[20].id = 20;
    buildings[20].name = "Essence Pull III";
    buildings[20].description = "Pull magic essence out of the land";
    buildings[20].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[20].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[20].extractCellParticle = true;
    buildings[20].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
    buildings[20].gradeLevel = 2;
    buildings[20].needStorage = false;

    buildings[21] = new buildingInformation();
    buildings[21].id = 21;
    buildings[21].name = "Essence Pull IV";
    buildings[21].description = "Pull magic essence out of the land";
    buildings[21].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[21].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[21].extractCellParticle = true;
    buildings[21].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
    buildings[21].gradeLevel = 3;
    buildings[21].needStorage = false;

    buildings[22] = new buildingInformation();
    buildings[22].id = 22;
    buildings[22].name = "Essence Pull V";
    buildings[22].description = "Pull magic essence out of the land";
    buildings[22].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[22].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[22].extractCellParticle = true;
    buildings[22].buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA];
    buildings[22].gradeLevel = 4;
    buildings[22].needStorage = false;

    buildings[23] = new buildingInformation();
    buildings[23].id = 23;
    buildings[23].name = "Blue Mana Push II";
    buildings[23].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[23].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[23].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[23].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[23].generateParticleId = PARTICLE_BLUE;
    buildings[23].gradeLevel = 1;
    buildings[23].needStorage = false;

    buildings[24] = new buildingInformation();
    buildings[24].id = 24;
    buildings[24].name = "Blue Mana Push III";
    buildings[24].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[24].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[24].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[24].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[24].generateParticleId = PARTICLE_BLUE;
    buildings[24].gradeLevel = 2;
    buildings[24].needStorage = false;

    buildings[25] = new buildingInformation();
    buildings[25].id = 25;
    buildings[25].name = "Blue Mana Push IV";
    buildings[25].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[25].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[25].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[25].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[25].generateParticleId = PARTICLE_BLUE;
    buildings[25].gradeLevel = 3;
    buildings[25].needStorage = false;

    buildings[26] = new buildingInformation();
    buildings[26].id = 26;
    buildings[26].name = "Blue Mana Push V";
    buildings[26].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[26].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[26].requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, 8, 0, 0, 1.0));
    buildings[26].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[26].generateParticleId = PARTICLE_BLUE;
    buildings[26].gradeLevel = 4;
    buildings[26].needStorage = false;

    buildings[27] = new buildingInformation();
    buildings[27].id = 27;
    buildings[27].name = "Green Mana Push II";
    buildings[27].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[27].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[27].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[27].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[27].generateParticleId = PARTICLE_GREEN;
    buildings[27].gradeLevel = 1;
    buildings[27].needStorage = false;

    buildings[28] = new buildingInformation();
    buildings[28].id = 28;
    buildings[28].name = "Green Mana Push III";
    buildings[28].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[28].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[28].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[28].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[28].generateParticleId = PARTICLE_GREEN;
    buildings[28].gradeLevel = 2;
    buildings[28].needStorage = false;

    buildings[29] = new buildingInformation();
    buildings[29].id = 29;
    buildings[29].name = "Green Mana Push IV";
    buildings[29].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[29].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[29].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[29].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[29].generateParticleId = PARTICLE_GREEN;
    buildings[29].gradeLevel = 3;
    buildings[29].needStorage = false;

    buildings[30] = new buildingInformation();
    buildings[30].id = 30;
    buildings[30].name = "Green Mana Push V";
    buildings[30].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[30].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[30].requirements.push(createResourceLink(RESOURCE_GREENESSENCE, 8, 0, 0, 1.0));
    buildings[30].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[30].generateParticleId = PARTICLE_GREEN;
    buildings[30].gradeLevel = 4;
    buildings[30].needStorage = false;

    buildings[31] = new buildingInformation();
    buildings[31].id = 31;
    buildings[31].name = "Red Mana Push II";
    buildings[31].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[31].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[31].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[31].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[31].generateParticleId = PARTICLE_RED;
    buildings[31].gradeLevel = 1;
    buildings[31].needStorage = false;

    buildings[32] = new buildingInformation();
    buildings[32].id = 32;
    buildings[32].name = "Red Mana Push III";
    buildings[32].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[32].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[32].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[32].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[32].generateParticleId = PARTICLE_RED;
    buildings[32].gradeLevel = 2;
    buildings[32].needStorage = false;

    buildings[33] = new buildingInformation();
    buildings[33].id = 33;
    buildings[33].name = "Red Mana Push IV";
    buildings[33].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[33].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[33].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[33].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[33].generateParticleId = PARTICLE_RED;
    buildings[33].gradeLevel = 3;
    buildings[33].needStorage = false;

    buildings[34] = new buildingInformation();
    buildings[34].id = 34;
    buildings[34].name = "Red Mana Push V";
    buildings[34].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[34].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[34].requirements.push(createResourceLink(RESOURCE_REDESSENCE, 8, 0, 0, 1.0));
    buildings[34].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[34].generateParticleId = PARTICLE_RED;
    buildings[34].gradeLevel = 4;
    buildings[34].needStorage = false;

    buildings[35] = new buildingInformation();
    buildings[35].id = 35;
    buildings[35].name = "Gear";
    buildings[35].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[35].costRequirements.push(createResourceLink(RESOURCE_STONE, 10, 100, 0, 1.0));
    buildings[35].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[35].upgradeRequirements.push(createResourceLink(RESOURCE_STONE, 10, 10, 0, 1.0));
    buildings[35].requirements.push(createResourceLink(RESOURCE_IRON, 0, 10, 0, 1.0));
    buildings[35].rewards.push(createResourceLink(RESOURCE_GEAR, 0, 1, 0, 1.0));
    buildings[35].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[36] = new buildingInformation();
    buildings[36].id = 36;
    buildings[36].name = "Time Converter";
    buildings[36].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[36].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[36].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 0, 10, 0, 1.0));
    buildings[36].rewards.push(createResourceLink(RESOURCE_TIMEMANA, 0, 1, 0, 1.0));
    buildings[36].buildOnCellIsType = [CELL_TYPE_GRASS];

    buildings[37] = new buildingInformation();
    buildings[37].id = 37;
    buildings[37].name = "Time Mana Push I";
    buildings[37].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[37].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[37].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 8, 0, 0, 1.0));
    buildings[37].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[37].generateParticleId = PARTICLE_TIME;
    buildings[37].needStorage = false;

    buildings[38] = new buildingInformation();
    buildings[38].id = 38;
    buildings[38].name = "Time Mana Push II";
    buildings[38].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[38].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[38].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 8, 0, 0, 1.0));
    buildings[38].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[38].generateParticleId = PARTICLE_TIME;
    buildings[38].gradeLevel = 1;
    buildings[38].needStorage = false;

    buildings[39] = new buildingInformation();
    buildings[39].id = 39;
    buildings[39].name = "Time Mana Push III";
    buildings[39].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[39].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[39].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 8, 0, 0, 1.0));
    buildings[39].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[39].generateParticleId = PARTICLE_TIME;
    buildings[39].gradeLevel = 2;
    buildings[39].needStorage = false;

    buildings[40] = new buildingInformation();
    buildings[40].id = 40;
    buildings[40].name = "Time Mana Push IV";
    buildings[40].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[40].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[40].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 8, 0, 0, 1.0));
    buildings[40].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[40].generateParticleId = PARTICLE_TIME;
    buildings[40].gradeLevel = 3;
    buildings[40].needStorage = false;

    buildings[41] = new buildingInformation();
    buildings[41].id = 41;
    buildings[41].name = "Time Mana Push V";
    buildings[41].costRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 100, 0, 1.0));
    buildings[41].upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, 10, 10, 0, 1.0));
    buildings[41].requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, 8, 0, 0, 1.0));
    buildings[41].buildOnCellIsType = [CELL_TYPE_GRASS];
    buildings[41].generateParticleId = PARTICLE_TIME;
    buildings[41].gradeLevel = 4;
    buildings[41].needStorage = false;
}