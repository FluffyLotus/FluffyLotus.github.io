var buildings = [];

var BUILDING_AXE = 0
var BUILDING_PICKAXE = 1;
var BUILDING_STORAGE = 2;
var BUILDING_ROAD = 3;
var BUILDING_TOWER1 = 4;
var BUILDING_TOWER2 = 5;
var BUILDING_SPAWNSTART = 6;
        // TODO: Not needed, remove
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
	this.imageRef = null;
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
	for (var t = 0; t < buildingData.length; t++) {
		var item = new BuildingInfo();

		item.id = buildingData[t].id;
		item.name = buildingData[t].n;
		item.description = buildingData[t].d;
		item.timerType = buildingData[t].tt;
		item.actionTime = buildingData[t].at;
		item.processOnCellType[0] = buildingData[t].pc;
		item.isUserOwned = buildingData[t].uo;
		item.canUpgrade = buildingData[t].cu;
		item.needConnection = buildingData[t].nc;
		item.storage = buildingData[t].is;
		item.connection = buildingData[t].ic;
		item.canSpawn = buildingData[t].cs;
		item.keepActionReady = buildingData[t].ka;
		item.imageId = buildingData[t].im;

		for (var tt = 0; tt < buildingData[t].co.length; tt++) {
			item.cost.push(createDataLink(buildingData[t].co[tt].t, buildingData[t].co[tt].st, buildingData[t].co[tt].o, buildingData[t].co[tt].a));
		}

		for (var tt = 0; tt < buildingData[t].rq.length; tt++) {
			item.requirement.push(createDataLink(buildingData[t].rq[tt].t, buildingData[t].rq[tt].st, buildingData[t].rq[tt].o, buildingData[t].rq[tt].a));
		}

		for (var tt = 0; tt < buildingData[t].rw.length; tt++) {
			item.reward.push(createDataLink(buildingData[t].rw[tt].t, buildingData[t].rw[tt].st, buildingData[t].rw[tt].o, buildingData[t].rw[tt].a));
		}

		buildings.push(item);
	}

	buildings[BUILDING_AXE].isVisible = true;
	buildings[BUILDING_PICKAXE].isVisible = true;
	buildings[BUILDING_STORAGE].isVisible = true;

	/*
	var item;

	item = new BuildingInfo();
	item.id = 0;
	item.name = "Axe";
	item.description = "Build on a tree to gather wood.";
	item.actionTime = 1000;
	item.imageId = "axe";
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
	item.description = "Build on a mountain to gather stone.";
	item.actionTime = 1000;
	item.imageId = "pickaxe";
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
	item.description = "Store gathered resources.";
	item.imageId = "storage";
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.storage = true;
	item.isUserOwned = true;
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 10));
	item.isVisible = true;
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 3;
	item.name = "Road";
	item.description = "Help transfering resources from buildings to the storage unit.";
	item.imageId = "road";
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.connection = true;
	item.isUserOwned = true;
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 10));
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 4;
	item.name = "Tower 1";
	item.description = "Deals 1 damage per level to one nearby enemies.";
	item.timerType = TRACLER_TYPE_DELAY;
	item.actionTime = 1000;
	item.imageId = "tower";
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
	item.description = "Deals 1 damage per level to all nearby enemies.";
	item.timerType = TRACLER_TYPE_DELAY;
	item.actionTime = 1000;
	item.imageId = "tower2";
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
	item.description = "Enemies will start spawning here.";
	item.actionTime = 5000;
	item.canSpawn = true;
	item.keepActionReady = true;
	item.imageId = "crystal";
	buildings.push(item);

        // TODO: Not needed, remove
	item = new BuildingInfo();
	item.id = 7;
	item.name = "Spawn End";
	item.description = "When the map has no more life, it will explode and all building will disapear.";
	item.imageId = "crystal2";
	buildings.push(item);

	item = new BuildingInfo();
	item.id = 8;
	item.name = "Plank";
	item.description = "Converts wood to plank.";
	item.actionTime = 1000;
	item.imageId = "plank";
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
	item.description = "Converts wood to coal.";
	item.actionTime = 1000;
	item.imageId = "coal";
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
	item.description = "Converts stone to block.";
	item.actionTime = 1000;
	item.imageId = "block";
	item.needConnection = true;
	item.canUpgrade = true;
	item.isUserOwned = true;
	item.processOnCellType = [STATE_TYPE_GROUND];
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_WOOD, 400));
	item.cost.push(createDataLink_ResourceAmount(RESOURCE_STONE, 400));
	item.requirement.push(createDataLink_ResourceAmount(RESOURCE_STONE, 8));
	item.reward.push(createDataLink_ResourceAmount(RESOURCE_BLOCK, 1));
	buildings.push(item);
	*/
}

function finishInitBuilding() {
	for (var t = 0; t < buildings.length; t++) {
		buildings[t].imageRef = getImageFromName(buildings[t].imageId);

		finishDataLinksInit(buildings[t].cost);
		finishDataLinksInit(buildings[t].requirement);
		finishDataLinksInit(buildings[t].reward);
	}
}