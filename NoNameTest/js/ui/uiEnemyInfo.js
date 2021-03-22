function uiDrawEnemyInfo() {
    for (var t = 0; t < enemies.length; t++) {
        var curEnemy = enemies[t];

        if (curEnemy.totalDeath == 0 && $("#enemyInfoRow" + curEnemy.id).length > 0) {
            $("#enemyInfoRow" + curEnemy.id).remove();
        }

        if (curEnemy.totalDeath > 0) {
            if ($("#enemyInfoRow" + curEnemy.id).length == 0) {
                var newElement = $("#enemyInfoRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "enemyInfoRow" + curEnemy.id);
                $(newElement).find("#enemyInfoName").attr("id", "enemyInfoName" + curEnemy.id);
                $(newElement).find("#enemyInfoSouldShard").attr("id", "enemyInfoSouldShard" + curEnemy.id);
                $(newElement).find("#enemyInfoNextShard").attr("id", "enemyInfoNextShard" + curEnemy.id);

                $("#enemyInfoContainer").append(newElement);

                $("#enemyInfoName" + curEnemy.id).text(curEnemy.name);

                $(newElement).click({ id: curEnemy.id }, uiShowEnemyInfoTooltip);
                $(newElement).mouseover({ id: curEnemy.id }, uiShowEnemyInfoTooltip);
                $(newElement).mouseout(uiClearTooltip);
            }

            $("#enemyInfoSouldShard" + curEnemy.id).html(curEnemy.getShardCount());
            $("#enemyInfoNextShard" + curEnemy.id).html((100 - Math.round(curEnemy.getNextShard(), 2)) + " / " + 100);
        }
    }
}

function uiShowEnemyInfoTooltip(event) {
    var curEnemy = getEnemyFromId(event.data.id);

    var left = "<b>" + curEnemy.name + "</b><br />";

    if (curEnemy.skills.length > 0) {
        left += "Skills: ";

        for (var t = 0; t < curEnemy.skills.length; t++) {
            if (t > 0)
                left += ", ";

            var skill = getSkillFromId(curEnemy.skills[t]);
            left += skill.name;
        }
    }

    var right = "<b>Total Kill: </b>" + curEnemy.totalDeath;

    uiSetTooltip(left, right);
}