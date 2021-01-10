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

    for (var y = 0; y < mapBuildings[currentMapBuilding].mapHeight; y++) {
        str += "<tr>";

        for (var x = 0; x < mapBuildings[currentMapBuilding].mapWidth; x++) {
            str += '<td id="cell_' + x + '_' + y + '"><div id="particle_' + x + '_' + y + '"><div id="building_' + x + '_' + y + '"></div></div></td>';
        }

        str += "</tr>";
    }

    document.getElementById("mainGrid").innerHTML = str;

    for (let y = 0; y < mapBuildings[currentMapBuilding].mapHeight; y++) {
        for (let x = 0; x < mapBuildings[currentMapBuilding].mapWidth; x++) {
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

    for (var y = 0; y < mapBuildings[currentMapBuilding].mapHeight; y++) {
        for (var x = 0; x < mapBuildings[currentMapBuilding].mapWidth; x++) {
            var curGrid = mapBuildings[currentMapBuilding].grid[x + (y * mapBuildings[currentMapBuilding].mapWidth)];

            document.getElementById("cell_" + x + "_" + y).className = "cell_" + cells[curGrid.cellId].id;

            if (curGrid.particles.length > 0) {
                document.getElementById("particle_" + x + "_" + y).className = "particle_" + particles[curGrid.getOutputParticleId()].id;
            }
            else
                document.getElementById("particle_" + x + "_" + y).className = "";

            if (curGrid.buildingId == BUILDING_STORAGEPIPE)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuildings[currentMapBuilding].getSideStorageConnectionStr(x, y);
            else if (curGrid.buildingId == BUILDING_WATERPIPE)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuildings[currentMapBuilding].getSideWaterConnectionStr(x, y);
            else if (curGrid.buildingId >= 0)
                document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id;
            else
                document.getElementById("building_" + x + "_" + y).className = "";
        }
    }
}

function uiCellClick(gridX, gridY) {
    if (selectedBuildingId >= 0)
        mapBuildings[currentMapBuilding].addBuilding(gridX, gridY, selectedBuildingId);
    else if (selectedBuildingId == -1)
        mapBuildings[currentMapBuilding].processGridClick(gridX, gridY);
    else if (selectedBuildingId == -2)
        mapBuildings[currentMapBuilding].sellBuilding(gridX, gridY);
    else if (selectedBuildingId == -3) {
        mapBuildings[currentMapBuilding].upgradeGrid(gridX, gridY);
    }
    else if (selectedBuildingId == -4) {
        mapBuildings[currentMapBuilding].downgradeGrid(gridX, gridY);
    }

    uiCellHover(gridX, gridY);
    uiDrawGrid();
    uiDrawResources();
}

function uiCellHover(gridX, gridY) {
    var htmlData = "";
    var htmlData2 = "";
    var curGrid = mapBuildings[currentMapBuilding].grid[gridX + (gridY * mapBuildings[currentMapBuilding].mapWidth)];

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

    ///////////////
    /*
    document.getElementById("playerInfoExperience").innerText = mapAdventure.currentPlayer.experience;
    document.getElementById("playerInfoVitality").innerText = mapAdventure.currentPlayer.getVitality();
    document.getElementById("playerInfoStrength").innerText = mapAdventure.currentPlayer.getStrength();
    document.getElementById("playerInfoDefence").innerText = mapAdventure.currentPlayer.getDefence();

    document.getElementById("playerInfoVitalityPoint").innerText = mapAdventure.currentPlayer.pointVitality;
    document.getElementById("playerInfoStrengthPoint").innerText = mapAdventure.currentPlayer.pointStrength;
    document.getElementById("playerInfoDefencePoint").innerText = mapAdventure.currentPlayer.pointDefence;

    document.getElementById("playerInfoPointLeft").innerText = mapAdventure.currentPlayer.getPointLeft();
    document.getElementById("playerInfoTotalPoint").innerText = mapAdventure.currentPlayer.getTotalPoint();
    */
}

/*
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
*/
/*
function uiStartStopHealMagic() {
    //mapAdventure.currentPlayer.canUseHealMagic = document.getElementById("playerUseManaHeal").checked;
}

function uiStartStopFireMagic() {
    //mapAdventure.currentPlayer.canUseFireMagic = document.getElementById("playerUseManaFire").checked;
}
*/
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

function uiDrawQuest() {

    if (quests[0].isCompleted) {
        document.getElementById("quest0Test").innerText = "600";
        document.getElementById("quest0Test2").style.display = "block";
    }
    else {
        document.getElementById("quest0Test").innerText = mapAdventures[currentMapAdventure.currentMapAdventureId].maxDistance;
    }
}

function uiShowSkillTooltip(skillId) {
    var si = currentMapAdventure.currentPlayer.getSkillInstance(skillId);
    var s = skills[si.skillId];

    document.getElementById("cellHover").innerHTML = "<b>" + s.name + "</b>, lvl " + si.level + "<br />";

    if (skillId == SKILL_VITALITY) {
        document.getElementById("cellHover").innerHTML += "+" + si.getAmount() + " life";
    }
    else if (skillId == SKILL_STRENGTH) {
        document.getElementById("cellHover").innerHTML += "+" + si.getAmount() + " regular damage";
    }
    else if (skillId == SKILL_DEFENCE) {
        document.getElementById("cellHover").innerHTML += "+" + si.getAmount() + " regular defence";
    }
    else if (skillId == SKILL_HEAL) {
        document.getElementById("cellHover").innerHTML += "Use " + si.getAmount() + " green mana to heal " + si.getAmount() + " life<br />Cooldown: " + s.cooldown + " ticks";
    }
    else if (skillId == SKILL_FIRE) {
        document.getElementById("cellHover").innerHTML += "Use " + si.getAmount() + " red mana to hit " + si.getAmount() + " fire damage<br />Cooldown: " + s.cooldown + " tick";
    }

    document.getElementById("cellHoverUpgrade").innerHTML = "Training Requirements<br />" + getResourceLinkString(s.trainingRequirements, si.level);
}

function uiDrawSkills() {
    for (var i = 0; i < currentMapAdventure.currentPlayer.passiveSkills.length; i++) {
        var si = currentMapAdventure.currentPlayer.passiveSkills[i];
        var s = skills[si.skillId];

        document.getElementById("skill" + si.skillId + "Name").innerHTML = s.name

        if (si.trainingLevel < 10)
            document.getElementById("skill" + si.skillId + "Level").innerHTML = si.level + ".0" + si.trainingLevel;
        else
            document.getElementById("skill" + si.skillId + "Level").innerHTML = si.level + "." + si.trainingLevel;

        document.getElementById("skill" + si.skillId + "Progress").style.width = si.trainingLevel + "%";

        if (si.canUpgrade())
            $("#skill" + si.skillId + "UpgradeButton").show();
        else
            $("#skill" + si.skillId + "UpgradeButton").hide();
    }

    for (var i = 0; i < currentMapAdventure.currentPlayer.activeSkills.length; i++) {
        var si = currentMapAdventure.currentPlayer.activeSkills[i];
        var s = skills[si.skillId];

        document.getElementById("skill" + si.skillId + "Name").innerHTML = s.name;

        if (si.trainingLevel < 10)
            document.getElementById("skill" + si.skillId + "Level").innerHTML = si.level + ".0" + si.trainingLevel;
        else
            document.getElementById("skill" + si.skillId + "Level").innerHTML = si.level + "." + si.trainingLevel;

        document.getElementById("skill" + si.skillId + "Progress").style.width = si.trainingLevel + "%";

        if (si.canUpgrade())
            $("#skill" + si.skillId + "UpgradeButton").show();
        else
            $("#skill" + si.skillId + "UpgradeButton").hide();
    }
}

function uiUpgradeSkill(skillId) {
    var si = currentMapAdventure.currentPlayer.getSkillInstance(skillId);

    si.upgrade();
}

function uiSetSkillEquip(skillId) {
    var si = currentMapAdventure.currentPlayer.getSkillInstance(skillId);

    si.isEquip = document.getElementById("skill" + skillId + "Equip").checked;
}

function uiSetSkillTraining(skillId) {
    var si = currentMapAdventure.currentPlayer.getSkillInstance(skillId);

    si.isTraining = document.getElementById("skill" + skillId + "Training").checked;
}

function uiDrawCards() {
    for (var i = 0; i < cards.length; i++) {
        var c = cards[i];

        document.getElementById("card" + c.id + "Name").innerHTML = c.name;

        if (c.getCurrentLevelAmount() < 10)
            document.getElementById("card" + c.id + "Level").innerHTML = c.getCurrentLevel() + ".0" + c.getCurrentLevelAmount();
        else
            document.getElementById("card" + c.id + "Level").innerHTML = c.getCurrentLevel() + "." + c.getCurrentLevelAmount();

        document.getElementById("card" + c.id + "Description").innerHTML = c.description;

        if (c.canUpgrade())
            $("#card" + c.id + "UpgradeButton").show();
        else
            $("#card" + c.id + "UpgradeButton").hide();
    }
}

function uiUpgradeCard(cardId) {
    var c = cards[cardId];

    c.upgrade();
}

function uiTempChangeMap() {
    currentMapBuilding = parseInt(document.getElementById("mapSelected").value);
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