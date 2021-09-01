function loadApp() {
    $('#helpModal').modal('show');

    glInitAll();

    //resources[RESOURCE_STONE].amount = 40;
    //resources[RESOURCE_WOOD].amount = 40;

    resources[RESOURCE_STONE].addAmount(20000);
    resources[RESOURCE_WOOD].addAmount(20000);
    resources[RESOURCE_PLANK].addAmount(20000);

    uiInitCanvas();
    uiInitActions();

    uiDrawResources();
    uiDrawActions();
    uiInitWorldMap();

    glStartMainLoop(null);
    
    window.requestAnimationFrame(drawCanvas);
}

function drawCanvas(timestamp) {
    uiDrawMap();

    uiDrawResources();
    uiDrawWorldMap();
    uiDrawActions();
    uiUpdateToolTip();

    var curMap = getMapFromId(selectedMapId);

    if (curMap.id != 0) {
        $("#spawnSection").show();

        document.getElementById("mapLife").innerText = curMap.life;
        document.getElementById("mapSpawnLevel").innerText = parseInt(curMap.spawnCount / 10) + 1;
        document.getElementById("mapMaxSpawnCount").innerText = curMap.maxSpawnCount;
    }
    else {
        $("#spawnSection").hide();
    }
        

    window.requestAnimationFrame(drawCanvas);
}