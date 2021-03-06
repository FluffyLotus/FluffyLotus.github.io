var canViewskillsVar = false;

function canViewskills() {
    if (!canViewskillsVar) {
        for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
            if (currentMapAdventure.currentPlayer.skills[t].isActive) {
                canViewskillsVar = true;
                break;
            }
        }
    }

    return canViewskillsVar;
}

function uiDrawSkills() {
    if (canViewskills()) {
        $("#tabItemPlayer").show();
    }
    if (getResourceFromId(RESOURCE_SHARD).maxAmount > 0) {
        $("#tabItemBuilding").show();
    }

    $("#magicSpaceCount").text(getResourceFromId(RESOURCE_MAGICSPACE).amount);

    uiDrawPassiveSkills();
    uiDrawActiveSkills();
}

function uiDrawPassiveSkills() {
    for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
        var curSkill = currentMapAdventure.currentPlayer.skills[t];
        var skillInfo = getSkillFromId(curSkill.skillId);

        if (skillInfo.isPassive()) {
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

                    $("#passiveSkillContainer").append(newElement);

                    $("#passiveSkillName" + curSkill.skillId).text(skillInfo.name);

                    $(newElement).click({ id: curSkill.skillId }, uiShowSkillTooltip);
                    $(newElement).mouseover({ id: curSkill.skillId }, uiShowSkillTooltip);
                    $(newElement).mouseout(uiClearTooltip);

                    $("#passiveSkillTraining" + curSkill.skillId).change({ id: curSkill.skillId, elemName: "#passiveSkillTraining" + curSkill.skillId }, uiSetSkillTraining);
                }

                if (curSkill.trainingLevel < 10)
                    $("#passiveSkillLevel" + curSkill.skillId).text(curSkill.level + ".0" + curSkill.trainingLevel);
                else
                    $("#passiveSkillLevel" + curSkill.skillId).text(curSkill.level + "." + curSkill.trainingLevel);

                $("#passiveSkillProgress" + curSkill.skillId).width(curSkill.trainingLevel + "%");
            }
        }
    }
}

function uiDrawActiveSkills() {
    for (var t = 0; t < currentMapAdventure.currentPlayer.skills.length; t++) {
        var curSkill = currentMapAdventure.currentPlayer.skills[t];
        var skillInfo = getSkillFromId(curSkill.skillId);

        if (!skillInfo.isPassive()) {
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

                    $("#activeSkillContainer").append(newElement);

                    $("#activeSkillName" + curSkill.skillId).text(skillInfo.name);

                    $(newElement).click({ id: curSkill.skillId }, uiShowSkillTooltip);
                    $(newElement).mouseover({ id: curSkill.skillId }, uiShowSkillTooltip);
                    $(newElement).mouseout(uiClearTooltip);

                    $("#activeSkillEquip" + curSkill.skillId).change({ id: curSkill.skillId, elemName: "#activeSkillEquip" + curSkill.skillId }, uiSetSkillEquip);
                    $("#activeSkillTraining" + curSkill.skillId).change({ id: curSkill.skillId, elemName: "#activeSkillTraining" + curSkill.skillId }, uiSetSkillTraining);
                }

                if (curSkill.trainingLevel < 10)
                    $("#activeSkillLevel" + curSkill.skillId).text(curSkill.level + ".0" + curSkill.trainingLevel);
                else
                    $("#activeSkillLevel" + curSkill.skillId).text(curSkill.level + "." + curSkill.trainingLevel);

                $("#activeSkillProgress" + curSkill.skillId).width(curSkill.trainingLevel + "%");
            }
        }
    }
}

function uiShowSkillTooltip(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);
    var skillInfo = getSkillFromId(curSkill.skillId);

    var left = "";
    var right = "";

    left = "<b>" + skillInfo.name + "</b>, lvl " + curSkill.level + "<br />";

    if (skillInfo.useRequirements.length != 0) {
        left += "Use " + getResourceLinkString(skillInfo.useRequirements, curSkill.level) + ". ";
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
        left += "<br />Duration: " + skillInfo.duration + " tick, Cooldown: " + skillInfo.cooldown + " tick";
    }
    else {
        left += skillInfo.description.replace("{0}", curSkill.getAmount());
    }

    right = "Training Requirements<br />" + getResourceLinkString(skillInfo.trainingRequirements, curSkill.level);

    uiSetTooltip(left, right);
}

function uiSetSkillEquip(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);

    curSkill.isEquip = $(event.data.elemName).is(":checked");
}

function uiSetSkillTraining(event) {
    var curSkill = currentMapAdventure.currentPlayer.getSkillInstance(event.data.id);

    curSkill.isTraining = $(event.data.elemName).is(":checked");
}