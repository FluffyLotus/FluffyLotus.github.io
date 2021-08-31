var selectedMapId = 0;
var selectedCellX = 0;
var selectedCellY = 0;

//var drawFunc = null;

function glInitAll() {
    initImages();
    initResource();
    initActions();
    initCellStates();
    initBuilding();
    initEnemy();
    initQuest();
    initTimer();
    initWorld();

    // Load map

    maps = [];

    for (var i = 0; i < mapsData.length; i++) {
        maps[i] = loadMapInfo(mapsData[i]);
    }

    maps[0].active = true;
}

function glChangeSelectedMap(newMapId) {
    selectedMapId = newMapId;
}

function glStartMainLoop(df) {
    //drawFunc = df;

    setInterval(glMainLoop, timerSpeed);
}

function glMainLoop() {
    while (processTimer()) {
        resetResourceDelta();

        for (var t = 0; t < maps.length; t++) {
            maps[t].process();
        }

        //drawFunc();
    }
}

function glProcessClick(x, y) {
    var curMap = getMapFromId(selectedMapId);

    selectedCellX = x;
    selectedCellY = y;

    curMap.processClick(x, y);
}

function glProcessDestroy(x, y) {
    var curMap = getMapFromId(selectedMapId);

    selectedCellX = x;
    selectedCellY = y;

    curMap.destroyBuilding(x, y);
}

function glProcessBuyBuilding(x, y, buildingId) {
    var curMap = getMapFromId(selectedMapId);
    var building = getBuildingFromId(buildingId);

    selectedCellX = x;
    selectedCellY = y;

    if (building.canBuy())
        curMap.buyBuilding(x, y, buildingId);
}

function glLevelUpBuilding(x, y) {
    selectedCellX = x;
    selectedCellY = y;

    glLevelUpSelectedBuilding();
}

function glLevelUpSelectedBuilding() {
    var curMap = getMapFromId(selectedMapId);

    curMap.levelBuilding(selectedCellX, selectedCellY);
}

function glStartSpawn() {
    var curMap = getMapFromId(selectedMapId);

    curMap.startSpawn();
}

function glCompleteSelectedCellQuest() {
    var curMap = getMapFromId(selectedMapId);

    curMap.completeQuest(selectedCellX, selectedCellY);
}