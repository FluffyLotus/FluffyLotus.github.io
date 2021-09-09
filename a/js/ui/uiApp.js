var previousDrawCanvas = 0;
var deltaTime = 0;

var isDebug = false; // true false

function loadApp() {
    uiSetHardTooltip(TOOLTIP_TYPE_MESSAGE, "Click on a forest or mountain to gain resources.");

    glInitAll();

    if (isDebug) {
        //resources[RESOURCE_STONE].amount = 40;
        //resources[RESOURCE_WOOD].amount = 40;

        //resources[RESOURCE_STONE].addAmount(20000);
        //resources[RESOURCE_WOOD].addAmount(20000);
        //resources[RESOURCE_PLANK].addAmount(20000);
        //resources[RESOURCE_FLOWER].addAmount(20000);

        for (var t = 0; t < resources.length; t++)
            resources[t].addAmount(2000000);
        for (var t = 0; t < enemies.length; t++)
            enemies[t].totalKill = 10000;
    }
    else {
        $('#tutorialModal').modal('show');
    }

    uiInitCanvas();
    uiInitActions();

    uiDrawResources();
    uiDrawActions();
    uiInitWorldMap();

    glStartMainLoop(null);
    
    window.requestAnimationFrame(drawCanvas);
}

function drawCanvas(timestamp) {
    if (previousDrawCanvas > 0)
        deltaTime = timestamp - previousDrawCanvas;

    uiDrawMap();
    drawUI();
    //setTimeout(drawUI, 1);

    previousDrawCanvas = timestamp;

    window.requestAnimationFrame(drawCanvas);
}

function drawUI() {
    uiDrawResources();
    uiDrawWorldMap();
    uiDrawActions();
    uiUpdateToolTip();

    /////////////////////////
    var curMap = selectedMapRef;

    if (curMap.spawnInfo.length > 0) {
        $("#spawnSection").show();

        $("#mapMaxSpawnLevel").text(curMap.spawnInfo.length);

        document.getElementById("mapLife").innerText = curMap.life;
        document.getElementById("mapSpawnLevel").innerText = curMap.findSpawnLevel(curMap.spawnCount); //parseInt(curMap.spawnCount / 10) + 1;
        document.getElementById("mapMaxSpawnCount").innerText = curMap.maxSpawnCount;

        if (!selectedMapRef.canSpawn)
            $("#spawnButton").prop('disabled', false);
        else
            $("#spawnButton").prop('disabled', true);
    }
    else {
        $("#spawnSection").hide();
    }
    /////////////////////////
}

/////////////////////////
function uiOpenSpawnModal() {
    if (getBuildingFromId(BUILDING_TOWER1).isVisible) {
        $('#spawnInfoModal-button').show();
        $('#spawnInfoModal-noButton').hide();
    }
    else {
        $('#spawnInfoModal-button').hide();
        $('#spawnInfoModal-noButton').show();
    }

    $('#spawnInfoModal').modal('show');
}

function uiStartSpawn() {
    glStartSpawn();

    $('#spawnInfoModal').modal('hide');
}

/////////////////////////