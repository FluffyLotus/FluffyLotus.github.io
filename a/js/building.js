var buildings = [];

var BUILDING_AXE = 0
var BUILDING_PICKAXE = 1;
var BUILDING_STORAGE = 2;
//var BUILDING_ROAD = 3;
var BUILDING_TOWER1 = 4;
var BUILDING_TOWER2 = 5;
//var BUILDING_SPAWNSTART = 6;
//        // TODO: Not needed, remove
//var BUILDING_SPAWNEND = 7;
//var BUILDING_PLANK = 8;
//var BUILDING_COAL = 9;
//var BUILDING_BLOCK = 10;

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

	this.powerCostPerUnit = 0;

	this.cost = [];
	this.requirement = [];
	this.reward = [];

	this.totalCount = 0;
}

BuildingInfo.prototype.getBuildCost = function () {
	var ret = duplicateDataLinks(this.cost);

	if (this.powerCostPerUnit > 0) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(this.powerCostPerUnit, this.totalCount) * ret[i].amount);
		}
	}

	return ret;
}

BuildingInfo.prototype.getUpgradeCost = function (level) {
	var ret = this.getBuildCost();

	if (this.powerUpgradePerLevel > 0) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(this.powerUpgradePerLevel, level) * ret[i].amount);
		}
	}

	return ret;
}

BuildingInfo.prototype.getReward = function (level) {
	var ret = duplicateDataLinks(this.reward);

	if (this.powerRewardPerLevel > 0) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(this.powerRewardPerLevel, level - 1) * ret[i].amount);
		}
	}

	return ret;
}

BuildingInfo.prototype.getRequirement = function (level) {
	var ret = duplicateDataLinks(this.requirement);

	if (this.powerRequirementPerLevel > 0) {
		for (var i = 0; i < ret.length; i++) {
			ret[i].amount = parseInt(Math.pow(this.powerRequirementPerLevel, level - 1) * ret[i].amount);
		}
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

		item.powerCostPerUnit = buildingData[t].cop;
		item.powerUpgradePerLevel = buildingData[t].upp;
		item.powerRequirementPerLevel = buildingData[t].rqp;
		item.powerRewardPerLevel = buildingData[t].rwp;

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
}

function finishInitBuilding() {
	for (var t = 0; t < buildings.length; t++) {
		buildings[t].imageRef = getImageFromName(buildings[t].imageId);

		finishDataLinksInit(buildings[t].cost);
		finishDataLinksInit(buildings[t].requirement);
		finishDataLinksInit(buildings[t].reward);
	}
}