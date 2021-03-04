function uiDrawAdventure() {
    document.getElementById("adventureMapSelected").innerText = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId).name;
    document.getElementById("playerDistance").innerText = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId).currentDistance;
    document.getElementById("playerMaxDistance").innerText = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId).maxDistance;

    document.getElementById("playerCurrentLife").innerText = currentMapAdventure.currentPlayer.vitality;
    document.getElementById("playerMaxLife").innerText = currentMapAdventure.currentPlayer.getVitality();
    document.getElementById("playerAttack").innerText = currentMapAdventure.currentPlayer.getStrength();
    document.getElementById("playerDefence").innerText = currentMapAdventure.currentPlayer.getDefence();

    if (currentMapAdventure.currentPlayer.vitalityTickDelta > 0) {
        document.getElementById("playerLifeDelta").innerText = "+" + currentMapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "green";
    }
    else if (currentMapAdventure.currentPlayer.vitalityTickDelta < 0) {
        document.getElementById("playerLifeDelta").innerText = currentMapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "red";
    }
    else {
        document.getElementById("playerLifeDelta").innerText = currentMapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "black";
    }

    if (currentMapAdventure.currentEnemy == null) {
        document.getElementById("adventureWalk").style.display = "block";
        document.getElementById("adventureAttack").style.display = "none";
    }
    else {
        document.getElementById("adventureWalk").style.display = "none";
        document.getElementById("adventureAttack").style.display = "block";

        document.getElementById("enemyImage").src = "images/enemy_" + currentMapAdventure.currentEnemy.enemyId + ".png";

        document.getElementById("enemyCurrentLife").innerText = currentMapAdventure.currentEnemy.vitality;

        document.getElementById("enemyName").innerText = getEnemyFromId(currentMapAdventure.currentEnemy.enemyId).name + " lvl " + currentMapAdventure.currentEnemy.level;
        document.getElementById("enemyMaxLife").innerText = currentMapAdventure.currentEnemy.maxVitality;
        document.getElementById("enemyAttack").innerText = currentMapAdventure.currentEnemy.strength;
        document.getElementById("enemyDefence").innerText = currentMapAdventure.currentEnemy.defence;

        if (currentMapAdventure.currentEnemy.vitalityTickDelta > 0) {
            document.getElementById("enemyLifeDelta").innerText = "+" + currentMapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "green";
        }
        else if (currentMapAdventure.currentEnemy.vitalityTickDelta < 0) {
            document.getElementById("enemyLifeDelta").innerText = currentMapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "red";
        }
        else {
            document.getElementById("enemyLifeDelta").innerText = currentMapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "black";
        }
    }

    if (canChangeMap()) {
        $("#changeMapButton").show();
    }
    else {
        $("#changeMapButton").hide();
    }
}

function uiChangeAdventure() {
    currentMapAdventure.changeMap(parseInt($("#uiPossibleMap").val()), parseInt($("#uiPossibleCheckpoint").val()));
}

function uiChangePossibleCheckpoint() {
    uiPopulateCheckpoint(parseInt($("#uiPossibleMap").val()), 0);
}

function uiSetupWorlMapModal() {
    $("#uiPossibleMap").empty();

    for (var t = 0; t < mapAdventures.length; t++) {
        if (mapAdventures[t].isActive) {
            if (mapAdventures[t].id == currentMapAdventure.currentMapAdventureId) {
                $("#uiPossibleMap").append("<option value='" + mapAdventures[t].id + "' selected>" + mapAdventures[t].name + "</option>");

                uiPopulateCheckpoint(mapAdventures[t].id, mapAdventures[t].getCurrentCheckpoint());
            }
            else
                $("#uiPossibleMap").append("<option value='" + mapAdventures[t].id + "'>" + mapAdventures[t].name + "</option>");
        }
    }
}

function uiPopulateCheckpoint(mapId, checkpoint) {
    var map = getMapAdventureFromId(mapId);

    $("#uiPossibleCheckpoint").empty();

    for (var t = 0; t <= map.maxDistance; t+= 1000) {
        if (t == checkpoint)
            $("#uiPossibleCheckpoint").append("<option value='" + t + "' selected>" + t + "</option>");
        else
            $("#uiPossibleCheckpoint").append("<option value='" + t + "'>" + t + "</option>");
    }
}