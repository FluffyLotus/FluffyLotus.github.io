var BUILDING_NONE = -1;
var BUILDING_AXE = 0;
var BUILDING_PICK = 1;
var BUILDING_STORAGEPIPE = 2;
var BUILDING_STORAGE = 3;
var BUILDING_ESSENCEPULL1 = 4;
var BUILDING_SAWMILL = 5;
var BUILDING_UNDERGROUNDPIPE = 6;
var BUILDING_GREENPUSH1 = 7;
var BUILDING_BLUEPUSH1 = 9;
var BUILDING_REDPUSH1 = 11;
var BUILDING_ESSENCEGRAB = 15;
var BUILDING_STONEMASSON = 16;
var BUILDING_IRON = 17;
var BUILDING_STEAMENERGY = 18;
var BUILDING_GEAR = 35;
var BUILDING_TIMEPUSH1 = 37;
var BUILDING_SHOVLE = 42;
var BUILDING_GLASS = 43;
var BUILDING_PRISM = 44;
var BUILDING_WAREHOUSE = 45;
var BUILDING_CONCRETE = 46;
var BUILDING_SPECIALMETAL = 47;
var BUILDING_FAN = 48;
var BUILDING_BLACKPUSH = 49;
var BUILDING_CRANE = 54;
// Machinist: gear + iron = piston

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

    this.buildingInstances = [];
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

buildingInformation.prototype.addBuildingInstance = function (buildingInst) {
    this.buildingInstances.push(buildingInst);
}

buildingInformation.prototype.removeBuildingInstance = function (buildingInst) {
    for (var t = 0; t < this.buildingInstances.length; t++) {
        if (this.buildingInstances[t].id == buildingInst.id) {
            this.buildingInstances.splice(t, 1);
            break;
        }
    }
}

buildingInformation.prototype.hasCost = function (grade) {
    return hasResourceLink(this.costRequirements, this.buildingInstances.length, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processCost = function (grade) {
    removeResourceLink(this.costRequirements, this.buildingInstances.length, this.getGradeExtraAmount(grade));
}

buildingInformation.prototype.processSellCost = function (grade) {
    addResourceLink(this.costRequirements, this.buildingInstances.length, this.getGradeExtraAmount(grade));
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
    return getResourceLinkString(this.costRequirements, this.buildingInstances.length, this.getGradeExtraAmount(grade));
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
    newItem.name = "Pick";
    //newItem.description = "Blue particle: 10% ore generation.";
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
    newItem.description = "Store an amount of resources and increase the resource limit by 500.";
    newItem.imageName = ["building_3"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaPow(10, 4, 0, true), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaPow(1, 7, 100, true), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaPow(1, 7, 100, true), 1.0));
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

    newItem = new buildingInformation();
    newItem.id = 42;
    newItem.name = "Shovle";
    //newItem.description = "Red particle: 10% coal generation.";
    newItem.helpDescription = "Get sand.";
    newItem.imageName = ["building_42"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10, true), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaPow(1, 4, 30, true), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_WOOD, new formulaPow0(1, 2, 0), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_SAND, new formulaLinear(0, 1, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_SAND];
    //newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, new formulaLinear(0, 1), 0.1)]));
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 43;
    newItem.name = "Glass";
    newItem.imageName = ["building_43"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_SAND, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_GLASS, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 44;
    newItem.name = "Prism";
    newItem.imageName = ["building_44"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_GREENESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_REDESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_DARKESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_LIGHTESSENCE, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 45;
    newItem.name = "Warehouse";
    newItem.imageName = ["building_45"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 46;
    newItem.name = "Concrete";
    newItem.imageName = ["building_46"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_IRON, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_BLUEESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_CONCRETE, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 47;
    newItem.name = "Special Forge";
    newItem.imageName = ["building_47"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_GLASS, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_IRON, new formulaLinear(0, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_DARKESSENCE, new formulaLinear(0, 10), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_SPECIALMETAL, new formulaLinear(0, 1), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 48;
    newItem.name = "Fan";
    newItem.imageName = ["building_48"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_ENERGY, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    //newItem.generateParticleId = PARTICLE_WIND;
    buildings.push(newItem);

    // !!!
    newItem = new buildingInformation();
    newItem.id = 49;
    newItem.name = "Black Mana Push";
    newItem.imageName = ["building_49", "building_50", "building_51", "building_52", "building_53"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 100), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_WOOD, new formulaLinear(10, 10), 1.0));
    newItem.requirements.push(createResourceLink(RESOURCE_DARKESSENCE, new formulaLinear(8, 0), 1.0));
    newItem.buildOnCellIsType = [CELL_TYPE_GRASS, CELL_TYPE_GROUND];
    newItem.generateParticleId = PARTICLE_BLACK;
    newItem.maxGradeLevel = 4;
    //newItem[11].needStorage = false;
    buildings.push(newItem);

    newItem = new buildingInformation();
    newItem.id = 54;
    newItem.name = "Crane";
    //newItem.description = "Red particle: 10% coal generation.";
    newItem.helpDescription = "Scrap processor: random chance to get items.";
    newItem.imageName = ["building_54"];
    newItem.costRequirements.push(createResourceLink(RESOURCE_STONE, new formulaLinear(10, 10, true), 1.0));
    newItem.upgradeRequirements.push(createResourceLink(RESOURCE_STONE, new formulaPow(1, 4, 30, true), 1.0));
    //newItem.rewards.push(createResourceLink(RESOURCE_WOOD, new formulaPow0(1, 2, 0), 1.0));
    newItem.rewards.push(createResourceLink(RESOURCE_GLASS, new formulaLinear(0, 1, 0), 0.01));
    newItem.rewards.push(createResourceLink(RESOURCE_GEAR, new formulaLinear(0, 1, 0), 0.01));
    newItem.rewards.push(createResourceLink(RESOURCE_IRON, new formulaLinear(0, 1, 0), 0.01));
    newItem.rewards.push(createResourceLink(RESOURCE_BLOCK, new formulaLinear(0, 1, 0), 0.01));
    newItem.rewards.push(createResourceLink(RESOURCE_ORE, new formulaLinear(0, 1, 0), 0.01));
    newItem.rewards.push(createResourceLink(RESOURCE_COAL, new formulaLinear(0, 1, 0), 0.01));
    newItem.buildOnCellIsType = [CELL_TYPE_TRASH];
    //newItem.particleOutput.push(createBuildingParticleOutput(PARTICLE_RED, [createResourceLink(RESOURCE_COAL, new formulaLinear(0, 1), 0.1)]));
    buildings.push(newItem);
}
