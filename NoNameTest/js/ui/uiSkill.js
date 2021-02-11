function uiDrawSkills() {
    if (canViewskills) {
        $("#tabItemPlayer").show();
    }

    uiDrawPassiveSkills();
    uiDrawActiveSkills();
}

function uiDrawPassiveSkills() {
    var passiveSkills = currentMapAdventure.currentPlayer.passiveSkills;

    for (var t = 0; t < passiveSkills.length; t++) {
        var curSkill = passiveSkills[t];
        var skillInfo = getSkillFromId(curSkill.skillId);

        if (!curSkill.isVisible() && $("#passiveSkillRow" + curSkill.skillId).length > 0) {
            $("#passiveSkillRow" + curSkill.skillId).remove();
        }

        if (curSkill.isVisible()) {
            if ($("#passiveSkillRow" + curSkill.skillId).length == 0) {
                var newElement = $("#passiveSkillRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "passiveSkillRow" + curSkill.skillId);
                $(newElement).find("#passiveSkillName").attr("id", "passiveSkillName" + curSkill.skillId);
                $(newElement).find("#passiveSkillLevel").attr("id", "passiveSkillLevel" + curSkill.skillId);
                $(newElement).find("#passiveSkillTraining").attr("id", "passiveSkillTraining" + curSkill.skillId);
                $(newElement).find("#passiveSkillProgress").attr("id", "passiveSkillProgress" + curSkill.skillId);
                $(newElement).find("#passiveSkillUpgradeButton").attr("id", "passiveSkillUpgradeButton" + curSkill.skillId);

                $("#passiveSkillContainer").append(newElement);

                $("#passiveSkillName" + curSkill.skillId).text(skillInfo.name);

                $(newElement).click({ id: curSkill.skillId }, uiShowSkillTooltip);
                $(newElement).mouseover({ id: curSkill.skillId }, uiShowSkillTooltip);
                $(newElement).mouseout(uiClearTooltip);

                $("#passiveSkillTraining" + curSkill.skillId).change({ id: curSkill.skillId }, uiSetSkillTraining);
                $("#passiveSkillUpgradeButton" + curSkill.skillId).click({ id: curSkill.skillId }, uiUpgradeSkill);
            }

            if (curSkill.trainingLevel < 10)
                $("#passiveSkillLevel" + curSkill.skillId).text(curSkill.level + ".0" + curSkill.trainingLevel);
            else
                $("#passiveSkillLevel" + curSkill.skillId).text(curSkill.level + "." + curSkill.trainingLevel);

            $("#passiveSkillProgress" + curSkill.skillId).width(curSkill.trainingLevel + "%");

            if (curSkill.canUpgrade())
                $("#passiveSkillUpgradeButton" + curSkill.skillId).show();
            else
                $("#passiveSkillUpgradeButton" + curSkill.skillId).hide();
        }
    }
}

function uiDrawActiveSkills() {
    var activeSkills = currentMapAdventure.currentPlayer.activeSkills;

    for (var t = 0; t < activeSkills.length; t++) {
        var curSkill = activeSkills[t];
        var skillInfo = getSkillFromId(curSkill.skillId);

        if (!curSkill.isVisible() && $("#activeSkillRow" + curSkill.skillId).length > 0) {
            $("#activeSkillRow" + curSkill.skillId).remove();
        }

        if (curSkill.isVisible()) {
            if ($("#activeSkillRow" + curSkill.skillId).length == 0) {
                var newElement = $("#activeSkillRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "activeSkillRow" + curSkill.skillId);
                $(newElement).find("#activeSkillEquip").attr("id", "activeSkillEquip" + curSkill.skillId);
                $(newElement).find("#activeSkillName").attr("id", "activeSkillName" + curSkill.skillId);
                $(newElement).find("#activeSkillLevel").attr("id", "activeSkillLevel" + curSkill.skillId);
                $(newElement).find("#activeSkillTraining").attr("id", "activeSkillTraining" + curSkill.skillId);
                $(newElement).find("#activeSkillProgress").attr("id", "activeSkillProgress" + curSkill.skillId);
                $(newElement).find("#activeSkillUpgradeButton").attr("id", "activeSkillUpgradeButton" + curSkill.skillId);

                $("#activeSkillContainer").append(newElement);

                $("#activeSkillName" + curSkill.skillId).text(skillInfo.name);

                $(newElement).click({ id: curSkill.skillId }, uiShowSkillTooltip);
                $(newElement).mouseover({ id: curSkill.skillId }, uiShowSkillTooltip);
                $(newElement).mouseout(uiClearTooltip);

                $("#activeSkillEquip" + curSkill.skillId).change({ id: curSkill.skillId }, uiSetSkillEquip);
                $("#activeSkillTraining" + curSkill.skillId).change({ id: curSkill.skillId }, uiSetSkillTraining);
                $("#activeSkillUpgradeButton" + curSkill.skillId).click({ id: curSkill.skillId }, uiUpgradeSkill);
            }

            if (curSkill.trainingLevel < 10)
                $("#activeSkillLevel" + curSkill.skillId).text(curSkill.level + ".0" + curSkill.trainingLevel);
            else
                $("#activeSkillLevel" + curSkill.skillId).text(curSkill.level + "." + curSkill.trainingLevel);

            $("#activeSkillProgress" + curSkill.skillId).width(curSkill.trainingLevel + "%");

            if (curSkill.canUpgrade())
                $("#activeSkillUpgradeButton" + curSkill.skillId).show();
            else
                $("#activeSkillUpgradeButton" + curSkill.skillId).hide();
        }
    }
}

function uiShowSkillTooltip(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);
    var skillInfo = getSkillFromId(curSkill.skillId);

    var left = "";
    var right = "";

    left = "<b>" + skillInfo.name + "</b>, lvl " + curSkill.level + "<br />";

    if (curSkill.skillId == SKILL_VITALITY) {
        left += "+" + curSkill.getAmount() + " life";
    }
    else if (curSkill.skillId == SKILL_STRENGTH) {
        left += "+" + curSkill.getAmount() + " regular damage";
    }
    else if (curSkill.skillId == SKILL_DEFENCE) {
        left += "+" + curSkill.getAmount() + " regular defence";
    }
    else if (curSkill.skillId == SKILL_HEAL) {
        left += "Use " + curSkill.getAmount() + " green mana to heal " + curSkill.getAmount() + " life<br />Cooldown: " + skillInfo.cooldown + " ticks";
    }
    else if (curSkill.skillId == SKILL_FIRE) {
        left += "Use " + curSkill.getAmount() + " red mana to hit " + curSkill.getAmount() + " fire damage<br />Cooldown: " + skillInfo.cooldown + " tick";
    }

    right = "Training Requirements<br />" + getResourceLinkString(skillInfo.trainingRequirements, curSkill.level);

    uiSetTooltip(left, right);
}

function uiUpgradeSkill(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);

    curSkill.upgrade();
}

function uiSetSkillEquip(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);

    curSkill.isEquip = $("#passiveSkillEquip" + curSkill.skillId).is(":checked");
}

function uiSetSkillTraining(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);

    curSkill.isTraining = $("#passiveSkillTraining" + curSkill.skillId).is(":checked");
}