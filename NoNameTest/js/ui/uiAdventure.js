function uiDrawAdventure() {
    var imgX = getImagePositionX("cell", currentMapAdventure.currentPlayer.imageName);
    var imgY = getImagePositionY("cell", currentMapAdventure.currentPlayer.imageName);

    $("#playerImage").css('background-position-x', -imgX + 'px');
    $("#playerImage").css('background-position-y', -imgY + 'px');

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

        //document.getElementById("enemyImage").src = "images/enemy_" + currentMapAdventure.currentEnemy.enemyId + ".png";

        var imgX = getImagePositionX("cell", getEnemyFromId(currentMapAdventure.currentEnemy.enemyId).imageName);
        var imgY = getImagePositionY("cell", getEnemyFromId(currentMapAdventure.currentEnemy.enemyId).imageName);

        $("#enemyImage").css('background-position-x', -imgX + 'px');
        $("#enemyImage").css('background-position-y', -imgY + 'px');

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
    var skillCount = 0;

    if (currentMapAdventure.currentPlayer != null) {
        for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
            var skillInst = currentMapAdventure.currentPlayer.skills[t];
            var skill = getSkillFromId(skillInst.skillId);

            if (!skillInst.isActive || !skillInst.isEquip || skill.useRequirements.length == 0) {
                $("#playerLiveItem" + skillInst.skillId).remove();
            }
            else {
                skillCount++;

                if ($("#playerLiveItem" + skillInst.skillId).length == 0) {
                    var newElement = $("#playerLiveItem").clone();

                    $(newElement).show();

                    $(newElement).attr("id", "playerLiveItem" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillName").attr("id", "playerLiveSkillName" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillDuration").attr("id", "playerLiveSkillDuration" + skillInst.skillId);
                    $(newElement).find("#playerLiveSkillCooldown").attr("id", "playerLiveSkillCooldown" + skillInst.skillId);

                    $("#playerLiveContainer").append(newElement);

                    $(newElement).click({ id: skillInst.skillId }, uiShowSummaryPlayerSkillTooltip);
                    $(newElement).mouseover({ id: skillInst.skillId }, uiShowSummaryPlayerSkillTooltip);
                    $(newElement).mouseout(uiClearTooltip);

                    $("#playerLiveSkillName" + skillInst.skillId).text(skill.name);
                }

                $("#playerLiveSkillDuration" + skillInst.skillId).text(skillInst.duration);
                $("#playerLiveSkillCooldown" + skillInst.skillId).text(skillInst.cooldown);
            }
        }

        if (skillCount == 0)
            $("#playerLiveSkillContainer").hide();
        else
            $("#playerLiveSkillContainer").show();
    }
    else {
    }

    skillCount = 0;

    if (currentMapAdventure.currentEnemy != null) {
        for (var t = 0; t < currentMapAdventure.currentEnemy.skillInstances.length; t++) {
            skillCount++;

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

                $(newElement).click({ id: skillInst.skillId }, uiShowSummaryEnemySkillTooltip);
                $(newElement).mouseover({ id: skillInst.skillId }, uiShowSummaryEnemySkillTooltip);
                $(newElement).mouseout(uiClearTooltip);

                $("#enemyLiveSkillName" + skillInst.skillId).text(skill.name);
            }

            $("#enemyLiveSkillDuration" + skillInst.skillId).text(skillInst.duration);
            $("#enemyLiveSkillCooldown" + skillInst.skillId).text(skillInst.cooldown);
        }

        if (skillCount == 0)
            $("#enemyLiveSkillContainer").hide();
        else
            $("#enemyLiveSkillContainer").show();
    }
    else {
        $("#enemyLiveContainer").empty();
    }
}

function uiShowSummaryPlayerSkillTooltip(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);
    var skillInfo = getSkillFromId(curSkill.skillId);

    var left = "";
    var right = "";

    left = "<b>" + skillInfo.name + "</b>, lvl " + curSkill.level + "<br />";

    if (skillInfo.useRequirements.length != 0) {
        left += "Use " + getResourceLinkString(skillInfo.useRequirements, curSkill.level) + ". ";
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
        left += "<br />Duration: " + skillInfo.duration + " tick, Cooldown: " + skillInfo.cooldown + " tick";
    }
    else {
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
    }

    right = "";

    uiSetTooltip(left, right);
}

function uiShowSummaryEnemySkillTooltip(event) {
    var curSkill = currentMapAdventure.enemy.getSkillInstance(event.data.id);
    var skillInfo = getSkillFromId(curSkill.skillId);

    var left = "";
    var right = "";

    left = "<b>" + skillInfo.name + "</b>, lvl " + curSkill.level + "<br />";

    if (skillInfo.useRequirements.length != 0) {
        left += "Use " + getResourceLinkString(skillInfo.useRequirements, curSkill.level) + ". ";
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
        left += "<br />Duration: " + skillInfo.duration + " tick, Cooldown: " + skillInfo.cooldown + " tick";
    }
    else {
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
    }

    right = "";

    uiSetTooltip(left, right);
}