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

function uiDrawBuildingIcon() {
    for (var t = 0; t < buildings.length; t++) {
        if (buildings[t].isVisible()) {
            $("#building" + buildings[t].id).show();
        }
        else {
            $("#building" + buildings[t].id).hide();
        }
    }

    uiDrawBuildMapSelection();
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
    uiDrawNewMessage();
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

        uiSetTooltip(htmlData, htmlData2);
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
        else {
            htmlData2 = curBuilding.helpDescription;
        }
    }

    uiSetTooltip(htmlData, htmlData2);
}

function uiChangeBuildMap() {
    currentMapBuilding = parseInt(document.getElementById("mapSelected").value);
}

function uiDrawBuildMapSelection() {
    for (var t = 0; t < mapBuildings.length; t++) {
        if (mapBuildings[t].isActive) {
            if ($("#mapSelected option[value='" + mapBuildings[t].id + "']").length == 0) {
                $("#mapSelected").append("<option value='" + mapBuildings[t].id + "'>" + mapBuildings[t].name + "</option>");
            }
        }
    }
}

function uiChangeBuildingLevelDisplay() {
    var lvl = parseInt($("#buildingLevelBar").val());

    $("#buildingLevelBarValue").text(lvl);
}