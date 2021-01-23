﻿function uiDrawAdventure() {
    document.getElementById("playerDistance").innerText = mapAdventures[currentMapAdventure.currentMapAdventureId].currentDistance;
    document.getElementById("playerMaxDistance").innerText = mapAdventures[currentMapAdventure.currentMapAdventureId].maxDistance;

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

        document.getElementById("enemyName").innerText = enemies[currentMapAdventure.currentEnemy.enemyId].name + " lvl " + currentMapAdventure.currentEnemy.level;
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
}

function uiTempChangeAdventure() {
    currentMapAdventure.changeMap(parseInt(document.getElementById("adventureMapSelected").value));
}