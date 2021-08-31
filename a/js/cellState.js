var STATE_TYPE_NONE = 0;
var STATE_TYPE_ROCK = 1;
var STATE_TYPE_TREE = 2;
var STATE_TYPE_GROUND = 3;

var cellStates = [];

function CellStateInfo() {
	this.id = 0;
	this.name = "";
	this.typeId = STATE_TYPE_NONE;
	this.floorImageId = -1;
	this.objectImageId = -1;
	this.editorImageId = -1;
	this.clickActionId = -1;
	this.enemyPath = false;

	this.questId = -1;

	this.initialBuilding = -1;
	this.actionTimerFrom = -1;
	this.actionTimerTo = -1;

	this.changeStateOnClickAction = -1;
	this.changeStateOnTimerAction = -1;
	this.changeStateOnQuestAction = -1
}

CellStateInfo.prototype.processClick = function () {
	if (this.clickActionId >= 0) {
		var action = getActionFromId(this.clickActionId);

		action.process();
		return true;
	}

	return false;
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
	item.floorImageId = 2;
	item.objectImageId = -1;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 1;
	item.name = "Forest";
	item.typeId = STATE_TYPE_TREE;
	item.floorImageId = 2;
	item.objectImageId = 6;
	item.clickActionId = ACTION_GIVE_WOOD;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 2;
	item.name = "Mountain";
	item.typeId = STATE_TYPE_ROCK;
	item.floorImageId = 2;
	item.objectImageId = 3;
	item.clickActionId = ACTION_GIVE_STONE;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 3;
	item.name = "Path";
	item.typeId = 0;
	item.floorImageId = 4;
	item.objectImageId = -1;
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 4;
	item.name = "Grass Crystal From";
	item.initialBuilding = BUILDING_SPAWNSTART;
	item.floorImageId = 2;
	item.objectImageId = -1;
	item.editorImageId = 7;
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 5;
	item.name = "Grass Crystal To";
	item.initialBuilding = BUILDING_SPAWNEND;
	item.floorImageId = 2;
	item.objectImageId = -1;
	item.editorImageId = 13;
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 6;
	item.name = "Water";
	item.typeId = 0;
	item.floorImageId = 15;
	item.objectImageId = -1;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 7;
	item.name = "Grass Flower";
	item.typeId = STATE_TYPE_GROUND;
	item.floorImageId = 2;
	item.objectImageId = 19;
	item.clickActionId = ACTION_GIVE_FLOWER;
	item.changeStateOnClickAction = 14;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 8;
	item.name = "Fisherman";
	item.typeId = 0;
	item.floorImageId = 2;
	item.objectImageId = 18;
	item.questId = QUEST_FISHERMAN;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 9;
	item.name = "Port";
	item.typeId = 0;
	item.floorImageId = 16;
	item.objectImageId = 17;
	item.questId = QUEST_PORT;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 10;
	item.name = "Water to Fish";
	item.typeId = 0;
	item.floorImageId = 15;
	item.objectImageId = -1;
	item.editorImageId = 20;
	item.actionTimerFrom = 30000;
	item.actionTimerTo = 60000;
	item.changeStateOnTimerAction = 11;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 11;
	item.name = "Fish to water";
	item.typeId = 0;
	item.floorImageId = 15;
	item.objectImageId = 20;
	item.clickActionId = ACTION_GIVE_FISH;
	item.changeStateOnClickAction = 10;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 12;
	item.name = "Man Standing";
	item.typeId = 0;
	item.floorImageId = 2;
	item.objectImageId = 21;
	item.questId = QUEST_STANDING;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 13;
	item.name = "City";
	item.floorImageId = 2;
	item.objectImageId = 8;
	item.questId = QUEST_FIRST;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 14;
	item.name = "No flower";
	item.typeId = 0;
	item.floorImageId = 2;
	item.objectImageId = 24;
	item.actionTimerFrom = 30000;
	item.actionTimerTo = 60000;
	item.changeStateOnTimerAction = 7;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 15;
	item.name = "Pillar - Nothing special";
	item.floorImageId = 2;
	item.objectImageId = 25;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 16;
	item.name = "Broken Bridge";
	item.floorImageId = 31;
	item.objectImageId = -1;
	item.questId = QUEST_BRIDGE;
	item.changeStateOnQuestAction = 17;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 17;
	item.name = "Fix Bridge";
	item.floorImageId = 32;
	item.objectImageId = -1;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 18;
	item.name = "Carpenter";
	item.floorImageId = 2;
	item.objectImageId = IMAGE_STANDING;
	item.questId = QUEST_BRIDGE;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 19;
	item.name = "Port City";
	item.floorImageId = 2;
	item.objectImageId = 8;
	item.questId = QUEST_PORTCITY;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 20;
	item.name = "Road Helper";
	item.floorImageId = 2;
	item.objectImageId = IMAGE_PERSON;
	item.questId = QUEST_ROAD;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 21;
	item.name = "Lava Path";
	item.floorImageId = IMAGE_LAVA;
	item.objectImageId = -1;
	item.enemyPath = true;
	cellStates.push(item);

	item = new CellStateInfo();
	item.id = 22;
	item.name = "Volcano";
	item.floorImageId = IMAGE_PATH;
	item.objectImageId = IMAGE_VOLCANO;
	cellStates.push(item);
} 