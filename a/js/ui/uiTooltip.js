var TOOLTIP_TYPE_NONE = 0;
var TOOLTIP_TYPE_CELL = 1;
var TOOLTIP_TYPE_QUEST = 2;
var TOOLTIP_TYPE_ACTION = 3;
var TOOLTIP_TYPE_BUILDING = 4;
var TOOLTIP_TYPE_MESSAGE = 5;
var TOOLTIP_TYPE_RESOURCE = 6;

var currentHardToolTipType = TOOLTIP_TYPE_NONE;
var currentHardToolTipInfo = 0;

var currentSoftToolTipType = TOOLTIP_TYPE_NONE;
var currentSoftToolTipInfo = 0;

//////////////////////

function uiSetHardTooltip(toolTipType, info) {
    if (toolTipType == TOOLTIP_TYPE_RESOURCE) uiSetResourceTooltip(info, true);
    if (toolTipType == TOOLTIP_TYPE_ACTION) uiSetActionTooltip(info, true);
    if (toolTipType == TOOLTIP_TYPE_BUILDING) uiSetBuildingTooltip(info, true);
    if (toolTipType == TOOLTIP_TYPE_MESSAGE) uiSetMessageTooltip(info, true);
}

function uiSetSoftTooltip(toolTipType, info) {
    if (toolTipType == TOOLTIP_TYPE_RESOURCE) uiSetResourceTooltip(info, false);
    if (toolTipType == TOOLTIP_TYPE_ACTION) uiSetActionTooltip(info, false);
    if (toolTipType == TOOLTIP_TYPE_BUILDING) uiSetBuildingTooltip(info, false);
    if (toolTipType == TOOLTIP_TYPE_MESSAGE) uiSetMessageTooltip(info, false);
}

//////////////////////

function uiUpdateToolTip() {
    var toolTipType = currentSoftToolTipType;
    var toolTipInfo = currentSoftToolTipInfo;

    if (toolTipType == TOOLTIP_TYPE_NONE) {
        toolTipType = currentHardToolTipType;
        toolTipInfo = currentHardToolTipInfo;
    }

    if (toolTipType == TOOLTIP_TYPE_CELL)
        uiUpdateCellTooltip(toolTipInfo.x, toolTipInfo.y);
    if (toolTipType == TOOLTIP_TYPE_QUEST)
        uiUpdateQuestTooltip(toolTipInfo);
    if (toolTipType == TOOLTIP_TYPE_ACTION)
        uiUpdateActionTooltip(toolTipInfo);
    if (toolTipType == TOOLTIP_TYPE_BUILDING)
        uiUpdateBuildingTooltip(toolTipInfo);
    //if (toolTipType == TOOLTIP_TYPE_MESSAGE)
    //    uiUpdateTooltip(toolTipInfo);
    if (toolTipType == TOOLTIP_TYPE_RESOURCE)
        uiUpdateResourceTooltip(toolTipInfo);
}

function uiClearSoftTooltip() {
    currentSoftToolTipType = TOOLTIP_TYPE_NONE;
    currentSoftToolTipInfo = 0;

    uiClearTooltip();
    uiSetHardTooltip(currentHardToolTipType, currentHardToolTipInfo);
    //uiUpdateToolTip();
}

function uiClearTooltip() {
    var toolTipType = currentSoftToolTipType;

    if (toolTipType == TOOLTIP_TYPE_NONE) {
        toolTipType = currentHardToolTipType;
    }

    if (toolTipType != TOOLTIP_TYPE_CELL) $("#toolTipCell").hide();
    if (toolTipType != TOOLTIP_TYPE_QUEST) $("#toolTipQuest").hide();
    if (toolTipType != TOOLTIP_TYPE_ACTION) $("#toolTipAction").hide();
    if (toolTipType != TOOLTIP_TYPE_BUILDING) $("#toolTipBuilding").hide();
    if (toolTipType != TOOLTIP_TYPE_MESSAGE) $("#toolTipMessage").hide();
    if (toolTipType != TOOLTIP_TYPE_RESOURCE) $("#toolTipResource").hide();

    if (toolTipType == TOOLTIP_TYPE_CELL) $("#toolTipCell").show();
    if (toolTipType == TOOLTIP_TYPE_QUEST) $("#toolTipQuest").show();
    if (toolTipType == TOOLTIP_TYPE_ACTION) $("#toolTipAction").show();
    if (toolTipType == TOOLTIP_TYPE_BUILDING) $("#toolTipBuilding").show();
    if (toolTipType == TOOLTIP_TYPE_MESSAGE) $("#toolTipMessage").show();
    if (toolTipType == TOOLTIP_TYPE_RESOURCE) $("#toolTipResource").show();
}

function uiSetActionTooltip(actionId, isHard) {
    //uiClearSoftTooltip();

    if (isHard) {
        currentHardToolTipType = TOOLTIP_TYPE_ACTION;
        currentHardToolTipInfo = actionId;

        currentSoftToolTipType = TOOLTIP_TYPE_NONE;
        currentSoftToolTipInfo = 0;
    }
    else {
        currentSoftToolTipType = TOOLTIP_TYPE_ACTION;
        currentSoftToolTipInfo = actionId;
    }

    uiClearTooltip();

    if (actionId == ACTION_CLICK) {
        $("#toolTipAction_name").text("Click");
        $("#toolTipAction_description").text("Click on a cell to select. View properties, quests and execute actions.");
    }
    else if (actionId == ACTION_UPGRADE) {
        $("#toolTipAction_name").text("Upgrade");
        $("#toolTipAction_description").text("Click on a cell to upgrade the building.");
    }
    else if (actionId == ACTION_DOWNGRADE) {
        $("#toolTipAction_name").text("Downgrade");
        $("#toolTipAction_description").text("Click on a cell to downgrade the building. All resources will be given back.");
    }
    else if (actionId == ACTION_DESTROY) {
        $("#toolTipAction_name").text("Destroy");
        $("#toolTipAction_description").text("Click on a cell to destroy the building. All resources will be given back.");
    }

    $("#toolTipAction").show();
}

function uiUpdateActionTooltip(actionId) {
}

function uiSetBuildingTooltip(buildingId, isHard) {
    //uiClearSoftTooltip();

    if (isHard) {
        currentHardToolTipType = TOOLTIP_TYPE_BUILDING;
        currentHardToolTipInfo = buildingId;

        currentSoftToolTipType = TOOLTIP_TYPE_NONE;
        currentSoftToolTipInfo = 0;
    }
    else {
        currentSoftToolTipType = TOOLTIP_TYPE_BUILDING;
        currentSoftToolTipInfo = buildingId;
    }

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
    currentHardToolTipType = TOOLTIP_TYPE_CELL;
    currentHardToolTipInfo = { x: x, y: y };

    uiClearTooltip();

    var curMap = selectedMapRef; //getMapFromId(selectedMapId);
    var curCell = curMap.cells[x + (y * MAP_WIDTH)];
    var curState = curCell.getStateRef(); //getCellStateFromId(curCell.getStateId());

    if (curState.questId >= 0) {
        uiSetQuestTooltip(curState.questId);
    }
    else {
        $("#toolTipCell_name").text(curState.name);
        $("#toolTipCell_type").text(getCellStateTypeName(curState.typeId));
        
        if (curCell.buildingInstance != null) {
            $("#toolTipCell_buildingInfo").show();

            curBuilding = curCell.buildingInstance.buildingRef; //getBuildingFromId(curCell.buildingInstance.buildingId);

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
    var curMap = selectedMapRef; //getMapFromId(selectedMapId);
    var curCell = curMap.cells[x + (y * MAP_WIDTH)];
    var curState = curCell.getStateRef(); //getCellStateFromId(curCell.getStateId());

    if (curState.questId >= 0) {
        uiUpdateQuestTooltip(curState.questId);
    }
    else {
        $("#toolTipCell_name").text(curState.name);
        $("#toolTipCell_type").text(getCellStateTypeName(curState.typeId));

        if (curCell.buildingInstance != null) {
            $("#toolTipCell_buildingInfo").show();

            curBuilding = curCell.buildingInstance.buildingRef; //getBuildingFromId(curCell.buildingInstance.buildingId);

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
    currentHardToolTipType = TOOLTIP_TYPE_QUEST;
    currentHardToolTipInfo = questId;

    uiClearTooltip();

    var curQuest = getQuestFromId(questId);

    $("#toolTipQuest_name").text(curQuest.title);

    if (curQuest.completed) {
        $("#toolTipQuest_description").text(curQuest.completeDescriptionSummary);
        $("#completeQuest").hide();
        $("#toolTipQuest_requirementRow").hide();
        $("#toolTipQuest_completed").show();
    }
    else {
        $("#toolTipQuest_description").text(curQuest.descriptionSummary);
        $("#completeQuest").show
        $("#toolTipQuest_requirementRow").show();
        $("#toolTipQuest_completed").hide();

        if (hasDataLinks(curQuest.requirements))
            $("#completeQuest").prop('disabled', false);
        else
            $("#completeQuest").prop('disabled', true);
    } 

    $("#toolTipQuest_requirement").html(dataLinksToStringOneLine(curQuest.requirements));

    $("#toolTipQuest").show();
}

function uiUpdateQuestTooltip(questId) {
    var curQuest = getQuestFromId(questId);

    $("#toolTipQuest_name").text(curQuest.title);

    if (curQuest.completed) {
        $("#toolTipQuest_description").text(curQuest.completeDescriptionSummary);
        $("#completeQuest").hide();
        $("#toolTipQuest_requirementRow").hide();
        $("#toolTipQuest_completed").show();
    }
    else {
        $("#toolTipQuest_description").text(curQuest.descriptionSummary);
        $("#completeQuest").show();
        $("#toolTipQuest_requirementRow").show();
        $("#toolTipQuest_completed").hide();

        if (hasDataLinks(curQuest.requirements))
            $("#completeQuest").prop('disabled', false);
        else
            $("#completeQuest").prop('disabled', true);
    }

    $("#toolTipQuest_requirement").html(dataLinksToStringOneLine(curQuest.requirements));
}

function uiSetResourceTooltip(resourceId, isHard) {
    //uiClearSoftTooltip();

    if (isHard) {
        currentHardToolTipType = TOOLTIP_TYPE_RESOURCE;
        currentHardToolTipInfo = resourceId;

        currentSoftToolTipType = TOOLTIP_TYPE_NONE;
        currentSoftToolTipInfo = 0;
    }
    else {
        currentSoftToolTipType = TOOLTIP_TYPE_RESOURCE;
        currentSoftToolTipInfo = resourceId;
    }

    uiClearTooltip();

    var curResource = getResourceFromId(resourceId);

    $("#toolTipResource_name").text(curResource.name);
    $("#toolTipResource_description").text(curResource.description);
    $("#toolTipResource_amount").text(nComaFormatter(curResource.amount));
    
    $("#toolTipResource").show();
}

function uiUpdateResourceTooltip(resourceId) {
    var curResource = getResourceFromId(resourceId);

    $("#toolTipResource_amount").text(nComaFormatter(curResource.amount));
}

function uiSetMessageTooltip(message, isHard) {
    //uiClearSoftTooltip();

    if (isHard) {
        currentHardToolTipType = TOOLTIP_TYPE_MESSAGE;
        currentHardToolTipInfo = message;

        currentSoftToolTipType = TOOLTIP_TYPE_NONE;
        currentSoftToolTipInfo = 0;
    }
    else {
        currentSoftToolTipType = TOOLTIP_TYPE_MESSAGE;
        currentSoftToolTipInfo = message;
    }

    uiClearTooltip();

    $("#messageInnerText").html(message);

    $("#toolTipMessage").show();
}

function uiUpdateTooltip(message) {
}