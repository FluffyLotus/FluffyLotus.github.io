function loadApp() {
    glInitAll();

    //resources[RESOURCE_STONE].amount = 40;
    //resources[RESOURCE_WOOD].amount = 40;

    resources[RESOURCE_STONE].addAmount(20000);
    resources[RESOURCE_WOOD].addAmount(20000);
    resources[RESOURCE_PLANK].addAmount(20000);

    uiInitCanvas();

    uiDrawResources();
    uiDrawActions();
    uiDrawWorldMap();

    glStartMainLoop(null);

    window.requestAnimationFrame(drawCanvas);
}

function drawCanvas(timestamp) {
    uiDrawMap();

    uiDrawResources();

    window.requestAnimationFrame(drawCanvas);
}