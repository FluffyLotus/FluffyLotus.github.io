var ACTION_CLICK = -1;
var ACTION_UPGRADE = -2;
var ACTION_DOWNGRADE = -3;
var ACTION_DESTROY = -4;

var selectedAction = ACTION_CLICK;

function uiDrawActions() {
    $("#actionList").append('<div id="action-1" onclick="uiSelectAction(' + ACTION_CLICK + ');" onmouseover="uiActionHover(' + ACTION_CLICK + ');" class="buildingSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block;"><img src="' + getImageFromId(IMAGE_CURSOR).img.src + '" width="32" height="32" /></div>');
    $("#actionList").append('<div id="action-2" onclick="uiSelectAction(' + ACTION_UPGRADE + ');" onmouseover="uiActionHover(' + ACTION_UPGRADE + ');" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block;"><img src="' + getImageFromId(IMAGE_UPGRADE).img.src + '" width = "32" height = "32" /></div>');
    $("#actionList").append('<div id="action-3" onclick="uiSelectAction(' + ACTION_DOWNGRADE + ');" onmouseover="uiActionHover(' + ACTION_DOWNGRADE + ');" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block;"><img src="' + getImageFromId(IMAGE_DOWNGRADE).img.src + '" width="32" height="32" /></div>');
    $("#actionList").append('<div id="action-4" onclick="uiSelectAction(' + ACTION_DESTROY + ');" onmouseover="uiActionHover(' + ACTION_DESTROY + ');" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block;"><img src="' + getImageFromId(IMAGE_TRASHCAN).img.src + '" width="32" height="32" /></div>');

    for (var t = 0; t < buildings.length; t++) {
        if (buildings[t].isVisible)
            $("#actionBuildingList").append('<div id="action' + buildings[t].id + '" onclick="uiSelectAction(' + buildings[t].id + ');" onmouseover="uiBuildingHover(' + buildings[t].id + ');" class="buildingNotSelected" style="margin: 2px; width: 34px; height: 34px; display: inline-block;"><img src="' + getImageFromId(buildings[t].imageId).img.src + '" width="32" height="32" /></div>');
    }
    
}

function uiSelectAction(actionId) {
    $("#action" + selectedAction).removeClass("buildingSelected");
    $("#action" + selectedAction).addClass("buildingNotSelected");

    selectedAction = actionId;

    $("#action" + selectedAction).removeClass("buildingNotSelected");
    $("#action" + selectedAction).addClass("buildingSelected");

    if (selectedAction < 0)
        uiActionHover(selectedAction);
    else
        uiBuildingHover(selectedAction);
}

function uiActionHover(actionId) {
    uiSetActionTooltip(actionId);
}

function uiBuildingHover(buildingId) {
    uiSetBuildingTooltip(buildingId);
}

function uiUpgradeBuilding() {
}

function uiCompleteQuest() {
    glCompleteSelectedCellQuest();
}