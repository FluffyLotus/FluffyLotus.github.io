function uiCreateGrid() {
    var str = "";

    for (var y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
        str += "<tr>";

        for (var x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
            str += '<td id="cell_' + x + '_' + y + '" class="spriteSheetCell"><div id="particle_' + x + '_' + y + '" class="spriteSheetParticle"><div id="building_' + x + '_' + y + '" class="spriteSheetBuilding"></div></div></td>';
        }

        str += "</tr>";
    }

    document.getElementById("mainGrid").innerHTML = str;

    for (let y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
        for (let x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
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

    for (var y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
        for (var x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
            var curGrid = getMapBuildingFromId(currentMapBuilding).grid[x + (y * getMapBuildingFromId(currentMapBuilding).mapWidth)];
            var imgX, imgY;

            imgX = getImagePositionX("cell", getCellFromId(curGrid.cellId).imageName);
            imgY = getImagePositionY("cell", getCellFromId(curGrid.cellId).imageName);

            //document.getElementById("cell_" + x + "_" + y).className = "cell_" + cells[curGrid.cellId].id;
            $("#cell_" + x + "_" + y).css('background-position-x', -imgX + 'px');
            $("#cell_" + x + "_" + y).css('background-position-y', -imgY + 'px');

            if (curGrid.particles.length > 0) {
                //document.getElementById("particle_" + x + "_" + y).className = "particle_" + particles[curGrid.getOutputParticleId()].id;
                imgX = getImagePositionX("particle", getParticleFromId(curGrid.getOutputParticleId()).imageName);
                imgY = getImagePositionY("particle", getParticleFromId(curGrid.getOutputParticleId()).imageName);

                $("#particle_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#particle_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            else {
                //document.getElementById("particle_" + x + "_" + y).className = "";
                $("#particle_" + x + "_" + y).css('background-position-x', '-9999px');
                $("#particle_" + x + "_" + y).css('background-position-y', '-9999px');
            }

            if (curGrid.buildingId == BUILDING_STORAGEPIPE || curGrid.buildingId == BUILDING_UNDERGROUNDPIPE) {
                //document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuildings[currentMapBuilding].getSideStorageConnectionStr(x, y);
                imgX = getImagePositionX("building", getBuildingFromId(curGrid.buildingId).imageName[curGrid.buildingGradeLevel] + "_" + getMapBuildingFromId(currentMapBuilding).getSideStorageConnectionStr(x, y));
                imgY = getImagePositionY("building", getBuildingFromId(curGrid.buildingId).imageName[curGrid.buildingGradeLevel] + "_" + getMapBuildingFromId(currentMapBuilding).getSideStorageConnectionStr(x, y));

                $("#building_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#building_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            //else if (curGrid.buildingId == BUILDING_WATERPIPE) {
            //    //document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id + "_" + mapBuildings[currentMapBuilding].getSideWaterConnectionStr(x, y);
            //    imgX = getImagePositionX("building", buildings[curGrid.buildingId].id, mapBuildings[currentMapBuilding].getSideWaterConnectionStr(x, y));
            //    imgY = getImagePositionY("building", buildings[curGrid.buildingId].id, mapBuildings[currentMapBuilding].getSideWaterConnectionStr(x, y));

            //    $("#building_" + x + "_" + y).css('background-position-x', -imgX + 'px');
            //    $("#building_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            //}
            else if (curGrid.buildingId >= 0) {
                //document.getElementById("building_" + x + "_" + y).className = "building_" + buildings[curGrid.buildingId].id;
                imgX = getImagePositionX("building", getBuildingFromId(curGrid.buildingId).imageName[curGrid.buildingGradeLevel]);
                imgY = getImagePositionY("building", getBuildingFromId(curGrid.buildingId).imageName[curGrid.buildingGradeLevel]);
                
                $("#building_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#building_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            else {
                //document.getElementById("building_" + x + "_" + y).className = "";
                $("#building_" + x + "_" + y).css('background-position-x', '-9999px');
                $("#building_" + x + "_" + y).css('background-position-y', '-9999px');
            }
        }
    }
}

function uiCellClick(gridX, gridY) {
    if (selectedBuildingId >= 0) {
        processAddBuilding = parseInt($("#buildingLevelBar").val()) - 1;

        getMapBuildingFromId(currentMapBuilding).addBuilding(gridX, gridY, selectedBuildingId, processAddBuilding);
    }
    else if (selectedBuildingId == -1)
        getMapBuildingFromId(currentMapBuilding).processGridClick(gridX, gridY);
    else if (selectedBuildingId == -2)
        getMapBuildingFromId(currentMapBuilding).sellBuilding(gridX, gridY);
    else if (selectedBuildingId == -3) {
        getMapBuildingFromId(currentMapBuilding).upgradeGrid(gridX, gridY);
    }
    else if (selectedBuildingId == -4) {
        getMapBuildingFromId(currentMapBuilding).downgradeGrid(gridX, gridY);
    }

    uiCellHover(gridX, gridY);
    uiDrawGrid();
    uiDrawResources();
    uiDrawNewMessage();
}

function uiCellHover(gridX, gridY) {
    var htmlData = "";
    var htmlData2 = "";
    var curGrid = getMapBuildingFromId(currentMapBuilding).grid[gridX + (gridY * getMapBuildingFromId(currentMapBuilding).mapWidth)];

    if (curGrid.buildingId == -1) {
        var curCell = getCellFromId(curGrid.cellId);

        htmlData = "<b>" + curCell.name + "</b>";

        if (curGrid.getOutputParticleId() >= 0) {
            htmlData += " with " + curGrid.getOutputParticleLevel() + " " + getParticleFromId(curGrid.getOutputParticleId()).name;
        }

        if (curCell.clickReward.length > 0) {
            htmlData += "<br />Click reward: " + curCell.getClickRewardString() + ".";
        }

        if (curCell.innerParticleId >= 0) {
            htmlData += "<br />Buried particles: " + getParticleFromId(curCell.innerParticleId).name + ".";
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
        if (document.getElementById("building" + i) != null) {
            document.getElementById("building" + i).className = "buildingNotSelected";

            if (i == buildingId)
                document.getElementById("building" + i).className = "buildingSelected";
        }
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
        var curBuilding = getBuildingFromId(buildingId);
        var grade = parseInt($("#buildingLevelBar").val()) - 1;

        grade = curBuilding.getMaxAvailableGrade(grade);

        htmlData = "<b>" + curBuilding.name + "</b>";

        if (buildingLevel > 0 && !fromIcon) {
            htmlData += " lvl " + buildingLevel;
        }

        if (particleId >= 0) {
            htmlData += " with " + particleLevel + " " + getParticleFromId(particleId).name;
        }

        if (fromIcon) {
            if (curBuilding.costRequirements.length > 0) {
                htmlData += ", Cost: " + curBuilding.getCostRequirementsString(grade);
            }
        }

        if (curBuilding.description != "")
            htmlData += "<br />" + curBuilding.description;

        if (curBuilding.requirements.length > 0) {
            htmlData += "<br />Requirements: " + curBuilding.getTickRequirementsString(buildingLevel, grade);
        }

        if (curBuilding.rewards.length > 0) {
            htmlData += "<br />Rewards: " + curBuilding.getTickRewardsString(buildingLevel, grade);
        }

        if (curBuilding.generateParticleId >= 0) {
            htmlData += "<br />Particle Generated: " + getParticleFromId(curBuilding.generateParticleId).name;
        }

        //////////////

        if (!fromIcon) {
            if (curBuilding.upgradeRequirements.length > 0) {
                htmlData2 = "<b>Upgrade</b>, Cost: " + curBuilding.getUpgradeRequirementsString(buildingLevel, grade);

                if (curBuilding.requirements.length > 0) {
                    htmlData2 += "<br />Requirements: " + curBuilding.getTickRequirementsString(buildingLevel + 1, grade);
                }

                if (curBuilding.rewards.length > 0) {
                    htmlData2 += "<br />Rewards: " + curBuilding.getTickRewardsString(buildingLevel + 1, grade);
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

    uiDrawBuildingIcon2();
}

function uiDrawBuildingIcon2() {
    var grade = parseInt($("#buildingLevelBar").val()) - 1;

    for (var t = 0; t < buildings.length; t++) {
        if ($("#building" + buildings[t].id).length > 0) {
            var bGrade = buildings[t].getMaxAvailableGrade(grade);

            var imgX = getImagePositionX("building", buildings[t].imageName[bGrade]);
            var imgY = getImagePositionY("building", buildings[t].imageName[bGrade]);

            $("#building" + buildings[t].id).children().first().css('background-position-x', -imgX + 'px');
            $("#building" + buildings[t].id).children().first().css('background-position-y', -imgY + 'px');
        }
    }
}