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
		var action = this.clickActionRef; //getActionFromId(this.clickActionId);

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
	var item;

	item = new CellStateInfo();
	item.id = 0;
	item.name = "Grass";
	item.typeId = STATE_TYPE_GROUND;
	item.floorImageId = "grass";
	item.objectImageId = "";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 1;
	item.name = "Forest";
	item.typeId = STATE_TYPE_TREE;
	item.floorImageId = "grass";
	item.objectImageId = "tree";
	item.clickActionId = ACTION_GIVE_WOOD;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 2;
	item.name = "Mountain";
	item.typeId = STATE_TYPE_ROCK;
	item.floorImageId = "grass";
	item.objectImageId = "mountain";
	item.clickActionId = ACTION_GIVE_STONE;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 3;
	item.name = "Path";
	item.typeId = 0;
	item.floorImageId = "path";
	item.objectImageId = "";
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 4;
	item.name = "Grass Crystal From";
	item.initialBuilding = BUILDING_SPAWNSTART;
	item.floorImageId = "grass";
	item.objectImageId = "";
	item.editorImageId = "crystal";
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 5;
	item.name = "Grass Crystal To";
	item.initialBuilding = BUILDING_SPAWNEND;
	item.floorImageId = "grass";
	item.objectImageId = "";
	item.editorImageId = "crystal2";
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 6;
	item.name = "Water";
	item.typeId = STATE_TYPE_WATER;
	item.floorImageId = "water";
	item.objectImageId = "";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 7;
	item.name = "Grass Flower";
	item.typeId = STATE_TYPE_GROUND;
	item.floorImageId = "grass";
	item.objectImageId = "flower";
	item.clickActionId = ACTION_GIVE_FLOWER;
	item.changeStateOnClickAction = 14;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 8;
	item.name = "Fisherman";
	item.typeId = 0;
	item.floorImageId = "grass";
	item.objectImageId = "fisherman";
	item.questId = QUEST_FISHERMAN;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 9;
	item.name = "Port";
	item.typeId = 0;
	item.floorImageId = "water";
	item.objectImageId = "port";
	item.questId = QUEST_PORT;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 10;
	item.name = "Water";
	item.editorName = " to fish";
	item.typeId = 0;
	item.floorImageId = "water";
	item.objectImageId = "";
	item.editorImageId = "fish";
	item.actionTimerFrom = 30000;
	item.actionTimerTo = 60000;
	item.changeStateOnTimerAction = 11;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 11;
	item.name = "Fish";
	item.editorName = " to water";
	item.typeId = 0;
	item.floorImageId = "water";
	item.objectImageId = "fish";
	item.clickActionId = ACTION_GIVE_FISH;
	item.changeStateOnClickAction = 10;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 12;
	item.name = "Man Standing";
	item.typeId = 0;
	item.floorImageId = "grass";
	item.objectImageId = "standing";
	item.questId = QUEST_STANDING;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 13;
	item.name = "City";
	item.floorImageId = "grass";
	item.objectImageId = "house";
	item.questId = QUEST_FIRST;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 14;
	item.name = "No flower";
	item.typeId = 0;
	item.floorImageId = "grass";
	item.objectImageId = "floweroff";
	item.actionTimerFrom = 30000;
	item.actionTimerTo = 60000;
	item.changeStateOnTimerAction = 7;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 15;
	item.name = "Pillar";
	item.floorImageId = "grass";
	item.objectImageId = "pillar";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 16;
	item.name = "Broken Bridge";
	item.floorImageId = "bridgebroken";
	item.objectImageId = "";
	item.questId = QUEST_BRIDGE;
	item.changeStateOnQuestAction = 17;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 17;
	item.name = "Fix Bridge";
	item.floorImageId = "bridgefix";
	item.objectImageId = "";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 18;
	item.name = "Carpenter";
	item.floorImageId = "grass";
	item.objectImageId = "standing";
	item.questId = QUEST_BRIDGE;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 19;
	item.name = "Port City";
	item.floorImageId = "grass";
	item.objectImageId = "house";
	item.questId = QUEST_PORTCITY;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 20;
	item.name = "Road Helper";
	item.floorImageId = "grass";
	item.objectImageId = "person";
	item.questId = QUEST_ROAD;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 21;
	item.name = "Lava Path";
	item.floorImageId = "lava";
	item.objectImageId = "";
	item.enemyPath = true;
	item.effectCloud = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 22;
	item.name = "Volcano";
	item.floorImageId = "path";
	item.objectImageId = "volcano";
	item.effectCloud = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 23;
	item.name = "Deep Water";
	item.typeId = STATE_TYPE_WATER;
	item.floorImageId = "deepwater";
	item.objectImageId = "";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 24;
	item.name = "Stream";
	item.typeId = STATE_TYPE_NONE;
	item.floorImageId = "stream";
	item.objectImageId = "";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 25;
	item.name = "Pickaxe Man";
	item.typeId = STATE_TYPE_NONE;
	item.floorImageId = "grass";
	item.objectImageId = "pickaxeman";
	item.questId = QUEST_PICKAXEMAN;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 26;
	item.name = "Mountain Hole";
	item.typeId = STATE_TYPE_NONE;
	item.floorImageId = "grass";
	item.objectImageId = "mountainhole";
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 27;
	item.name = "Grass Bush";
	item.typeId = STATE_TYPE_GROUND;
	item.floorImageId = "grass";
	item.objectImageId = "bushon";
	item.clickActionId = ACTION_GIVE_FRUIT;
	item.changeStateOnClickAction = 28;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 28;
	item.name = "No bush";
	item.typeId = 0;
	item.floorImageId = "grass";
	item.objectImageId = "bushoff";
	item.actionTimerFrom = 30000;
	item.actionTimerTo = 60000;
	item.changeStateOnTimerAction = 27;
	cellStates.push(item);

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