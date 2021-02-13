var BUILDING_NONE = -1;
var BUILDING_AXE = 0;
var BUILDING_PICK = 1;
var BUILDING_STORAGEPIPE = 2;
var BUILDING_STORAGE = 3;
var BUILDING_ESSENCEPULL1 = 4;
var BUILDING_SAWMILL = 5;
var BUILDING_UNDERGROUNDPIPE = 6;
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
    this.helpDescription = "";
    this.imageName = [];
    this.costRequirements = [];
    this.upgradeRequirements = [];
    this.requirements = [];
    this.rewards = [];
    this.buildOnCellIsType = [];
    this.extractCellParticle = false;
    this.particleOutput = [];
    this.generateParticleId = -1;
    this.maxGradeLevel = 0;
    this.needStorage = true;
    this.available = false;
    this.upgrades = [];

    this.buildAmount = 0;
}

buildingInformation.prototype.getMaxAvailableGrade = function (grade) {
    if (grade > this.maxGradeLevel)
        grade = this.maxGradeLevel;

    for (var t = 0; t < this.upgrades.length; t++) {
        if (this.upgrades[t].upgradeType == UPGRADE_TYPE_GRADE) {
            if (grade > this.upgrades[t].level)
                grade = this.upgrades[t].level;
        }
    }

    return grade;
}

buildingInformation.prototype.getGradeExtraAmount = function (grade) {
    grade = this.getMaxAvailableGrade(grade);

    if (grade == 0)
        return 1;
    if (grade == 1)
        return 2;
    if (grade == 2)
        return 3;
    if (grade == 3)
        return 4;
    if (grade == 4)
        return 8;
    return 1;
}

buildingInformation.prototype.isVisible = function () {
    return this.available;
}

buildingInformation.prototype.addBuildingAmount = function (d) {
    this.buildAmount += d;
}

buildingInformation.prototype.hasCost = function (grade) {
    return hasResourceLink(this.costRequirements, this.buildAmount, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processCost = function (grade) {
    removeResourceLink(this.costRequirements, this.buildAmount, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processSellCost = function (grade) {
    addResourceLink(this.costRequirements, this.buildAmount, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.hasUpgradeRequirements = function (buildingLevel, grade) {
    if (this.upgradeRequirements.length == 0)
        return false;

    return hasResourceLink(this.upgradeRequirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processUpgradeRequirements = function (buildingLevel, grade) {
    removeResourceLink(this.upgradeRequirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processDowngradeRequirements = function (buildingLevel, grade) {
    addResourceLink(this.upgradeRequirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.hasTickRequirements = function (buildingLevel, grade) {
    return hasResourceLink(this.requirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processTickRequirements = function (buildingLevel, grade) {
    removeResourceLink(this.requirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processTickRewards = function (buildingLevel, grade) {
    var r = [];
    var m = 1;

    r = r.concat(this.rewards);

    for (var t = 0; t < this.upgrades.length; t++) {
        if (this.upgrades[t].upgradeType == UPGRADE_TYPE_NEW_REWARD) {
            if (this.upgrades[t].level > 0) {

                if (this.upgrades[t].rewards != null)
                    r = r.concat(this.upgrades[t].rewards);
                m *= this.upgrades[t].getMulNumber();
            }
        }
    }

    addResourceLink(r, buildingLevel, this.getGradeExtraAmount(grade) * m);
}

buildingInformation.prototype.processParticleOutput = function (particleId, particleLevel) {
    for (var i = 0; i < this.particleOutput.length; i++) {
        if (this.particleOutput[i].particleId == particleId) {
            addResourceLink(this.particleOutput[i].rewards, particleLevel);
        }
    }

    for (var t = 0; t < this.upgrades.length; t++) {
        if (this.upgrades[t].upgradeType == UPGRADE_TYPE_NEW_POUTPUT) {
            if (this.upgrades[t].level > 0) {

                if (this.upgrades[t].particleOutput.particleId == particleId) {
                    addResourceLink(this.upgrades[t].particleOutput.rewards, particleLevel, this.upgrades[t].getMulNumber());
                }

            }
        }
    }
}

buildingInformation.prototype.getCostRequirementsString = function (grade) {
    return getResourceLinkString(this.costRequirements, this.buildAmount, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.getUpgradeRequirementsString = function (buildingLevel, grade) {
    return getResourceLinkString(this.upgradeRequirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.getTickRequirementsString = function (buildingLevel, grade) {
    return getResourceLinkString(this.requirements, buildingLevel, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.getTickRewardsString = function (buildingLevel, grade) {
    var r = [];
    var m = 1;

    r = r.concat(this.rewards);

    for (var t = 0; t < this.upgrades.length; t++) {
        if (this.upgrades[t].upgradeType == UPGRADE_TYPE_NEW_REWARD) {
            if (this.upgrades[t].level > 0) {

                if (this.upgrades[t].rewards != null)
                    r = r.concat(this.upgrades[t].rewards);
                m *= this.upgrades[t].getMulNumber();

            }
        }
    }

    return getResourceLinkString(r, buildingLevel, this.getGradeExtraAmount(grade) * m);
}

buildingInformation.prototype.canBuildHere = function (mapGrid) {
    for (var i = 0; i < this.buildOnCellIsType.length; i++) {
        if (this.buildOnCellIsType[i] == cells[mapGrid.cellId].type)
            return true;
    }

    return false;
}

function getBuildingFromId(id) {
    for (var t = 0; t < buildings.length; t++) {
        if (buildings[t].id == id)
            return buildings[t];
    }

    return null;
}

function loadBuildings() {
    var newItem;

    // !!!

    newItem = new buildingInformation();
    newItem.id = 0;
    newItem.name = "Axe";
    //newItem.description = "Red particle: 10% coal generation.";
    newItem.helpDescription = "Need to be connected to a storage directly or with a pipe.";
    newItem.imageName = ["building_0"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10, true), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaPow(1, 4, 30, true), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_WOOD, new formulaPow0(1, 2, 0), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(0, 1, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_TREE];
    //newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, new formulaLinear(0, 1), 0.1)]));
    newItem.upgrades.push(createBuildingUpgrade_ParticleOutput("Burning of trees", "Put red particle to have a 10% of gaining coal.", 10,
        new formulaLinear(10, 100),
        createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, new formulaLinear(0, 1), 1)]),
        new formulaLinear(1, 1)));
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 1;
    newItem.name = "Quarry";
    newItem.description = "Blue particle: 10% ore generation.";
    newItem.helpDescription = "Need to be connected to a storage directly or with a pipe.";
    newItem.imageName = ["building_1"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaPow(1, 4, 30, true), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_STONE, new formulaPow0(1, 2, 0), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_STONE, new formulaLinear(0, 1, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_MOUNTAIN];
    newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_BLUE, [createResourceLink(RESOURCE_ORE, new formulaLinear(0, 1), 0.1)]));
    //newItem.upgrades.push(createBuildingUpgrade("Burning of trees", "Use red mana to give some coal.", 10, new formulaLinear(10, 100)));
    newItem.upgrades.push(createBuildingUpgrade_Reward("Increase Production", "Increase production of stone.", 10,
        new formulaLinear(1, 10),
        createResourceLink(RESOURCE_STONE, new formulaLinear(0, 1, 0), 1.0),
        new formulaLinear(1, 1)));
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 2;
    newItem.name = "Resource Pipe";
    newItem.description = "Transfer resource to/from storage unit.";
    newItem.imageName = ["building_2"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaQuadratic(2, 10, true), 1.0));
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaQuadratic(2, 10, true), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaPow(1, 3, 20, true), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaPow(1, 3, 20, true), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND, CELL_TYPE_SAND, CELL_TYPE_SMALLOBSTACLE];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 3;
    newItem.name = "Storage";
    newItem.imageName = ["building_3"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaPow(10, 4, 0, true), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 4;
    newItem.name = "Essence Pull";
    newItem.description = "Pull magic essence out of the land";
    newItem.imageName = ["building_4", "building_19", "building_20", "building_21", "building_22"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.extractCellParticle = true;
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_DARKPOUND];
    newItem.needStorage = false;
    newItem.maxGradeLevel = 4;
    newItem.upgrades.push(createBuildingUpgrade_Grade("Increase Grade", "Increase grade.", 4, new formulaLinear(10, 100)));
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 5;
    newItem.name = "Saw Mill";
    newItem.imageName = ["building_5"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_PLANK, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 6;
    newItem.name = "Underground Pipe";
    newItem.description = "Transfer resource to/from storage unit underground.";
    newItem.imageName = ["building_6"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_TREE, CELL_TYPE_MOUNTAIN, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_GROUND, CELL_TYPE_OBSTACLE, CELL_TYPE_DARKPOUND, CELL_TYPE_SAND, CELL_TYPE_TRASH, CELL_TYPE_SMALLOBSTACLE];
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 7;
    newItem.name = "Green Mana Push";
    newItem.imageName = ["building_7", "building_27", "building_28", "building_29", "building_30"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.generateParticleId = PARTICLE_GREEN;
    newItem.maxGradeLevel = 4;
    //newItem[7].needStorage = false;
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 8;
    //newItem.name = "Green Converter";
    //newItem.imageName = ["building_8"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_GREENMANA, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 9;
    newItem.name = "Blue Mana Push";
    newItem.imageName = ["building_9", "building_23", "building_24", "building_25", "building_26"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.generateParticleId = PARTICLE_BLUE;
    newItem.maxGradeLevel = 4;
    //newItem[9].needStorage = false;
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 10;
    //newItem.name = "Blue Converter";
    //newItem.imageName = ["building_10"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(0, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_BLUEMANA, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 11;
    newItem.name = "Red Mana Push";
    newItem.imageName = ["building_11", "building_31", "building_32", "building_33", "building_34"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.generateParticleId = PARTICLE_RED;
    newItem.maxGradeLevel = 4;
    //newItem[11].needStorage = false;
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 12;
    //newItem.name = "Red Converter";
    //newItem.imageName = ["building_12"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_REDMANA, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //buildings.push(newItem);

    //// !!! == TO DELETE
    //newItem = new buildingInformation();
    //newItem.id = 13;
    //newItem.name = "Water Pump";
    //newItem.imageName = ["building_13"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_WATER];
    //buildings.push(newItem);

    //// !!! == TO DELETE
    //newItem = new buildingInformation();
    //newItem.id = 14;
    //newItem.name = "Water Generator";
    //newItem.imageName = ["building_14"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS];
    //buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 15;
    newItem.name = "Grab Essence";
    newItem.imageName = ["building_15"];
    newItem.description = "Grab essence from the air for storage.";
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_GREEN, [createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 1), 1.0)]));
    newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_BLUE, [createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(0, 1), 1.0)]));
    newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 1), 1.0)]));
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 16;
    newItem.name = "Masson";
    newItem.imageName = ["building_16"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_BLOCK, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 17;
    newItem.name = "Iron Factory";
    newItem.imageName = ["building_17"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_PLANK, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_BLOCK, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_PLANK, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_BLOCK, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_ORE, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_COAL, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_IRON, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 18;
    newItem.name = "Steam Energy";
    newItem.description = "Grab steam from the air for energy.";
    newItem.imageName = ["building_18"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_STEAM, [createResourceLink(RESOURCE_ENERGY, new formulaLinear(0, 1), 1.0)]));
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 19;
    //newItem.name = "Essence Pull II";
    //newItem.description = "Pull magic essence out of the land";
    //newItem.imageName = ["building_19"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.extractCellParticle = true;
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_DARKPOUND];
    //newItem.gradeLevel = 1;
    //newItem.needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 20;
    //newItem.name = "Essence Pull III";
    //newItem.description = "Pull magic essence out of the land";
    //newItem.imageName = ["building_20"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.extractCellParticle = true;
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_DARKPOUND];
    //newItem.gradeLevel = 2;
    //newItem.needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 21;
    //newItem.name = "Essence Pull IV";
    //newItem.description = "Pull magic essence out of the land";
    //newItem.imageName = ["building_21"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.extractCellParticle = true;
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_DARKPOUND];
    //newItem.gradeLevel = 3;
    //newItem.needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 22;
    //newItem.name = "Essence Pull V";
    //newItem.description = "Pull magic essence out of the land";
    //newItem.imageName = ["building_22"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.extractCellParticle = true;
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_WATER, CELL_TYPE_LAVA, CELL_TYPE_DARKPOUND];
    //newItem.gradeLevel = 4;
    //newItem.needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 23;
    //newItem.name = "Blue Mana Push II";
    //newItem.imageName = ["building_23"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_BLUE;
    //newItem.gradeLevel = 1;
    ////newItem[23].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 24;
    //newItem.name = "Blue Mana Push III";
    //newItem.imageName = ["building_24"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_BLUE;
    //newItem.gradeLevel = 2;
    ////newItem[24].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 25;
    //newItem.name = "Blue Mana Push IV";
    //newItem.imageName = ["building_25"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_BLUE;
    //newItem.gradeLevel = 3;
    ////newItem[25].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 26;
    //newItem.name = "Blue Mana Push V";
    //newItem.imageName = ["building_26"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_BLUE;
    //newItem.gradeLevel = 4;
    ////newItem[26].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 27;
    //newItem.name = "Green Mana Push II";
    //newItem.imageName = ["building_27"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_GREEN;
    //newItem.gradeLevel = 1;
    ////newItem[27].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 28;
    //newItem.name = "Green Mana Push III";
    //newItem.imageName = ["building_28"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_GREEN;
    //newItem.gradeLevel = 2;
    ////newItem[28].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 29;
    //newItem.name = "Green Mana Push IV";
    //newItem.imageName = ["building_29"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_GREEN;
    //newItem.gradeLevel = 3;
    ////newItem[29].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 30;
    //newItem.name = "Green Mana Push V";
    //newItem.imageName = ["building_30"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_GREEN;
    //newItem.gradeLevel = 4;
    ////newItem[30].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 31;
    //newItem.name = "Red Mana Push II";
    //newItem.imageName = ["building_31"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_RED;
    //newItem.gradeLevel = 1;
    ////newItem[31].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 32;
    //newItem.name = "Red Mana Push III";
    //newItem.imageName = ["building_32"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_RED;
    //newItem.gradeLevel = 2;
    ////newItem[32].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 33;
    //newItem.name = "Red Mana Push IV";
    //newItem.imageName = ["building_33"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_RED;
    //newItem.gradeLevel = 3;
    ////newItem[33].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 34;
    //newItem.name = "Red Mana Push V";
    //newItem.imageName = ["building_34"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_RED;
    //newItem.gradeLevel = 4;
    ////newItem[34].needStorage = false;
    //buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 35;
    newItem.name = "Gear";
    newItem.imageName = ["building_35"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_IRON, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_GEAR, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 36;
    //newItem.name = "Time Converter";
    //newItem.imageName = ["building_36"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(0, 10), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_TIMEMANA, new formulaLinear(0, 1), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 37;
    newItem.name = "Time Mana Push";
    newItem.imageName = ["building_37", "building_38", "building_39", "building_40", "building_41"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.generateParticleId = PARTICLE_TIME;
    newItem.maxGradeLevel = 4;
    //newItem[37].needStorage = false;
    buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 38;
    //newItem.name = "Time Mana Push II";
    //newItem.imageName = ["building_38"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_TIME;
    //newItem.gradeLevel = 1;
    ////newItem[38].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 39;
    //newItem.name = "Time Mana Push III";
    //newItem.imageName = ["building_39"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_TIME;
    //newItem.gradeLevel = 2;
    ////newItem[39].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 40;
    //newItem.name = "Time Mana Push IV";
    //newItem.imageName = ["building_40"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_TIME;
    //newItem.gradeLevel = 3;
    ////newItem[40].needStorage = false;
    //buildings.push(newItem);

    //// !!!
    //newItem = new buildingInformation();
    //newItem.id = 41;
    //newItem.name = "Time Mana Push V";
    //newItem.imageName = ["building_41"];
    //newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    //newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    //newItem.requirements.push(createResourceLink(RESOURCE_TIMEESSENCE, new formulaLinear(8, 0), 1.0));
    //newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_TIME;
    //newItem.gradeLevel = 4;
    ////newItem[41].needStorage = false;
    //buildings.push(newItem);
}