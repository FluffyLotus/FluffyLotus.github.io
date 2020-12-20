var mapBuilding = null;
var mapAdventure = null;

var cells = [];
var resources = [];
var buildings = [];
var enemies = [];
var particles = [];

var fastIsOn = false;

var mainInterval = null;

function loadApp() {
    loadResources();
    loadCells();
    loadParticles();
    loadBuildings();
    loadAdventure();
    loadMapBuilding();
    loadEnemies();

    uiCreateGrid();
    uiDrawGrid();

    processTick();
    resetInterval();
}

function prepareTick() {
    for (var t = 0; t < resources.length; t++) {
        resources[t].prepareTick();
    }

    mapAdventure.prepareTick();
    mapBuilding.prepareTick();
}

function processTick() {
    prepareTick();

    mapBuilding.processTick();
    mapAdventure.processTick();

    if (fastIsOn) {
        if (resources[RESOURCE_TIMEESSENCE].amount > 0) {
            resources[RESOURCE_TIMEESSENCE].addAmount(-1);
        }

        if (resources[RESOURCE_TIMEESSENCE].amount <= 0) {
            fastIsOn = false;

            resetInterval();
        }
    }

    uiDrawResources();
    uiDrawAdventure();
    uiDrawGrid();
}

function toggleFast() {
    if (fastIsOn) {
        fastIsOn = false;

        resetInterval();
    }
    else {
        if (resources[RESOURCE_TIMEESSENCE].amount > 0) {
            fastIsOn = true;

            resetInterval();
        }
    }
}

function resetInterval() {
    if (mainInterval != null) {
        clearInterval(mainInterval);
        mainInterval = null;
    }

    mainInterval = setInterval(processTick, getIntervalSpeed());
}

function getIntervalSpeed() {
    if (!fastIsOn)
        return 1000;
    return 100;
}