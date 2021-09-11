var STATE_TYPE_NONE = 0;
var STATE_TYPE_ROCK = 1;
var STATE_TYPE_TREE = 2;
var STATE_TYPE_GROUND = 3;
var STATE_TYPE_WATER = 4;

var cellStates = [];

function CellStateInfo() {
	this.id = 0;
	this.name = "";
	this.editorName = "";
	this.typeId = STATE_TYPE_NONE;
	this.floorImageId = "";
	this.objectImageId = "";
	this.editorImageId = "";
	this.clickActionId = -1;

	this.enemyPath = false;
	this.enemyPathEnd = false;

	this.questId = -1;

	this.initialBuilding = -1;
	this.actionTimerFrom = -1;
	this.actionTimerTo = -1;

	this.changeStateOnClickAction = -1;
	this.changeStateOnTimerAction = -1;
	this.changeStateOnQuestAction = -1;

	this.effectCloud = false;

	this.floorImageRef = null;
	this.objectImageRef = null;
	this.editorImageRef = null;
	this.clickActionRef = null;
	this.questRef = null;
}

CellStateInfo.prototype.processClick = function () {
	if (this.questRef != null) {
		this.questRef.clickCount += 1;
	}

	if (this.clickActionId >= 0) {
		if (this.clickActionRef == null)
			alert(this.clickActionId);
		var action = this.clickActionRef;

		action.process();
		return true;
	}

	return false;
}

function getCellStateTypeName(typeId) {
	if (typeId == STATE_TYPE_NONE)
		return "None";
	if (typeId == STATE_TYPE_ROCK)
		return "Rock";
	if (typeId == STATE_TYPE_TREE)
		return "Tree";
	if (typeId == STATE_TYPE_GROUND)
		return "Ground";
	if (typeId == STATE_TYPE_WATER)
		return "Water";

	return "";
}

function getCellStateFromId(id) {
	for (var i = 0; i < cellStates.length; i++) {
		if (cellStates[i].id == id)
			return cellStates[i];
	}

	return null;
}

function initCellStates() {
	for (var t = 0; t < cellStateData.length; t++) {
		var item = new CellStateInfo();

		item.id = cellStateData[t].id;
		item.name = cellStateData[t].n;
		item.description = cellStateData[t].d
		item.typeId = cellStateData[t].ty;
		item.floorImageId = cellStateData[t].fi;
		item.objectImageId = cellStateData[t].oi;
		item.clickActionId = cellStateData[t].ca;
		item.enemyPath = cellStateData[t].ep;
		item.enemyPathEnd = cellStateData[t].epe;
		item.questId = cellStateData[t].qu;
		item.initialBuilding = cellStateData[t].ib;
		item.actionTimerFrom = cellStateData[t].atf;
		item.actionTimerTo = cellStateData[t].att;
		item.changeStateOnClickAction = cellStateData[t].csc;
		item.changeStateOnTimerAction = cellStateData[t].tsc;
		item.changeStateOnQuestAction = cellStateData[t].qsc;
		item.effectCloud = cellStateData[t].ec;

		cellStates.push(item);
	}
} 

function finishInitCellStates() {
	for (var t = 0; t < cellStates.length; t++) {
		cellStates[t].floorImageRef = getImageFromName(cellStates[t].floorImageId);
		cellStates[t].objectImageRef = getImageFromName(cellStates[t].objectImageId);
		cellStates[t].editorImageRef = getImageFromName(cellStates[t].editorImageId);

		cellStates[t].clickActionRef = getActionFromId(cellStates[t].clickActionId);
		cellStates[t].questRef = getQuestFromId(cellStates[t].questId);
	}
}