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

    uiDrawAdventureSkill();
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

///////////////

function uiDrawAdventureSkill() {
    if (currentMapAdventure.currentPlayer != null) {
        for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
            var skillInst = currentMapAdventure.currentPlayer.skills[t];
            var skill = getSkillFromId(skillInst.skillId);

            if (!skillInst.isActive || !skillInst.isEquip || skill.useRequirements.length == 0) {
                $("#playerLiveItem" + skillInst.skillId).remove();
            }
            else {
                if ($("#playerLiveItem" + skillInst.skillId).length == 0) {
                    var newElement = $("#playerLiveItem").clone();

                    $(newElement).show();

                    $(newElement).attr("id", "playerLiveItem" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillName").attr("id", "playerLiveSkillName" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillDuration").attr("id", "playerLiveSkillDuration" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillCooldown").attr("id", "playerLiveSkillCooldown" + skillInst.skillId);

                    $("#playerLiveContainer").append(newElement);

                    $("#playerLiveSkillName" + skillInst.skillId).text(skill.name);
                }

                $("#playerLiveSkillDuration" + skillInst.skillId).text(skillInst.duration);
                $("#playerLiveSkillCooldown" + skillInst.skillId).text(skillInst.cooldown);
            }
        }
    }
    else {
    }

    if (currentMapAdventure.currentEnemy != null) {
        for (var t = 0; t < currentMapAdventure.currentEnemy.skillInstances.length; t++) {
            var skillInst = currentMapAdventure.currentEnemy.skillInstances[t];
            var skill = getSkillFromId(skillInst.skillId);

            if ($("#enemyLiveItem" + skillInst.skillId).length == 0) {
                var newElement = $("#enemyLiveItem").clone();

                $(newElement).show();

                $(newElement).attr("id", "enemyLiveItem" + skillInst.skillId);
                $(newElement).find("#enemyLiveSkillName").attr("id", "enemyLiveSkillName" + skillInst.skillId);
                $(newElement).find("#enemyLiveSkillDuration").attr("id", "enemyLiveSkillDuration" + skillInst.skillId);
                $(newElement).find("#enemyLiveSkillCooldown").attr("id", "enemyLiveSkillCooldown" + skillInst.skillId);

                $("#enemyLiveContainer").append(newElement);

                $("#enemyLiveSkillName" + skillInst.skillId).text(skill.name);
            }

            $("#enemyLiveSkillDuration" + skillInst.skillId).text(skillInst.duration);
            $("#enemyLiveSkillCooldown" + skillInst.skillId).text(skillInst.cooldown);
        }
    }
    else {
        $("#enemyLiveContainer").empty();
    }
}