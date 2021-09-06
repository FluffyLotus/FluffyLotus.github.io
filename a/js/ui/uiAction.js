var ACTION_CLICK = -1;
var ACTION_UPGRADE = -2;
var ACTION_DOWNGRADE = -3;
var ACTION_DESTROY = -4;

var selectedAction = ACTION_CLICK;

function uiInitActions() {
    $("#actionList").append('<div id="action-1" onclick="uiSelectAction(' + ACTION_CLICK + ');" onmouseover="uiActionHover(' + ACTION_CLICK + ');" onmouseout="uiClearSoftTooltip();" class="buildingSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block; cursor: pointer;">' + getImageDiv(getImageFromName(IMAGE_CURSOR).info[0]) + '</div>');
    $("#actionList").append('<div id="action-2" onclick="uiSelectAction(' + ACTION_UPGRADE + ');" onmouseover="uiActionHover(' + ACTION_UPGRADE + ');" onmouseout="uiClearSoftTooltip();" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block; cursor: pointer;">' + getImageDiv(getImageFromName(IMAGE_UPGRADE).info[0]) + '</div>');
    $("#actionList").append('<div id="action-3" onclick="uiSelectAction(' + ACTION_DOWNGRADE + ');" onmouseover="uiActionHover(' + ACTION_DOWNGRADE + ');" onmouseout="uiClearSoftTooltip();" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block; cursor: pointer;">' + getImageDiv(getImageFromName(IMAGE_DOWNGRADE).info[0]) + '</div>');
    $("#actionList").append('<div id="action-4" onclick="uiSelectAction(' + ACTION_DESTROY + ');" onmouseover="uiActionHover(' + ACTION_DESTROY + ');" onmouseout="uiClearSoftTooltip();" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block; cursor: pointer;">' + getImageDiv(getImageFromName(IMAGE_TRASHCAN).info[0]) + '</div>');
}

function uiDrawActions() {
    for (var t = 0; t < buildings.length; t++) {
        if (buildings[t].isVisible) {
            if ($("#action" + buildings[t].id).length == 0)
                $("#actionBuildingList").append('<div id="action' + buildings[t].id + '" onclick="uiSelectAction(' + buildings[t].id + ');" onmouseover="uiBuildingHover(' + buildings[t].id + ');" onmouseout="uiClearSoftTooltip();" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block; cursor: pointer;">' + getImageDiv(buildings[t].imageRef.info[0]) + '</div>');
        }
    }
    
}

function uiSelectAction(actionId) {
    $("#action" + selectedAction).removeClass("buildingSelected");
    $("#action" + selectedAction).addClass("buildingNotSelected");

    selectedAction = actionId;

    $("#action" + selectedAction).removeClass("buildingNotSelected");
    $("#action" + selectedAction).addClass("buildingSelected");

    if (selectedAction < 0) {
        //uiActionHover(selectedAction);
        uiSetHardTooltip(TOOLTIP_TYPE_ACTION, selectedAction);
    }
    else {
        //uiBuildingHover(selectedAction);
        uiSetHardTooltip(TOOLTIP_TYPE_BUILDING, { buildingId: selectedAction, level: 0 });
    }
}

function uiActionHover(actionId) {
    //uiSetActionTooltip(actionId);
    uiSetSoftTooltip(TOOLTIP_TYPE_ACTION, actionId);
}

function uiBuildingHover(buildingId) {
    //uiSetBuildingTooltip(buildingId);
    uiSetSoftTooltip(TOOLTIP_TYPE_BUILDING, { buildingId: buildingId, level: 0 });
}

function uiUpgradeBuilding() {
}

function uiCompleteQuest() {
    glCompleteSelectedCellQuest();
}