var cells = [];
var resources = [];
var buildings = [];
var enemies = [];
var particles = [];
var quests = [];
var skills = [];
var mapBuildings = [];
var mapAdventures = [];
var tileTemplates = [];

var currentMapBuilding = 0;
var currentMapAdventure = null;

var fastIsOn = false;

var mainInterval = null;

var messages = [];

var SLOW_SPEED = 1000;
var FAST_SPEED = 100;
var SAVE_SPEED = 1000 * 30;

var lastProcess = Date.now();
var lastSaveTick = Date.now();
var lastTick = Date.now() - SLOW_SPEED;
var tickCount = 0;
var totalGameTime = 0;

function loadIcon() {
    var elems = $("[data-spritesheetimage]");

    for (var t = 0; t < elems.length; t++) {
        var imageName = $(elems[t]).data("spritesheetimage");
        var name = "";
        var imgX, imgY;

        if ($(elems[t]).hasClass("spriteSheetBuilding")) {
            name = "building";
            imgX = getImagePositionX(name, imageName);
            imgY = getImagePositionY(name, imageName);
        }
        if ($(elems[t]).hasClass("spriteSheetCell")) {
            name = "cell";
            imgX = getImagePositionX(name, imageName);
            imgY = getImagePositionY(name, imageName);
        }
        if ($(elems[t]).hasClass("spriteSheetIcon")) {
            name = "icon";
            imgX = getImagePositionX(name, imageName);
            imgY = getImagePositionY(name, imageName);
        }
        if ($(elems[t]).hasClass("spriteSheetParticle")) {
            name = "particle";
            imgX = getImagePositionX(name, imageName);
            imgY = getImagePositionY(name, imageName);
        }

        $(elems[t]).css('background-position-x', -imgX + 'px');
        $(elems[t]).css('background-position-y', -imgY + 'px');
    }
}

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
    loadTileTemplate();

    loadMapAdventureInstance();

    uiLoadAdventure();

    // Find a better place to do this. Also, do we need to store this in real-time and put in the save data or is this ok.
    for (var t = 0; t < mapAdventures.length; t++) {
        for (var i = 0; i < mapAdventures[t].events.length; i++) {
            var q = getQuestFromId(mapAdventures[t].events[i].questId);

            q.foundMapId = mapAdventures[t].id;
            q.foundDistance = mapAdventures[t].events[i].distance;
        }
    }

    loadIcon();

    ////////////////
    if (true) {
        for (var t = 0; t < buildings.length; t++)
            buildings[t].available = true;

        for (var t = 0; t < mapBuildings.length; t++)
            mapBuildings[t].isActive = true;

        for (var t = 0; t < mapAdventures.length; t++) {
            mapAdventures[t].maxDistance = 10 * 1000;
            mapAdventures[t].isActive = true;
        }

        currentMapAdventure.canRun = true;

        for (var t = 0; t < resources.length; t++) {
            resources[t].amountLimit = -1;
            resources[t].addAmount(200000 - resources[t].amount);
        }

        for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
            currentMapAdventure.currentPlayer.skills[t].isActive = true;
        }

        //getResourceFromId(RESOURCE_WOOD).addAmount(2000);
        //getResourceFromId(RESOURCE_STONE).addAmount(2000);
        //getResourceFromId(RESOURCE_TIMEESSENCE).addAmount(2000);
    }
    else {
        retreiveSaveState();

        if (getResourceFromId(RESOURCE_WOOD).maxAmount == 0)
            $('#helpModal').modal('show');
        else if (timeEssenceAfterLoad > 0) {
            $("#timeEssenceAfterLoad").text(timeEssenceAfterLoad);
            $('#cameBackModal').modal('show');
        }
    }

    if (getResourceFromId(RESOURCE_TIMEESSENCE).amount == 0)
        getResourceFromId(RESOURCE_TIMEESSENCE).addAmount(20000);
    ////////////////

    getBuildingFromId(0).available = true;
    getBuildingFromId(1).available = true;
    getBuildingFromId(3).available = true;

    getQuestFromId(3).setAsActive();
    getMapBuildingFromId(0).isActive = true;
    getMapAdventureFromId(0).isActive = true;

    currentMapAdventure.loadMapGrid();

    uiCreateGrid();
    uiDrawGrid();
    uiDrawBuildingIcon2();

    requestAnimationFrame(uiDrawAdventureMap);

    processTick();
}

function prepareTick() {
    for (var t = 0; t < resources.length; t++) {
        resources[t].prepareTick();
    }

    currentMapAdventure.prepareTick();
    prepareMapBuildingTick();
}

function processTick() {
    var hadChange = false;

    while (lastTick + getTimeoutSpeed() < Date.now()) {
        prepareTick();

        processMapBuildingTick();
        currentMapAdventure.processTick();
        processQuestTick();
        processSkillTick();

        if (fastIsOn) {
            if (getResourceFromId(RESOURCE_TIMEESSENCE).amount > 0) {
                getResourceFromId(RESOURCE_TIMEESSENCE).addAmount(-1);
            }

            if (getResourceFromId(RESOURCE_TIMEESSENCE).amount <= 0) {
                fastIsOn = false;
            }
        }

        hadChange = true;
        lastTick += getTimeoutSpeed();
        tickCount++;
    }

    if (lastSaveTick + SAVE_SPEED < Date.now()) {
        storeSaveState();
        lastSaveTick = Date.now();
    }

    if (hadChange) {
        uiDrawResources();
        uiDrawAdventure();
        uiDrawGrid();
        uiDrawQuest();
        uiDrawSkills();
        uiDrawEnemyInfo();
        uiDrawNewMessage();
        uiDrawBuildingIcon();
        uiDrawBuildingUpgrade();

        if (currentMapAdventure.canRun) {
            $("#tabItemAdventure").show();
            $("#tabItemEnemy").show();
        }
        
        $("#tickCount").text(tickCount);
        $("#tickTime").text(displayTime(tickCount * SLOW_SPEED / 1000));
        $("#lastSaveTime").text(lastSave.toDateString() + " " + lastSave.toLocaleTimeString());
        $("#saveSecond").text(SAVE_SPEED / 1000);        
        $("#realTimeElapse").text(displayTime(Math.floor(totalGameTime / 1000)));

        if (getResourceFromId(RESOURCE_TIMEESSENCE).amount > 0)
            $("#btnFast").show();
        else
            $("#btnFast").hide();

        if (getMapAdventureFromId(0).maxDistance > 2300)
            $("#endOfGameSection").show();
    }

    totalGameTime += Date.now() - lastProcess;
    lastProcess = Date.now();

    setTimeout(processTick, FAST_SPEED); // requestAnimationFrame
}

function getTickPercentage() {
    var speed = getTimeoutSpeed();
    var leftTime = Date.now() - lastTick;
    
    var p = leftTime / speed;

    if (p < 0)
        return 0;
    if (p > 1)
        return 1;
    return p;
}

function toggleFast() {
    if (fastIsOn) {
        fastIsOn = false;
    }
    else {
        if (getResourceFromId(RESOURCE_TIMEESSENCE).amount > 0) {
            fastIsOn = true;
        }
    }
}

function getTimeoutSpeed() {
    if (!fastIsOn)
        return SLOW_SPEED;
    return FAST_SPEED;
}

function displayTime(ticksInSecs) {
    var ticks = ticksInSecs;
    var hh = Math.floor(ticks / 3600);
    var mm = Math.floor((ticks % 3600) / 60);
    var ss = ticks % 60;

    return pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2);
}

function pad(n, width) {
    var n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function nFormatter(num, digits) {

    if (typeof digits === 'undefined')
        digits = 3;

    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}