var TOOLTIP_TYPE_NONE = 0;
var TOOLTIP_TYPE_CELL = 1;
var TOOLTIP_TYPE_QUEST = 2;
var TOOLTIP_TYPE_ACTION = 3;
var TOOLTIP_TYPE_BUILDING = 4;
var TOOLTIP_TYPE_MESSAGE = 5;
var TOOLTIP_TYPE_RESOURCE = 6;

var currentToolTipType = TOOLTIP_TYPE_NONE;
var currentToolTipInfo = 0;

function uiUpdateToolTip() {
    if (currentToolTipType == TOOLTIP_TYPE_CELL)
        uiUpdateCellTooltip(currentToolTipInfo.x, currentToolTipInfo.y);
    if (currentToolTipType == TOOLTIP_TYPE_QUEST)
        uiUpdateQuestTooltip(currentToolTipInfo);
    if (currentToolTipType == TOOLTIP_TYPE_ACTION)
        uiUpdateActionTooltip(currentToolTipInfo);
    if (currentToolTipType == TOOLTIP_TYPE_BUILDING)
        uiUpdateBuildingTooltip(currentToolTipInfo);
    if (currentToolTipType == TOOLTIP_TYPE_MESSAGE)
        uiUpdateTooltip(currentToolTipInfo);
    if (currentToolTipType == TOOLTIP_TYPE_RESOURCE)
        uiUpdateResourceTooltip(currentToolTipInfo);
}

function uiClearTooltip() {
    if (currentToolTipType != TOOLTIP_TYPE_CELL) $("#toolTipCell").hide();
    if (currentToolTipType != TOOLTIP_TYPE_QUEST) $("#toolTipQuest").hide();
    if (currentToolTipType != TOOLTIP_TYPE_ACTION) $("#toolTipAction").hide();
    if (currentToolTipType != TOOLTIP_TYPE_BUILDING) $("#toolTipBuilding").hide();
    if (currentToolTipType != TOOLTIP_TYPE_MESSAGE) $("#toolTipMessage").hide();
    if (currentToolTipType != TOOLTIP_TYPE_RESOURCE) $("#toolTipResource").hide();
}

function uiSetActionTooltip(actionId) {
    currentToolTipType = TOOLTIP_TYPE_ACTION;
    currentToolTipInfo = actionId;

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

function uiUpdateActionTooltip(actionId) {
}

function uiSetBuildingTooltip(buildingId) {
    currentToolTipType = TOOLTIP_TYPE_BUILDING;
    currentToolTipInfo = buildingId;

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

function uiUpdateBuildingTooltip(buildingId) {
    var curBuilding = getBuildingFromId(buildingId);

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
    currentToolTipType = TOOLTIP_TYPE_CELL;
    currentToolTipInfo = { x: x, y: y };

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

function uiUpdateCellTooltip(x, y) {
    var curMap = getMapFromId(selectedMapId);
    var curCell = curMap.cells[x + (y * MAP_WIDTH)];
    var curState = getCellStateFromId(curCell.getStateId());

    if (curState.questId >= 0) {
        uiUpdateQuestTooltip(curState.questId);
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
    currentToolTipType = TOOLTIP_TYPE_QUEST;
    currentToolTipInfo = questId;

    uiClearTooltip();

    var curQuest = getQuestFromId(questId);

    $("#toolTipQuest_name").text(curQuest.title);

    if (curQuest.completed) {
        $("#toolTipQuest_description").text(curQuest.completeDescription);
        $("#completeQuest").hide();
        $("#toolTipQuest_requirementRow").hide();
        $("#toolTipQuest_completed").show();
    }
    else {
        $("#toolTipQuest_description").text(curQuest.description);
        $("#completeQuest").show
        $("#toolTipQuest_requirementRow").show();
        $("#toolTipQuest_completed").hide();
    } 

    $("#toolTipQuest_requirement").html(dataLinksToStringOneLine(curQuest.requirements));

    $("#toolTipQuest").show();
}

function uiUpdateQuestTooltip(questId) {
    var curQuest = getQuestFromId(questId);

    $("#toolTipQuest_name").text(curQuest.title);

    if (curQuest.completed) {
        $("#toolTipQuest_description").text(curQuest.completeDescription);
        $("#completeQuest").hide();
        $("#toolTipQuest_requirementRow").hide();
        $("#toolTipQuest_completed").show();
    }
    else {
        $("#toolTipQuest_description").text(curQuest.description);
        $("#completeQuest").show();
        $("#toolTipQuest_requirementRow").show();
        $("#toolTipQuest_completed").hide();
    }

    $("#toolTipQuest_requirement").html(dataLinksToStringOneLine(curQuest.requirements));
}

function uiSetResourceTooltip(resourceId) {
    currentToolTipType = TOOLTIP_TYPE_RESOURCE;
    currentToolTipInfo = resourceId;

    uiClearTooltip();

    var curResource = getResourceFromId(resourceId);

    $("#toolTipResource_name").text(curResource.name);
    $("#toolTipResource_description").text("Some description");

    $("#toolTipResource").show();
}

function uiUpdateResourceTooltip(resourceId) {
    var curResource = getResourceFromId(resourceId);
}

function uiSetTooltip(message) {
    currentToolTipType = TOOLTIP_TYPE_MESSAGE;
    currentToolTipInfo = message;

    uiClearTooltip();

    //$("#messageInnerText").html(message);

    $("#toolTipMessage").show();
}

function uiUpdateTooltip(message) {
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