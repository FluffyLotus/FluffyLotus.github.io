function uiDrawEnemyInfo() {
    for (var t = 0; t < cards.length; t++) {
        var curCard = cards[t];

        if (!curCard.isVisible() && $("#enemyInfoRow" + curCard.id).length > 0) {
            $("#enemyInfoRow" + curCard.id).remove();
        }

        if (curCard.isVisible()) {
            if ($("#enemyInfoRow" + curCard.id).length == 0) {
                var newElement = $("#enemyInfoRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "enemyInfoRow" + curCard.id);
                $(newElement).find("#enemyInfoName").attr("id", "enemyInfoName" + curCard.id);
                $(newElement).find("#enemyInfoLevel").attr("id", "enemyInfoLevel" + curCard.id);
                $(newElement).find("#enemyInfoDescription").attr("id", "enemyInfoDescription" + curCard.id);
                $(newElement).find("#enemyInfoUpgradeButton").attr("id", "enemyInfoUpgradeButton" + curCard.id);

                $("#enemyInfoContainer").append(newElement);

                $("#enemyInfoName" + curCard.id).text(curCard.name);
                $("#enemyInfoDescription" + curCard.id).html(curCard.description);

                $(newElement).click({ id: curCard.id }, uiShowEnemyInfoTooltip);
                $(newElement).mouseover({ id: curCard.id }, uiShowEnemyInfoTooltip);
                $(newElement).mouseout(uiClearTooltip);

                $("#enemyInfoUpgradeButton" + curCard.id).click({ id: curCard.id }, uiUpgradeCard);
            }

            if (curCard.getCurrentLevelAmount() < 10)
                $("#enemyInfoLevel" + curCard.id).html(curCard.getCurrentLevel() + ".0" + curCard.getCurrentLevelAmount());
            else
                $("#enemyInfoLevel" + curCard.id).html(curCard.getCurrentLevel() + "." + curCard.getCurrentLevelAmount());

            if (curCard.canUpgrade())
                $("#enemyInfoUpgradeButton" + curCard.id).show();
            else
                $("#enemyInfoUpgradeButton" + curCard.id).hide();


        }
    }
}

function uiShowEnemyInfoTooltip(event) {
    var curCard = cards[event.data.id];

    var left = "<b>" + curCard.name + "</b><br />" + curCard.description;

    uiSetTooltip(left, "");
}

function uiUpgradeCard(event) {
    var c = cards[event.data.id];

    c.upgrade();
}