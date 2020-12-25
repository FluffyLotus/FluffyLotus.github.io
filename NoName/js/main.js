var mapBuilding = null;
var mapAdventure = null;

var cells = [];
var resources = [];
var buildings = [];
var enemies = [];
var particles = [];
var quests = [];
var skills = [];

var fastIsOn = false;

var mainInterval = null;

var messages = [];

function loadApp() {
    loadSkills();
    loadResources();
    loadCells();
    loadParticles();
    loadBuildings();
    loadAdventure();
    loadMapBuilding();
    loadEnemies();
    loadQuests();

    messages.push("Something strange is hapenning lately. The animals are more aggressive than usual. We should make sure we are prepared.");
    messages.push("Click on mountain and forest to get resources. Build axe on a forest and attach a storage to it. Close this message to see tooltips.");

    quests[0].setAsActive();

    uiCreateGrid();
    uiDrawGrid();

    processTick();
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
    processQuestTick();

    if (fastIsOn) {
        if (resources[RESOURCE_TIMEESSENCE].amount > 0) {
            resources[RESOURCE_TIMEESSENCE].addAmount(-1);
        }

        if (resources[RESOURCE_TIMEESSENCE].amount <= 0) {
            fastIsOn = false;
        }
    }

    uiDrawResources();
    uiDrawAdventure();
    uiDrawGrid();
    uiDrawQuest();
    uiDrawSkills();

    setTimeout(processTick, getTimeoutSpeed()); // requestAnimationFrame
}

function toggleFast() {
    if (fastIsOn) {
        fastIsOn = false;
    }
    else {
        if (resources[RESOURCE_TIMEESSENCE].amount > 0) {
            fastIsOn = true;
        }
    }
}

function getTimeoutSpeed() {
    if (!fastIsOn)
        return 1000;
    return 100;
}