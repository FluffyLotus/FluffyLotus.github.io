var selectedMapId = 0;
var selectedCellX = 0;
var selectedCellY = 0;

var selectedMapRef = null;

function glInitAll() {
    initImages();
    initResource();
    initActions();
    initCellStates();
    initBuilding();
    initEnemy();
    initQuest();
    initWorld();
    initTimer();
    initMap();

    buildings[BUILDING_AXE].isVisible = true;
    buildings[BUILDING_PICKAXE].isVisible = true;
    buildings[BUILDING_STORAGE].isVisible = true;
    maps[0].active = true;

    finishInitImages();
    finishInitResource();
    finishInitActions();
    finishInitCellStates();
    finishInitBuilding();
    finishInitEnemy();
    finishInitQuest();
    finishInitMap();
    finishInitWorld();

    glChangeSelectedMap(0);
}

function glChangeSelectedMap(newMapId) {
    selectedMapId = newMapId;
    selectedMapRef = getMapFromId(selectedMapId);
}

function glStartMainLoop(df) {
    setInterval(glMainLoop, timerSpeed);
}

function glMainLoop() {
    while (processTimer()) {
        resetResourceDelta();

        for (var t = 0; t < maps.length; t++) {
            maps[t].process();
        }
    }
}

function glProcessClick(x, y) {
    var curMap = selectedMapRef;

    selectedCellX = x;
    selectedCellY = y;

    curMap.processClick(x, y);
}

function glProcessDestroy(x, y) {
    var curMap = selectedMapRef;

    selectedCellX = x;
    selectedCellY = y;

    curMap.destroyBuilding(x, y);
}

function glProcessBuyBuilding(x, y, buildingId) {
    var curMap = selectedMapRef;
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

function glLevelDownBuilding(x, y) {
    selectedCellX = x;
    selectedCellY = y;

    glLevelDownSelectedBuilding();
}

function glLevelUpSelectedBuilding() {
    var curMap = selectedMapRef;

    curMap.levelBuilding(selectedCellX, selectedCellY);
}

function glLevelDownSelectedBuilding() {
    var curMap = selectedMapRef;

    curMap.levelDownBuilding(selectedCellX, selectedCellY);
}

function glStartSpawn() {
    var curMap = selectedMapRef;

    curMap.startSpawn();
}

function glCompleteSelectedCellQuest() {
    var curMap = selectedMapRef;

    curMap.completeQuest(selectedCellX, selectedCellY);
}