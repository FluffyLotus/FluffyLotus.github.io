function uiDrawSpawn() {
    var curMap = selectedMapRef;

    if (curMap.spawnInfo.length > 0) {
        $("#spawnSection").show();

        $("#mapMaxSpawnLevel").text(curMap.spawnInfo.length);

        document.getElementById("mapLife").innerText = curMap.life;
        document.getElementById("mapSpawnLevel").innerText = curMap.findSpawnLevel(curMap.spawnCount);
        document.getElementById("mapMaxSpawnCount").innerText = curMap.maxSpawnCount;

        if (!selectedMapRef.isSpawning)
            $("#spawnButton").prop('disabled', false);
        else
            $("#spawnButton").prop('disabled', true);
    }
    else {
        $("#spawnSection").hide();
    }
}

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