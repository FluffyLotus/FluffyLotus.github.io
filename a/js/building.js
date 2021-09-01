var buildings = [];

var BUILDING_AXE = 0
var BUILDING_PICKAXE = 1;
var BUILDING_STORAGE = 2;
var BUILDING_ROAD = 3;
var BUILDING_TOWER1 = 4;
var BUILDING_TOWER2 = 5;
var BUILDING_SPAWNSTART = 6;
var BUILDING_SPAWNEND = 7;
var BUILDING_PLANK = 8;
var BUILDING_COAL = 9;
var BUILDING_BLOCK = 10;

function BuildingInfo() {
	this.id = 0;
	this.name = "";
	this.description = "";

	this.timerType = TRACKER_TYPE_MODULO;
	this.actionTime = 0;

	this.processOnCellType = [];
	this.imageId = -1;
	this.isVisible = false;

	this.isUserOwned = false;
	this.canUpgrade = false;
	this.needConnection = false;
	this.storage = false;
	this.connection = false;
	this.canSpawn = false;
	this.keepActionReady = false; // Keep the flag on until the action is needed

	this.cost = [];
	this.requirement = [];
	this.reward = [];

	this.totalCount = 0;
}

BuildingInfo.prototype.getBuildCost = function () {
	var ret = duplicateDataLinks(this.cost);
	
	if (this.id == BUILDING_STORAGE) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(4, this.totalCount) * 10);
		}
	}
	else if (this.id == BUILDING_ROAD) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(1.13, this.totalCount) * 10);
		}
	}

	return ret;
}

BuildingInfo.prototype.getUpgradeCost = function (level) {
	var ret = this.getBuildCost();

	if (this.id == BUILDING_AXE || this.id == BUILDING_PICKAXE) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(2.5, level) * 20);
		}
	}
	else if (this.id == BUILDING_PLANK || this.id == BUILDING_BLOCK) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(2.5, level) * 400);
		}
	}
	else if (this.id == BUILDING_TOWER1 || this.id == BUILDING_TOWER2) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(2.5, level) * 4);
		}
	}
	else if (this.id == BUILDING_COAL) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(2.5, level) * 5000);
		}
	}
	else {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount *= level + 1;
		}
	}

	return ret;
}

BuildingInfo.prototype.getReward = function (level) {
	var ret = duplicateDataLinks(this.reward);

	if (this.id == BUILDING_AXE || this.id == BUILDING_PICKAXE) {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount = parseInt(Math.pow(2, level-1));
	}
	else {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount *= level;
	}

	return ret;
}

BuildingInfo.prototype.getRequirement = function (level) {
	var ret = duplicateDataLinks(this.requirement);

	if (this.id == BUILDING_PLANK || this.id == BUILDING_BLOCK) {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount = parseInt(Math.pow(2, level - 1)) * 8;
	}
	else if (this.id == BUILDING_COAL) {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount = parseInt(Math.pow(2, level - 1)) * 8;
	}
	else if (this.id == BUILDING_TOWER1 || this.id == BUILDING_TOWER1) {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount *= level * level;
	}
	else {
		for (var i = 0; i < ret.length; i++)
			ret[i].amount *= level;
	}

	return ret;
}

BuildingInfo.prototype.process = function (level) {
	if (hasDataLinks(this.getRequirement(level))) {
		removeDataLinks(this.getRequirement(level));
		addDataLinks(this.getReward(level));
	}
}

BuildingInfo.prototype.canBuy = function () {
	return hasDataLinks(this.cost);
}

BuildingInfo.prototype.buy = function () {
	if (this.canBuy()) {
		removeDataLinks(this.cost);
		this.totalCount++;
	}
}

BuildingInfo.prototype.destroy = function () {
	this.totalCount--;
}

function getBuildingFromId(id) {
	for (var i = 0; i < buildings.length; i++) {
		if (buildings[i].id == id)
			return buildings[i];
	}

	return null;
}

function initBuilding() {
	var item;

	item = new BuildingInfo();
	item.id = 0;
	item.name = "Axe";
	item.description = "Put the building on a tree to get wood";
	item.actionTime = 1000;
	item.imageId = IMAGE_AXE;
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_TREE];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 20));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 1));
	item.isVisible = true;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 1;
	item.name = "Pickaxe";
	item.description = "Put the building on a mountain to get stone";
	item.actionTime = 1000;
	item.imageId = IMAGE_PICKAXE;
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_ROCK];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 20));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_STONE, 1));
	item.isVisible = true;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 2;
	item.name = "Storage";
	item.description = "Store resources";
	item.imageId = IMAGE_STORAGE;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.storage = true;
	item.isUserOwned = true;
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 10));
	item.isVisible = true;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 3;
	item.name = "Road";
	item.description = "Pass resource";
	item.imageId = IMAGE_ROAD;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.connection = true;
	item.isUserOwned = true;
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 10));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 4;
	item.name = "Tower 1";
	item.description = "Deals 1 damage per level to one nearby enemies";
	item.timerType = TRACLER_TYPE_DELAY;
	item.actionTime = 1000;
	item.imageId = IMAGE_TOWER;
	item.needConnection = true;
	item.canUpgrade = true;
	item.keepActionReady = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 1));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_PLANK, 4));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 5;
	item.name = "Tower 2";
	item.description = "Deals 1 damage per level to all nearby enemies";
	item.timerType = TRACLER_TYPE_DELAY;
	item.actionTime = 1000;
	item.imageId = IMAGE_TOWER2;
	item.needConnection = true;
	item.canUpgrade = true;
	item.keepActionReady = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 8));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_PLANK, 4));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_BLOCK, 4));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 6;
	item.name = "Spawn Start";
	item.actionTime = 5000;
	item.canSpawn = true;
	item.keepActionReady = true;
	item.imageId = IMAGE_CRYSTAL;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 7;
	item.name = "Spawn End";
	item.imageId = IMAGE_CRYSTAL2;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 8;
	item.name = "Plank";
	item.description = "Convert wood to plank";
	item.actionTime = 1000;
	item.imageId = IMAGE_PLANK;
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 400));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 400));
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 8));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_PLANK, 1));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 9;
	item.name = "Coal";
	item.description = "Convert wood to coal";
	item.actionTime = 1000;
	item.imageId = IMAGE_COAL;
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 5000));
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 8));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_COAL, 1));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 10;
	item.name = "Block";
	item.description = "Convert stone to block";
	item.actionTime = 1000;
	item.imageId = IMAGE_BLOCK;
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 400));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 400));
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_STONE, 8));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_BLOCK, 1));
	buildings.push(item);
}