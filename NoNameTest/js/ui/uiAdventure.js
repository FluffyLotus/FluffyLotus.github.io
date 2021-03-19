var canvas, context;
var tilesImage, characterImage, objectsImage, objectsBigImage;

function uiLoadAdventure() {
    canvas = document.getElementById("canvasDraw");
    context = canvas.getContext("2d");
    tilesImage = document.getElementById("tilesImage");
    characterImage = document.getElementById("characterImage");
    objectsImage = document.getElementById("objectsImage");
    objectsBigImage = document.getElementById("objectsBigImage");
}

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

///////////////

function uiDrawAdventureMap() {
    var imgInfo;

    var tickP = 0;

    if (currentMapAdventure.currentAction == ADV_ACTION_WALK)
        tickP = getTickPercentage();

    var centerOfCanvasX = canvas.width / 2;
    var centerOfCanvasY = canvas.height / 2 + 50;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // img size: 128x159
    // img move: 64x32

    var tileTopMiddleX = 64;
    var tileTopMiddleY = 32;

    var map = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId);

    for (var d = ADVENTURE_MAP_GRID_LENGTH + ADVENTURE_MAP_GRID_WIDTH; d >= 0; d--) {
        for (var y = 0; y < ADVENTURE_MAP_GRID_LENGTH; y++) {
            for (var x = 0; x < ADVENTURE_MAP_GRID_WIDTH; x++) {
                if (d == x + y) {
                    var px, py;
                    var ty = ADVENTURE_MAP_GRID_LENGTH - 1 - y;

                    var tile = getTileTemplateFromId(currentMapAdventure.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)]);
                    imgInfo = getImageFromName(tile.floorTile);

                    px = centerOfCanvasX - tileTopMiddleX + (y * tileTopMiddleX) - (x * tileTopMiddleX) - ((map.currentDistance + tickP - currentMapAdventure.mapGridStart) * tileTopMiddleX);
                    py = centerOfCanvasY - tileTopMiddleY - (y * tileTopMiddleY) - (x * tileTopMiddleY) + ((map.currentDistance + tickP - currentMapAdventure.mapGridStart) * tileTopMiddleY);

                    context.drawImage(tilesImage, imgInfo.X, imgInfo.Y, imgInfo.W, imgInfo.H, px, py, imgInfo.W, imgInfo.H);
                }
            }
        }
    }

    for (var d = ADVENTURE_MAP_GRID_LENGTH + ADVENTURE_MAP_GRID_WIDTH; d >= 0; d--) {
        for (var y = 0; y < ADVENTURE_MAP_GRID_LENGTH; y++) {
            for (var x = 0; x < ADVENTURE_MAP_GRID_WIDTH; x++) {
                if (d == x + y) {
                    var px, py;
                    var ty = ADVENTURE_MAP_GRID_LENGTH - 1 - y;

                    var tile = getTileTemplateFromId(currentMapAdventure.mapGrid[x + (y * ADVENTURE_MAP_GRID_WIDTH)]);

                    if (tile.object != "") {
                        imgInfo = getImageFromName(tile.object);

                        px = centerOfCanvasX - tileTopMiddleX + (y * tileTopMiddleX) - (x * tileTopMiddleX) - ((map.currentDistance + tickP - currentMapAdventure.mapGridStart) * tileTopMiddleX);
                        py = centerOfCanvasY - tileTopMiddleY - (y * tileTopMiddleY) - (x * tileTopMiddleY) + ((map.currentDistance + tickP - currentMapAdventure.mapGridStart) * tileTopMiddleY);

                        if (imgInfo.H > 200)
                            context.drawImage(objectsBigImage, imgInfo.X, imgInfo.Y, imgInfo.W, imgInfo.H, px, py - imgInfo.H + 64, imgInfo.W, imgInfo.H);
                        else
                            context.drawImage(objectsImage, imgInfo.X, imgInfo.Y, imgInfo.W, imgInfo.H, px, py - imgInfo.H + 64, imgInfo.W, imgInfo.H);
                    }
                }
            }
        }
    }

    {
        var test = 0;
        //var test = dist - Math.floor(dist) - 0.5;
        //test = 0.5 - Math.abs(test);
        //test *= 50;

        var px, py;

        imgInfo = getImageFromName("character_main_Size2_NW"); //currentMapAdventure.currentPlayer.imageName);

        px = centerOfCanvasX - tileTopMiddleX;
        py = centerOfCanvasY - tileTopMiddleY - test; // - characterHeight;

        context.drawImage(characterImage, imgInfo.X, imgInfo.Y, imgInfo.W, imgInfo.H, px, py - imgInfo.H + 64, imgInfo.W, imgInfo.H);

        //imgInfo = getImageFromName("bunny_down_Size2" + "_" + angle[2]);

        //px = centerOfCanvasX - tileTopMiddleX + ((10 - mapGridStart) * tileTopMiddleX) - (0 * tileTopMiddleX) - ((dist - mapGridStart) * tileTopMiddleX);
        //py = centerOfCanvasY - tileTopMiddleY - ((10 - mapGridStart) * tileTopMiddleY) - (0 * tileTopMiddleY) + ((dist - mapGridStart) * tileTopMiddleY); // - characterHeight;

        //context.drawImage(characterImage, imgInfo.X, imgInfo.Y, imgInfo.W, imgInfo.H, px, py - imgInfo.H + 64, imgInfo.W, imgInfo.H);
    }

    requestAnimationFrame(uiDrawAdventureMap);
}