var cells = [];
var resources = [];
var buildings = [];
var enemies = [];
var particles = [];
var quests = [];
var skills = [];
var mapBuildings = [];
var mapAdventures = [];

var currentMapBuilding = 0;
var currentMapAdventure = null;

var fastIsOn = false;

var mainInterval = null;

var messages = [];

var SLOW_SPEED = 1000;
var FAST_SPEED = 100;

var lastTick = Date.now() - SLOW_SPEED;
var tickCount = 0;

var canViewskills = false;

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

    loadMapAdventureInstance();

    loadIcon();

    ////////////////
    for (var t = 0; t < buildings.length; t++)
        buildings[t].available = true;

    for (var t = 0; t < mapBuildings.length; t++)
        mapBuildings[t].isActive = true;

    for (var t = 0; t < mapAdventures.length; t++)
        mapAdventures[t].isActive = true;

    canViewskills = true;
    currentMapAdventure.canRun = true;

    for (var t = 0; t < resources.length; t++) {
        if (resources[t].id != RESOURCE_GREENMANA && resources[t].id != RESOURCE_BLUEMANA && resources[t].id != RESOURCE_REDMANA && resources[t].id != RESOURCE_TIMEMANA)
            resources[t].addAmount(200000);
    }

    //resources[RESOURCE_WOOD].addAmount(2000);
    //resources[RESOURCE_STONE].addAmount(2000);
    //resources[RESOURCE_TIMEESSENCE].addAmount(2000);
    ////////////////

    getBuildingFromId(0).available = true;
    getBuildingFromId(1).available = true;
    getBuildingFromId(3).available = true;

    getQuestFromId(3).setAsActive();
    getMapBuildingFromId(0).isActive = true;
    getMapAdventureFromId(0).isActive = true;

    uiCreateGrid();
    uiDrawGrid();
    uiDrawBuildingIcon2();

    processTick();

    //$('#helpModal').modal('show');
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

        //
        if (currentMapAdventure.canRun)
            $("#tabItemAdventure").show();

        $("#tickCount").text(tickCount);
        $("#tickTime").text(displayTime(tickCount * SLOW_SPEED / 1000));
        //

        if (getResourceFromId(RESOURCE_TIMEESSENCE).amount > 0)
            $("#btnFast").show();
        else
            $("#btnFast").hide();
    }

    setTimeout(processTick, FAST_SPEED); // requestAnimationFrame
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