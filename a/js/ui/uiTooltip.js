function uiClearTooltip() {
    $("#toolTipCell").hide();
    $("#toolTipQuest").hide();
    $("#toolTipAction").hide();
    $("#toolTipBuilding").hide();
    $("#toolTipMessage").hide();
    $("#toolTipResource").hide();
}

//function uiShowToggleFastTooltip() {
//}

function uiSetActionTooltip(actionId) {
    uiClearTooltip();

    if (actionId == ACTION_CLICK) {
        $("#toolTipAction_name").text("Click");
        $("#toolTipAction_description").text("Click on cell to select, view quest, execute actions.");
    }
    else if (actionId == ACTION_UPGRADE) {
        $("#toolTipAction_name").text("Update");
        $("#toolTipAction_description").text("Click on cell to upgrade the building.");
    }
    else if (actionId == ACTION_DOWNGRADE) {
        $("#toolTipAction_name").text("Downgrade");
        $("#toolTipAction_description").text("Click on cell to downgrade the building.");
    }
    else if (actionId == ACTION_DESTROY) {
        $("#toolTipAction_name").text("Destroy");
        $("#toolTipAction_description").text("Click on cell to destroy the building.");
    }

    $("#toolTipAction").show();
}

function uiSetBuildingTooltip(buildingId) {
    uiClearTooltip();

    var curBuilding = getBuildingFromId(buildingId);

    $("#toolTipBuilding_name").text(curBuilding.name);
    $("#toolTipBuilding_description").text(curBuilding.description);

    $("#toolTipBuilding_costRow").show();
    $("#toolTipBuilding_cost").html(dataLinksToStringOneAvailableLine(curBuilding.getBuildCost()));

    if (curBuilding.getRequirement(1).length > 0) {
        $("#toolTipBuilding_requirementRow").show();
        $("#toolTipBuilding_requirement").html(dataLinksToStringOneLine(curBuilding.getRequirement(1)));
    }
    else
        $("#toolTipBuilding_requirementRow").hide();

    if (curBuilding.getReward(1).length > 0) {
        $("#toolTipBuilding_rewardRow").show();
        $("#toolTipBuilding_reward").html(dataLinksToStringOneLine(curBuilding.getReward(1)));
    }
    else
        $("#toolTipBuilding_rewardRow").hide();

    $("#toolTipBuilding").show();
}

function uiSetCellTooltip(x, y) {
    uiClearTooltip();

    var curMap = getMapFromId(selectedMapId);
    var curCell = curMap.cells[x + (y * MAP_WIDTH)];
    var curState = getCellStateFromId(curCell.getStateId());

    if (curState.questId >= 0) {
        uiSetQuestTooltip(curState.questId);
    }
    else {
        $("#toolTipCell_name").text(curState.name);
        
        if (curCell.buildingInstance != null) {
            $("#toolTipCell_buildingInfo").show();

            curBuilding = getBuildingFromId(curCell.buildingInstance.buildingId);

            if (curBuilding.canUpgrade) {
                $("#toolTipCell_buildingName").text(curBuilding.name + " level " + curCell.buildingInstance.level);
                $("#toolTipCell_description").text("");
                
                $("#toolTipCell_cost").html(dataLinksToStringOneAvailableLine(curBuilding.getUpgradeCost(curCell.buildingInstance.level)));
                $("#toolTipCell_buildingUpgrade").show();
            }
            else {
                $("#toolTipCell_buildingName").text(curBuilding.name);
                $("#toolTipCell_description").text(curBuilding.description);
                $("#toolTipCell_buildingUpgrade").hide();
            }
        }
        else
            $("#toolTipCell_buildingInfo").hide();

        $("#toolTipCell").show();
    }
}

function uiSetQuestTooltip(questId) {
    uiClearTooltip();

    var curQuest = getQuestFromId(questId);

    $("#toolTipQuest_name").text(curQuest.title);

    if (quest.completed)
        $("#toolTipQuest_description").text(curQuest.completeDescription);    
    else
        $("#toolTipQuest_description").text(curQuest.description);    

    $("#toolTipQuest_requirement").html(dataLinksToStringOneLine(curQuest.requirements));

    $("#toolTipQuest").show();
}

function uiSetResourceTooltip(resourceId) {
    uiClearTooltip();

    var curResource = getResourceFromId(resourceId);

    $("#toolTipResource_name").text(curResource.name);
    $("#toolTipResource_description").text("Some description");

    $("#toolTipResource").show();
}

function uiSetTooltip(message) {
    //$("#messageInnerText").html(message);

    $("#toolTipMessage").show();
}

function dataLinksToString(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (dl[t].typeId == DLTYPE_RESOURCE)
            str += getResourceFromId(dl[t].objectId).name + ": " + (dl[t].amount) + "<br />";
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            str += getEnemyFromId(dl[t].objectId).name + ": " + getEnemyFromId(dl[t].objectId).totalKill + "/" + (dl[t].amount) + "<br />";
        }
        else
            str += "???<br />";
    }

    return str;
}

function dataLinksToStringOneLine(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (t > 0)
            str += ", ";

        if (dl[t].typeId == DLTYPE_RESOURCE)
            str += dl[t].amount + " " + getResourceFromId(dl[t].objectId).name;
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            str += getEnemyFromId(dl[t].objectId).name + ": " + getEnemyFromId(dl[t].objectId).totalKill + "/" + (dl[t].amount) + "<br />";
        }
        else
            str += "???";
    }

    return str;
}

function dataLinksToStringOneAvailableLine(dl) {
    var str = "";

    for (var t = 0; t < dl.length; t++) {
        if (t > 0)
            str += ", ";

        var amt, needed, name;

        if (dl[t].typeId == DLTYPE_RESOURCE) {
            amt = getResourceFromId(dl[t].objectId).amount;
            needed = dl[t].amount;
            name = getResourceFromId(dl[t].objectId).name;
        }
        else if (dl[t].typeId == DLTYPE_ENEMY) {
            amt = getEnemyFromId(dl[t].objectId).totalKill;
            needed = dl[t].amount;
            name = getEnemyFromId(dl[t].objectId).name;
        }
        else
            str += "???";

        if (amt < needed)
            str += "<span style='color: lightgray;'>" + amt + "/" + needed + " " + name + "</span>";
        else
            str += "<span>" + amt + "/" + needed + " " + name + "</span>";
    }

    return str;
}