var previousDrawCanvas = 0;
var deltaTime = 0;

var isDebug = false; // true false

function loadApp() {
    uiSetHardTooltip(TOOLTIP_TYPE_MESSAGE, "Click on a forest or mountain to gain resources.");

    glInitAll();

    if (isDebug) {
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
    uiInitEffect();

    uiDrawResources();
    uiDrawActions();
    uiInitWorldMap();

    glStartMainLoop(null);
    
    window.requestAnimationFrame(drawCanvas);
}

function drawCanvas(timestamp) {
    if (previousDrawCanvas > 0)
        deltaTime = timestamp - previousDrawCanvas;

    uiUpdateEffect();
    uiDrawMap();
    drawUI();

    previousDrawCanvas = timestamp;

    window.requestAnimationFrame(drawCanvas);
}

function drawUI() {
    uiDrawResources();
    uiDrawWorldMap();
    uiDrawActions();
    uiUpdateToolTip();
    uiDrawSpawn();
}