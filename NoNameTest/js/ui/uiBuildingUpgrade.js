function uiDrawBuildingUpgrade() {
    $("#availableShards").text(getResourceFromId(RESOURCE_SHARD).amount);

    for (var t = 0; t < buildings.length; t++) {
        var curBuilding = buildings[t];

        if (!curBuilding.isVisible() && $("#buildingUpgradeInfo" + curBuilding.id).length > 0) {
            $("#buildingUpgradeInfo" + curBuilding.id).remove();
        }

        if (curBuilding.isVisible() && curBuilding.upgrades.length > 0) {
            if ($("#buildingUpgradeInfo" + curBuilding.id).length == 0) {
                var newElement = $("#buildingUpgradeInfo").clone();

                $(newElement).show();

                $(newElement).attr("id", "buildingUpgradeInfo" + curBuilding.id);
                $(newElement).find("#buildingUpgradeInfoIcon").attr("id", "buildingUpgradeInfoIcon" + curBuilding.id);
                $(newElement).find("#buildingUpgradeInfoName").attr("id", "buildingUpgradeInfoName" + curBuilding.id);
                $(newElement).find("#buildingUpgradeInnerContainer").attr("id", "buildingUpgradeInnerContainer" + curBuilding.id);

                $("#buildingUpgradeContainer").append(newElement);

                for (var tt = 0; tt < curBuilding.upgrades.length; tt++) {
                    var curUpgrade = curBuilding.upgrades[tt];

                    var newUpgradeElement = $("#buildingUpgradeInnerInfo").clone();

                    $(newUpgradeElement).attr("id", "buildingUpgradeInnerInfo" + curUpgrade.id);
                    $(newUpgradeElement).find("#buildingUpgradeInnerInfoName").attr("id", "buildingUpgradeInnerInfoName" + curUpgrade.id);
                    $(newUpgradeElement).find("#buildingUpgradeInnerInfoButton").attr("id", "buildingUpgradeInnerInfoButton" + curUpgrade.id);

                    $(newUpgradeElement).show();

                    $("#buildingUpgradeInnerContainer" + curBuilding.id).append(newUpgradeElement);

                    $("#buildingUpgradeInnerInfoName" + curUpgrade.id).text(curUpgrade.getFullName());

                    $(newUpgradeElement).click({ id: curUpgrade.id }, uiShowBuildingUpgradeTooltip);
                    $(newUpgradeElement).mouseover({ id: curUpgrade.id }, uiShowBuildingUpgradeTooltip);
                    $(newUpgradeElement).mouseout(uiClearTooltip);

                    $("#buildingUpgradeInnerInfoButton" + curUpgrade.id).click({ id: curUpgrade.id }, uiBuyBuildingUpgrade);
                }

                var imgX = getImagePositionX("building", curBuilding.imageName[0]);
                var imgY = getImagePositionY("building", curBuilding.imageName[0]);

                $("#buildingUpgradeInfoName" + curBuilding.id).text(curBuilding.name);

                $("#buildingUpgradeInfoIcon" + curBuilding.id).css('background-position-x', -imgX + 'px');
                $("#buildingUpgradeInfoIcon" + curBuilding.id).css('background-position-y', -imgY + 'px');
            }

            for (var tt = 0; tt < curBuilding.upgrades.length; tt++) {
                var curUpgrade = curBuilding.upgrades[tt];

                uiDrawBuildingUpgradeItem(curUpgrade);
            }
        }
    }
}

function uiDrawBuildingUpgradeItem(curUpgrade) {
    if (curUpgrade.isMaxLevel())
        $("#buildingUpgradeInnerInfoButton" + curUpgrade.id).text("Max");
    else
        $("#buildingUpgradeInnerInfoButton" + curUpgrade.id).text(curUpgrade.getUpgradeShardAmount() + " shards");

    if (curUpgrade.canUpgrade()) {
        $("#buildingUpgradeInnerInfoButton" + curUpgrade.id).prop('disabled', false);
    }
    else {
        $("#buildingUpgradeInnerInfoButton" + curUpgrade.id).prop('disabled', true);
    }
}

function uiShowBuildingUpgradeTooltip(event) {
    var curUpgrade = getBuildingUpgradeFromId(event.data.id);

    if (curUpgrade != null) {
        var left = "<b>" + curUpgrade.name + "</b><br />" + curUpgrade.description;

        uiSetTooltip(left, "");
    }
    else {
        uiSetTooltip("", "");
    }
}

function uiBuyBuildingUpgrade(event) {
    var curUpgrade = getBuildingUpgradeFromId(event.data.id);

    if (curUpgrade != null) {
        if (curUpgrade.upgrade()) {

            $("#buildingUpgradeInnerInfoName" + curUpgrade.id).text(curUpgrade.getFullName());
            uiDrawBuildingUpgradeItem(curUpgrade);
        }
    }
}