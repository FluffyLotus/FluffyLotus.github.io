﻿function BuildingInstanceInfo() {
    this.buildingId = -1;
    this.level = 1;

    this.timeTracker = null;

    this.actionReady = false;
    // Action Type : execute always, execute when neededw
    // Action Available : true/false
}

BuildingInstanceInfo.prototype.canProcessOnCellState = function (state) {
    var building = getBuildingFromId(this.buildingId);

    if (building.processOnCellType.length == 0)
        return true;

    for (var t = 0; t < building.processOnCellType.length; t++)
        if (building.processOnCellType[t] == state.typeId)
            return true;

    return false;
}

BuildingInstanceInfo.prototype.process = function () {
    var building = getBuildingFromId(this.buildingId);

    if (!building.keepActionReady)
        this.actionReady = false;

    if (building.actionTime > 0) { //  && this.timeTracker != null
        if (this.timeTracker.canExecute()) {
            this.actionReady = true;
        }
    }

    if (this.actionReady) {
        if (!building.keepActionReady) {
            building.process(this.level);
            this.timeTracker.reset();
        }

        return true;
    }

    return false;
}

BuildingInstanceInfo.prototype.resetAction = function () {
    this.actionReady = false;
    this.timeTracker.reset();
}

function createBuildingInstance(buildingId) {
    var item = new BuildingInstanceInfo();
    var building = getBuildingFromId(buildingId);

    item.buildingId = buildingId;

    if (building.actionTime > 0) 
        item.timeTracker = createTimerTracker(building.timerType, building.actionTime);
    else
        item.timeTracker = null;

    return item;
}