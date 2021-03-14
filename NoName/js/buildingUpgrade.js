var UPGRADE_TYPE_GRADE = 1;
var UPGRADE_TYPE_NEW_REWARD = 2;
var UPGRADE_TYPE_NEW_POUTPUT = 3;
var UPGRADE_TYPE_REDUCE_REQUIREMENTS = 4;

function buildingUpgrade() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.maxLevel = 0;
    this.level = 0;
    this.shardFormula = null;

    this.upgradeType = 0;
    this.reward = null;
    this.particleOutput = null;
    this.levelMulFormula = null;
}

buildingUpgrade.prototype.getUpgradeShardAmount = function () {
    return this.shardFormula.getResult(this.level);
}

buildingUpgrade.prototype.isMaxLevel = function () {
    if (this.level < this.maxLevel)
        return false;
    return true;
}

buildingUpgrade.prototype.canUpgrade = function () {
    if (this.isMaxLevel())
        return false;
    if (getResourceFromId(RESOURCE_SHARD).amount < this.getUpgradeShardAmount())
        return false;
    return true;
}

buildingUpgrade.prototype.upgrade = function () {
    if (!this.canUpgrade())
        return false;

    getResourceFromId(RESOURCE_SHARD).addAmount(-this.getUpgradeShardAmount());
    this.level += 1;

    return true;
}

buildingUpgrade.prototype.getFullName = function () {
    return this.name + ", " + (this.level) + " / " + this.maxLevel;
}

buildingUpgrade.prototype.getMulNumber = function () {
    if (this.levelMulFormula == null)
        return 1;
    return this.levelMulFormula.getResult(this.level);
}

function getBuildingUpgradeFromId(id) {
    for (var t = 0; t < buildings.length; t++) {
        for (var tt = 0; tt < buildings[t].upgrades.length; tt++) {
            if (buildings[t].upgrades[tt].id == id)
                return buildings[t].upgrades[tt];
        }
    }

    return null;
}

function createBuildingUpgrade(itemId, name, description, maxLevel, shardFormula) {
    var item = new buildingUpgrade();

    item.id = itemId;
    item.name = name;
    item.description = description;
    item.maxLevel = maxLevel;
    item.shardFormula = shardFormula;

    return item;
}

function createBuildingUpgrade_Grade(itemId, name, description, maxLevel, shardFormula) {
    var item = new buildingUpgrade();

    item.id = itemId;
    item.name = name;
    item.description = description;
    item.maxLevel = maxLevel;
    item.shardFormula = shardFormula;
    item.upgradeType = UPGRADE_TYPE_GRADE;

    return item;
}

function createBuildingUpgrade_ParticleOutput(itemId, name, description, maxLevel, shardFormula, particleOutput, levelMulFormula) {
    var item = new buildingUpgrade();

    item.id = itemId;
    item.name = name;
    item.description = description;
    item.maxLevel = maxLevel;
    item.shardFormula = shardFormula;
    item.upgradeType = UPGRADE_TYPE_NEW_POUTPUT;
    item.particleOutput = particleOutput;
    item.levelMulFormula = levelMulFormula;
    
    return item;
}

function createBuildingUpgrade_Reward(itemId, name, description, maxLevel, shardFormula, reward, levelMulFormula) {
    var item = new buildingUpgrade();

    item.id = itemId;
    item.name = name;
    item.description = description;
    item.maxLevel = maxLevel;
    item.shardFormula = shardFormula;
    item.upgradeType = UPGRADE_TYPE_NEW_REWARD;
    item.reward = reward;
    item.levelMulFormula = levelMulFormula; // multiplier

    return item;
}

