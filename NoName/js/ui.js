var selectedBuildingId = -1;

function uiToggleFast() {
    toggleFast();

    if (fastIsOn) {
        document.getElementById("btnFast").className = "btn btn-success";
    }
    else {
        document.getElementById("btnFast").className = "btn";
    }
}

function uiCreateGrid() {
    var str = "";

    for (var y = 0; y < mapBuilding.mapHeight; y++) {
        str += "<tr>";

        for (var x = 0; x < mapBuilding.mapWidth; x++) {
            str += '<td id="cell_' + x + '_' + y + '"><div id="particle_' + x + '_' + y + '"><div id="building_' + x + '_' + y + '"></div></div></td>';
        }

        str += "</tr>";
    }

    document.getElementById("mainGrid").innerHTML = str;

    for (let y = 0; y < mapBuilding.mapHeight; y++) {
        for (let x = 0; x < mapBuilding.mapWidth; x++) {
            document.getElementById('cell_' + x + '_' + y).onclick = function () { uiCellClick(x, y); };
            document.getElementById('cell_' + x + '_' + y).onmouseover = function () { uiCellHover(x, y); };
        }
    }
}

function uiDrawResources() {
    for (var t = 0; t < resources.length; t++) {
        var curResource = resources[t];

        if (curResource.maxAmount > 0)
            document.getElementById("resourceInfoRow" + t).style.display = "";
        else
            document.getElementById("resourceInfoRow" + t).style.display = "none";

        document.getElementById("resourceInfoAmount" + t).innerText = curResource.amount;

        if (curResource.tickDelta > 0) {
            document.getElementById("resourceInfoTickDelta" + t).innerText = "+" + curResource.tickDelta;
            document.getElementById("resourceInfoTickDelta" + t).style.color = "green";
        }
        else if (curResource.tickDelta < 0) {
            document.getElementById("resourceInfoTickDelta" + t).innerText = curResource.tickDelta;
            document.getElementById("resourceInfoTickDelta" + t).style.color = "red";
        }
        else {
            document.getElementById("resourceInfoTickDelta" + t).innerText = curResource.tickDelta;
            document.getElementById("resourceInfoTickDelta" + t).style.color = "black";
        }
    }

    uiDrawNewMessage();
}

function uiGetLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        str += curLink.amount + " " + resources[curLink.resourceId].name;
    }

    return str;
}

function uiGetNegLinksString(links) {
    var str = "";

    for (var t = 0; t < links.length; t++) {
        var curLink = links[t];

        if (str != "")
            str += ", ";

        str += "-" + curLink.amount + " " + resources[curLink.resourceId].name;
    }

    return str;
}

function uiDrawGrid() {
    if (fastIsOn) {
        document.getElementById("btnFast").className = "btn btn-success";
    }
    else {
        document.getElementById("btnFast").className = "btn btn-dark";
    }

    for (var y = 0; y < mapBuilding.mapHeight; y++) {
        for (var x = 0; x < mapBuilding.mapWidth; x++) {
            var curGrid = mapBuilding.grid[x + (y * mapBuilding.mapWidth)];

            document.getElementById("cell_" + x + "_" + y).className = "cell_" + cells[curGrid.cellId].id;

            if (curGrid.particles.length > 0) {
                document.getElementById("particle_" + x + "_" + y).className = "particle_" + particles[curGrid.getOutputParticleId()].id;
            }
            else
                document.getElementById("particle_" + x + "_" + y).className = "";

            if (curGrid.buildingId == BUILDING_STORAGEPIPE)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuilding.getSideStorageConnectionStr(x, y);
            else if (curGrid.buildingId == BUILDING_WATERPIPE)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuilding.getSideWaterConnectionStr(x, y);
            else if (curGrid.buildingId >= 0)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id;
            else
                document.getElementById("building_" + x + "_" + y).className = "";
        }
    }
}

function uiCellClick(gridX, gridY) {
    if (selectedBuildingId >= 0)
        mapBuilding.addBuilding(gridX, gridY, selectedBuildingId);
    else if (selectedBuildingId == -1)
        mapBuilding.processGridClick(gridX, gridY);
    else if (selectedBuildingId == -2)
        mapBuilding.sellBuilding(gridX, gridY);
    else if (selectedBuildingId == -3) {
        mapBuilding.upgradeGrid(gridX, gridY);
    }
    else if (selectedBuildingId == -4) {
        mapBuilding.downgradeGrid(gridX, gridY);
    }

    uiCellHover(gridX, gridY);
    uiDrawGrid();
    uiDrawResources();
}

function uiCellHover(gridX, gridY) {
    var htmlData = "";
    var htmlData2 = "";
    var curGrid = mapBuilding.grid[gridX + (gridY * mapBuilding.mapWidth)];

    if (curGrid.buildingId == -1) {
        var curCell = cells[curGrid.cellId];

        htmlData = "<b>" + curCell.name + "</b>";

        if (curGrid.getOutputParticleId() >= 0) {
            htmlData += " with " + curGrid.getOutputParticleLevel() + " " + particles[curGrid.getOutputParticleId()].name;
        }

        if (curCell.clickReward.length > 0) {
            htmlData += "<br />Click reward: " + curCell.getClickRewardString() + ".";
        }

        if (curCell.innerParticleId >= 0) {
            htmlData += "<br />Buried particles: " + particles[curCell.innerParticleId].name + ".";
        }

        document.getElementById("cellHover").innerHTML = htmlData;
        document.getElementById("cellHoverUpgrade").innerHTML = htmlData2;
    }
    else {
        uiBuildingHover(curGrid.buildingId, curGrid.buildingLevel, curGrid.getOutputParticleId(), curGrid.getOutputParticleLevel(), false);
    }

}

function uiSelectBuilding(buildingId) {
    uiBuildingHover(buildingId, 1, -1, -1, true);

    selectedBuildingId = buildingId;

    for (var i = -4; i < buildings.length; i++) {
        document.getElementById("building" + i).className = "buildingNotSelected";

        if (i == buildingId)
            document.getElementById("building" + i).className = "buildingSelected";
    }
}

function uiBuildingHover(buildingId, buildingLevel, particleId, particleLevel, fromIcon) {
    var htmlData = "";
    var htmlData2 = "";

    if (buildingId == -1) {
        htmlData = "Can click on map grid.";
    }
    else if (buildingId == -2) {
        htmlData = "Sell building on map.";
    }
    else if (buildingId == -3) {
        htmlData = "Upgrade building.";
    }
    else if (buildingId == -4) {
        htmlData = "Downgrade building.";
    }
    else if (buildingId >= 0) {
        var curBuilding = buildings[buildingId];

        htmlData = "<b>" + curBuilding.name + "</b>";

        if (buildingLevel > 0 && !fromIcon) {
            htmlData += " lvl " + buildingLevel;
        }

        if (particleId >= 0) {
            htmlData += " with " + particleLevel + " " + particles[particleId].name;
        }

        if (fromIcon) {
            if (curBuilding.costRequirements.length > 0) {
                htmlData += ", Cost: " + curBuilding.getCostRequirementsString();
            }
        }

        if (curBuilding.description != "")
            htmlData += "<br />" + curBuilding.description;

        if (curBuilding.requirements.length > 0) {
            htmlData += "<br />Requirements: " + curBuilding.getTickRequirementsString(buildingLevel);
        }

        if (curBuilding.rewards.length > 0) {
            htmlData += "<br />Rewards: " + curBuilding.getTickRewardsString(buildingLevel);
        }

        if (curBuilding.generateParticleId >= 0) {
            htmlData += "<br />Particle Generated: " + particles[curBuilding.generateParticleId].name;
        }

        //////////////

        if (!fromIcon) {
            if (curBuilding.upgradeRequirements.length > 0) {
                htmlData2 = "<b>Upgrade</b>, Cost: " + curBuilding.getUpgradeRequirementsString(buildingLevel);

                if (curBuilding.requirements.length > 0) {
                    htmlData2 += "<br />Requirements: " + curBuilding.getTickRequirementsString(buildingLevel + 1);
                }

                if (curBuilding.rewards.length > 0) {
                    htmlData2 += "<br />Rewards: " + curBuilding.getTickRewardsString(buildingLevel + 1);
                }
            }
        }
    }

    document.getElementById("cellHover").innerHTML = htmlData;
    document.getElementById("cellHoverUpgrade").innerHTML = htmlData2;
}

function uiDrawAdventure() {
    document.getElementById("playerDistance").innerText = mapAdventure.currentDistance;
    document.getElementById("playerMaxDistance").innerText = mapAdventure.maxDistance;

    document.getElementById("playerCurrentLife").innerText = mapAdventure.currentPlayer.vitality;
    document.getElementById("playerMaxLife").innerText = mapAdventure.currentPlayer.getVitality();
    document.getElementById("playerAttack").innerText = mapAdventure.currentPlayer.getStrength();
    document.getElementById("playerDefence").innerText = mapAdventure.currentPlayer.getDefence();

    if (mapAdventure.currentPlayer.vitalityTickDelta > 0) {
        document.getElementById("playerLifeDelta").innerText = "+" + mapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "green";
    }
    else if (mapAdventure.currentPlayer.vitalityTickDelta < 0) {
        document.getElementById("playerLifeDelta").innerText = mapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "red";
    }
    else {
        document.getElementById("playerLifeDelta").innerText = mapAdventure.currentPlayer.vitalityTickDelta;
        document.getElementById("playerLifeDelta").style.color = "black";
    }

    if (mapAdventure.currentEnemy == null) {
        document.getElementById("adventureWalk").style.display = "block";
        document.getElementById("adventureAttack").style.display = "none";
    }
    else {
        document.getElementById("adventureWalk").style.display = "none";
        document.getElementById("adventureAttack").style.display = "block";

        document.getElementById("enemyImage").src = "images/enemy_" + mapAdventure.currentEnemy.enemyId + ".png";

        document.getElementById("enemyCurrentLife").innerText = mapAdventure.currentEnemy.vitality;

        document.getElementById("enemyName").innerText = enemies[mapAdventure.currentEnemy.enemyId].name + " lvl " + mapAdventure.currentEnemy.level;
        document.getElementById("enemyMaxLife").innerText = mapAdventure.currentEnemy.maxVitality;
        document.getElementById("enemyAttack").innerText = mapAdventure.currentEnemy.strength;
        document.getElementById("enemyDefence").innerText = mapAdventure.currentEnemy.defence;

        if (mapAdventure.currentEnemy.vitalityTickDelta > 0) {
            document.getElementById("enemyLifeDelta").innerText = "+" + mapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "green";
        }
        else if (mapAdventure.currentEnemy.vitalityTickDelta < 0) {
            document.getElementById("enemyLifeDelta").innerText = mapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "red";
        }
        else {
            document.getElementById("enemyLifeDelta").innerText = mapAdventure.currentEnemy.vitalityTickDelta;
            document.getElementById("enemyLifeDelta").style.color = "black";
        }
    }

    ///////////////

    document.getElementById("playerInfoExperience").innerText = mapAdventure.currentPlayer.experience;
    document.getElementById("playerInfoVitality").innerText = mapAdventure.currentPlayer.getVitality();
    document.getElementById("playerInfoStrength").innerText = mapAdventure.currentPlayer.getStrength();
    document.getElementById("playerInfoDefence").innerText = mapAdventure.currentPlayer.getDefence();

    document.getElementById("playerInfoVitalityPoint").innerText = mapAdventure.currentPlayer.pointVitality;
    document.getElementById("playerInfoStrengthPoint").innerText = mapAdventure.currentPlayer.pointStrength;
    document.getElementById("playerInfoDefencePoint").innerText = mapAdventure.currentPlayer.pointDefence;

    document.getElementById("playerInfoPointLeft").innerText = mapAdventure.currentPlayer.getPointLeft();
    document.getElementById("playerInfoTotalPoint").innerText = mapAdventure.currentPlayer.getTotalPoint();
}

function uiChangeVitalityPoint(pointDelta) {
    mapAdventure.currentPlayer.changeVitalityPoint(pointDelta);
    uiDrawAdventure();
}

function uiChangeStrengthPoint(pointDelta) {
    mapAdventure.currentPlayer.changeStrengthPoint(pointDelta);
    uiDrawAdventure();
}

function uiChangeDefencePoint(pointDelta) {
    mapAdventure.currentPlayer.changeDefencePoint(pointDelta);
    uiDrawAdventure();
}

function uiStartStopHealMagic() {
    mapAdventure.currentPlayer.canUseHealMagic = document.getElementById("playerUseManaHeal").checked;
}

function uiStartStopFireMagic() {
    mapAdventure.currentPlayer.canUseFireMagic = document.getElementById("playerUseManaFire").checked;
}

function uiWriteDebug(msg) {
    document.getElementById("debug").value = msg;
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    uiClearTooltipSection();
});

function uiClearTooltipSection() {
    document.getElementById("cellHover").innerText = "";
    document.getElementById("cellHoverUpgrade").innerText = "";
}

function uiTestBuildingGrade() {
    var newGrade = parseInt(document.getElementById("manaPowerTest").value);

    buildings[BUILDING_ESSENCEPULL].gradeLevel = newGrade;
    buildings[BUILDING_GREENPUSH].gradeLevel = newGrade;
    buildings[BUILDING_BLUEPUSH].gradeLevel = newGrade;
    buildings[BUILDING_REDPUSH].gradeLevel = newGrade;
}

function uiDrawQuest() {
    document.getElementById("quest0Test").innerText = mapAdventure.maxDistance;

    if (quests[0].isCompleted) {
        document.getElementById("quest0Test2").style.display = "block";
    }
}

//////////////////////

var textToWrite = "";
var textToWriteSpeed = 10;
var textToWriteIndex = 0;

function uiDrawNewMessage() {
    if (messages.length > 0) {
        if (document.getElementById("messageSection").style.display == "none") {
            document.getElementById("messageSection").style.display = "block";
            document.getElementById("tooltipSection").style.display = "none";

            var msg = messages[0];
            messages.shift();

            uiDrawMessage(msg);
        }
    }
}

function uiDrawMessage(msg) {
    textToWrite = msg;
    textToWriteIndex = 0;

    document.getElementById("messageInnerText").innerHTML = "";

    setTimeout(uiDrawMessageAnim, textToWriteSpeed);
}

function uiCloseMessage() {
    document.getElementById("messageSection").style.display = "none";
    document.getElementById("tooltipSection").style.display = "block";

    uiDrawNewMessage();
}

function uiDrawMessageAnim() {
    if (textToWriteIndex < textToWrite.length) {
        document.getElementById("messageInnerText").innerHTML += textToWrite.charAt(textToWriteIndex);
        textToWriteIndex++;
        setTimeout(uiDrawMessageAnim, textToWriteSpeed);
    }
}