var showBuildingLevel = false;

function uiChangeShowBuildingLevel() {
    showBuildingLevel = $("#showBuildingLevel").is(':checked');
}

function uiCreateGrid() {
    var str = "";

    //for (var y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
    for (var y = 0; y < currentMapBuildingRef.mapHeight; y++) {
        str += "<tr>";

        //for (var x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
        for (var x = 0; x < currentMapBuildingRef.mapWidth; x++) {
            str += '<td id="cell_' + x + '_' + y + '" class="spriteSheetCell"><div id="particle_' + x + '_' + y + '" class="spriteSheetParticle"><div id="building_' + x + '_' + y + '" class="spriteSheetBuilding"><span id="buildingLevel_' + x + '_' + y + '" class="buildingLevel"></span></div></div></td>';
        }

        str += "</tr>";
    }

    document.getElementById("mainGrid").innerHTML = str;

    //for (let y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
    for (let y = 0; y < currentMapBuildingRef.mapHeight; y++) {
        //for (let x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
        for (let x = 0; x < currentMapBuildingRef.mapWidth; x++) {
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

    var canChangeGrade = false;

    for (var t = 0; t < buildings.length; t++) {
        if (buildings[t].isVisible()) {
            if (buildings[t].getMaxAvailableGrade(10) > 1) {
                canChangeGrade = true;
                break;
            }
        }
    }

    if (canChangeGrade) {
        $("#buildingGradeSection").show();
    }
    else {
        $("#buildingGradeSection").hide();
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

    //for (var y = 0; y < getMapBuildingFromId(currentMapBuilding).mapHeight; y++) {
    for (var y = 0; y < currentMapBuildingRef.mapHeight; y++) {
        //for (var x = 0; x < getMapBuildingFromId(currentMapBuilding).mapWidth; x++) {
        for (var x = 0; x < currentMapBuildingRef.mapWidth; x++) {
            //var curGrid = getMapBuildingFromId(currentMapBuilding).grid[x + (y * getMapBuildingFromId(currentMapBuilding).mapWidth)];
            var curGrid = currentMapBuildingRef.grid[x + (y * currentMapBuildingRef.mapWidth)];
            var imgX, imgY;

            //imgX = getImagePositionX("cell", getCellFromId(curGrid.cellId).imageName);
            //imgY = getImagePositionY("cell", getCellFromId(curGrid.cellId).imageName);
            imgX = curGrid.cellRef.imageNameRef.X;
            imgY = curGrid.cellRef.imageNameRef.Y;

            $("#cell_" + x + "_" + y).css('background-position-x', -imgX + 'px');
            $("#cell_" + x + "_" + y).css('background-position-y', -imgY + 'px');

            if (curGrid.particles.length > 0) {
                var op = curGrid.getOutputParticle();

                //imgX = getImagePositionX("particle", op.particleRef.imageName);
                //imgY = getImagePositionY("particle", op.particleRef.imageName);
                imgX = op.particleRef.imageNameRef.X;
                imgY = op.particleRef.imageNameRef.Y;

                $("#particle_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#particle_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            else {
                $("#particle_" + x + "_" + y).css('background-position-x', '-9999px');
                $("#particle_" + x + "_" + y).css('background-position-y', '-9999px');
            }

            if (curGrid.buildingInst != null && (curGrid.buildingInst.buildingId == BUILDING_STORAGEPIPE || curGrid.buildingInst.buildingId == BUILDING_UNDERGROUNDPIPE)) {
                //imgX = getImagePositionX("building", getBuildingFromId(curGrid.buildingInst.buildingId).imageName[curGrid.buildingInst.buildingGradeLevel] + "_" + getMapBuildingFromId(currentMapBuilding).getSideStorageConnectionStr(x, y));
                //imgY = getImagePositionY("building", getBuildingFromId(curGrid.buildingInst.buildingId).imageName[curGrid.buildingInst.buildingGradeLevel] + "_" + getMapBuildingFromId(currentMapBuilding).getSideStorageConnectionStr(x, y));
                imgX = getImagePositionX("building", curGrid.buildingInst.buildingRef.imageName[curGrid.buildingInst.buildingGradeLevel] + "_" + currentMapBuildingRef.getSideStorageConnectionStr(x, y));
                imgY = getImagePositionY("building", curGrid.buildingInst.buildingRef.imageName[curGrid.buildingInst.buildingGradeLevel] + "_" + currentMapBuildingRef.getSideStorageConnectionStr(x, y));

                $("#building_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#building_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            else if (curGrid.buildingInst != null) {
                //imgX = getImagePositionX("building", getBuildingFromId(curGrid.buildingInst.buildingId).imageName[curGrid.buildingInst.buildingGradeLevel]);
                //imgY = getImagePositionY("building", getBuildingFromId(curGrid.buildingInst.buildingId).imageName[curGrid.buildingInst.buildingGradeLevel]);
                imgX = getImagePositionX("building", curGrid.buildingInst.buildingRef.imageName[curGrid.buildingInst.buildingGradeLevel]);
                imgY = getImagePositionY("building", curGrid.buildingInst.buildingRef.imageName[curGrid.buildingInst.buildingGradeLevel]);

                $("#building_" + x + "_" + y).css('background-position-x', -imgX + 'px');
                $("#building_" + x + "_" + y).css('background-position-y', -imgY + 'px');
            }
            else {
                $("#building_" + x + "_" + y).css('background-position-x', '-9999px');
                $("#building_" + x + "_" + y).css('background-position-y', '-9999px');
            }

            if (curGrid.buildingInst != null && showBuildingLevel) {
                //var b = getBuildingFromId(curGrid.buildingInst.buildingId);
                var b = curGrid.buildingInst.buildingRef;

                // Might need a .canUpgrade()
                if (b.upgradeRequirements.length > 0)
                    $("#buildingLevel_" + x + "_" + y).text(curGrid.buildingInst.buildingLevel);
                else
                    $("#buildingLevel_" + x + "_" + y).text("");
            }
            else {
                $("#buildingLevel_" + x + "_" + y).text("");
            }
        }
    }
}

function uiCellClick(gridX, gridY) {
    if (selectedBuildingId >= 0) {
        processAddBuilding = parseInt($("#buildingLevelBar").val()) - 1;

        //getMapBuildingFromId(currentMapBuilding).addBuilding(gridX, gridY, selectedBuildingId, processAddBuilding);
        currentMapBuildingRef.addBuilding(gridX, gridY, selectedBuildingId, processAddBuilding);
    }
    else if (selectedBuildingId == -1)
        //getMapBuildingFromId(currentMapBuilding).processGridClick(gridX, gridY);
        currentMapBuildingRef.processGridClick(gridX, gridY);
    else if (selectedBuildingId == -2)
        //getMapBuildingFromId(currentMapBuilding).sellBuilding(gridX, gridY);
        currentMapBuildingRef.sellBuilding(gridX, gridY);
    else if (selectedBuildingId == -3) {
        //getMapBuildingFromId(currentMapBuilding).upgradeGrid(gridX, gridY);
        currentMapBuildingRef.upgradeGrid(gridX, gridY);
    }
    else if (selectedBuildingId == -4) {
        //getMapBuildingFromId(currentMapBuilding).downgradeGrid(gridX, gridY);
        currentMapBuildingRef.downgradeGrid(gridX, gridY);
    }

    uiCellHover(gridX, gridY);
    uiDrawGrid();
    uiDrawResources();
    uiDrawNewMessage();
}

function uiCellHover(gridX, gridY) {
    var htmlData = "";
    var htmlData2 = "";
    //var curGrid = getMapBuildingFromId(currentMapBuilding).grid[gridX + (gridY * getMapBuildingFromId(currentMapBuilding).mapWidth)];
    var curGrid = currentMapBuildingRef.grid[gridX + (gridY * currentMapBuildingRef.mapWidth)];

    if (curGrid.buildingInst == null) {
        //var curCell = getCellFromId(curGrid.cellId);
        var curCell = curGrid.cellRef;

        htmlData = "<b>" + curCell.name + "</b>";

        var op = curGrid.getOutputParticle();

        if (op != null && op.particleId >= 0) {
            htmlData += " with " + op.particleLevel + " " + op.particleRef.name;
        }

        if (curCell.clickReward.length > 0) {
            htmlData += "<br />Click reward: " + curCell.getClickRewardString() + ".";
        }

        if (curCell.innerParticleId >= 0) {
            //htmlData += "<br />Buried particles: " + getParticleFromId(curCell.innerParticleId).name + ".";
            htmlData += "<br />Buried particles: " + curCell.innerParticleRef.name + ".";
        }

        if (curCell.importParticleCount > 0) {
            //var curPart = getParticleFromId(curCell.importParticleId);
            var curPart = curCell.importParticleRef;

            htmlData += "<br />Imported " + curCell.importParticleCount + " " + curPart.name + ".";
        }

        uiSetTooltip(htmlData, htmlData2);
    }
    else {
        var op = curGrid.getOutputParticle();

        if(op == null)
            uiBuildingHover(curGrid.buildingInst.buildingId, curGrid.buildingInst.buildingLevel, -1, 0, false);
        else
            uiBuildingHover(curGrid.buildingInst.buildingId, curGrid.buildingInst.buildingLevel, op.particleId, op.particleLevel, false);
    }

}

function uiSelectBuilding(buildingId) {
    uiBuildingHover(buildingId, 1, -1, -1, true);

    selectedBuildingId = buildingId;

    for (var i = -4; i < buildings.length; i++) {
        var curBuildingId = i;

        if (i >= 0) {
            curBuildingId = buildings[i].id;
        }

        if (document.getElementById("building" + curBuildingId) != null) {
            document.getElementById("building" + curBuildingId).className = "buildingNotSelected";

            if (curBuildingId == buildingId)
                document.getElementById("building" + curBuildingId).className = "buildingSelected";
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
            htmlData += "<br />Req: " + curBuilding.getTickRequirementsString(buildingLevel, grade);
        }

        if (curBuilding.rewards.length > 0) {
            htmlData += "<br />Rew: " + curBuilding.getTickRewardsString(buildingLevel, grade);
        }

        if (curBuilding.generateParticleId >= 0) {
            //htmlData += "<br />Particle Generated: " + getParticleFromId(curBuilding.generateParticleId).name;
            htmlData += "<br />Particle Generated: " + curBuilding.generateParticleRef.name;
        }

        //////////////

        if (!fromIcon) {
            if (curBuilding.upgradeRequirements.length > 0) {
                htmlData2 = "<b>Upgrade</b>, Cost: " + curBuilding.getUpgradeRequirementsString(buildingLevel, grade);

                if (curBuilding.requirements.length > 0) {
                    htmlData2 += "<br />Req: " + curBuilding.getTickRequirementsString(buildingLevel + 1, grade);
                }

                if (curBuilding.rewards.length > 0) {
                    htmlData2 += "<br />Rew: " + curBuilding.getTickRewardsString(buildingLevel + 1, grade);
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
    currentMapBuildingId = parseInt(document.getElementById("mapSelected").value);
    currentMapBuildingRef = getMapBuildingFromId(currentMapBuildingId);
}

function uiDrawBuildMapSelection() {
    var mapCount = 0;

    for (var t = 0; t < mapBuildings.length; t++) {
        if (mapBuildings[t].isActive) {
            mapCount++;

            if ($("#mapSelected option[value='" + mapBuildings[t].id + "']").length == 0) {
                $("#mapSelected").append("<option value='" + mapBuildings[t].id + "'>" + mapBuildings[t].name + "</option>");
            }
        }
    }

    if (mapCount < 2)
        $("#mapSelected").hide();
    else
        $("#mapSelected").show();
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