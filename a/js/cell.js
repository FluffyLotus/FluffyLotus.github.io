function CellInfo() {
	this.originalState = 0;
	this.updatedState = -1;

	this.originalStateRef = null;
	this.updatedStateRef = null;

	this.isConnection = false;

	this.buildingInstance = null;

	this.timeTracker = null;
}

CellInfo.prototype.getStateId = function () {
	if (this.updatedState == -1)
		return this.originalState;
	return this.updatedState;
}

CellInfo.prototype.getStateRef = function () {
	if (this.updatedState == -1)
		return this.originalStateRef;
	return this.updatedStateRef;
}

CellInfo.prototype.resetBuildingTimer = function () {
	if (this.buildingInstance != null) {
		if (this.buildingInstance.timeTracker != null) {
			this.buildingInstance.resetAction();
		}
	}
}

CellInfo.prototype.process = function () {
	var state = this.getStateRef(); //getCellStateFromId(this.getStateId());

	if (this.buildingInstance == null && state.initialBuilding >= 0) {
		this.buildingInstance = createBuildingInstance(state.initialBuilding);
	}

	// If a connection is lost, the building timer need to reset and not increase
	//if (this.buildingInstance != null && (this.isConnection || !getBuildingFromId(this.buildingInstance.buildingId).needConnection)) {
	if (this.buildingInstance != null && (this.isConnection || !this.buildingInstance.buildingRef.needConnection)) {
		if (this.buildingInstance.canProcessOnCellState(state)) {
			if (this.buildingInstance.process()) {
				//var curBuilding = getBuildingFromId(this.buildingInstance.buildingId);
			}
		}
	}

	if (state.changeStateOnQuestAction >= 0){
		//if(getQuestFromId(state.questId).completed)
		if (state.questRef.completed)
			this.changeState(state.changeStateOnQuestAction);
	}

	if (state.actionTimerFrom >= 0 && state.actionTimerTo >= 0) {
		if (this.timeTracker == null) {
			if (state.actionTimerFrom != state.actionTimerTo)
				this.timeTracker = createTimerTracker(TRACLER_TYPE_DELAY, getRandomNumber(state.actionTimerFrom, state.actionTimerTo));
			else
				this.timeTracker = createTimerTracker(TRACLER_TYPE_DELAY, state.actionTimerTo);
		}
		else if (this.timeTracker.canExecute()) {
			if (state.actionTimerFrom != state.actionTimerTo)
				this.timeTracker.changeDeltaAndReset(getRandomNumber(state.actionTimerFrom, state.actionTimerTo));
			else
				this.timeTracker.reset();

			if (state.changeStateOnTimerAction >= 0)
				this.changeState(state.changeStateOnTimerAction);
		}
	}
}

CellInfo.prototype.changeState = function (newState) {
	this.timeTracker = null;
	this.updatedState = newState;
	this.updatedStateRef = getCellStateFromId(newState);
}

CellInfo.prototype.processClick = function () {
	var state = this.getStateRef(); //getCellStateFromId(this.getStateId());

	if (state.processClick()) {
		if (state.changeStateOnClickAction >= 0) {
			this.changeState(state.changeStateOnClickAction);
		}
	}
}

CellInfo.prototype.destroyBuilding = function () {
	if (this.buildingInstance != null) {
		var building = this.buildingInstance.buildingRef; //getBuildingFromId(this.buildingInstance.buildingId);

		building.destroy();
		this.buildingInstance = null;
	}
}

CellInfo.prototype.canPutBuilding = function (buildingId) {
	if (this.buildingInstance != null)
		return false;

	var state = this.getStateRef(); //getCellStateFromId(this.getStateId());
	var building = getBuildingFromId(buildingId);

	for (var t = 0; t < building.processOnCellType.length; t++) {
		if (building.processOnCellType[t] == state.typeId)
			return true;
	}

	return false;
}

CellInfo.prototype.putBuilding = function (buildingId) {
	if (!this.canPutBuilding(buildingId))
		return;

	this.buildingInstance = createBuildingInstance(buildingId);
}

CellInfo.prototype.completeQuest = function () {
	var state = this.getStateRef(); //getCellStateFromId(this.getStateId());

	if (state.questId >= 0) {
		var quest = state.questRef; //getQuestFromId(state.questId);

		quest.complete();
	}
}

CellInfo.prototype.resetCell = function () {
	this.updatedState = -1;
	this.isConnection = false;
	this.destroyBuilding();
	this.timeTracker = null;
	this.canSpawnEnemy = false;
}

function getSaveCellInfo(item) {
	var data = new Object();

	data.os = item.originalState;

	return data;
}

function loadCellInfo(data) {
	var item = new CellInfo();

	item.originalState = data.os;
	item.originalStateRef = getCellStateFromId(item.originalState);

	return item;
}