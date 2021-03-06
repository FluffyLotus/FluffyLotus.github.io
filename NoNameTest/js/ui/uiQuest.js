var currentUISelectedQuest = -1;

function uiDrawQuest() {
    var showCompletedQuest = $("#showCompletedQuest").is(":checked");

    uiQuestDrawCurrentQuest()

    for (var t = 0; t < quests.length; t++) {
        var curQuest = quests[t];

        if ((!curQuest.isVisible() || (curQuest.isCompleted && !showCompletedQuest)) && $("#questInfoRow" + curQuest.id).length > 0) {
            $("#questInfoRow" + curQuest.id).remove();
        }

        if (curQuest.isVisible() && (showCompletedQuest || !curQuest.isCompleted)) {
            if ($("#questInfoRow" + curQuest.id).length == 0) {
                var newElement = $("#questInfoRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "questInfoRow" + curQuest.id);

                $("#questInfoContainer").append(newElement);

                $("#questInfoRow" + curQuest.id).text(curQuest.name);

                $(newElement).click({ id: curQuest.id }, uiShowQuestInformation);
            }

            if (curQuest.id == currentUISelectedQuest) {
                var allRequirements = curQuest.getAllRequirements();

                for (var i = 0; i < 4; i++) {
                    if (i < allRequirements.length) {
                        if (curQuest.isCompleted) {
                            $("#singleQuestInfoRowValue" + i).text(nFormatter(allRequirements[i].amount));
                        }
                        else {
                            $("#singleQuestInfoRowValue" + i).text(nFormatter(allRequirements[i].getCurrentValue()));
                        }
                    }
                }

                if (currentUISelectedQuest >= 0) {
                    if (curQuest.isCompleted) {
                        $("#singleQuestInfoCompleted").show();
                    }
                    else {
                        $("#singleQuestInfoCompleted").hide();
                    }
                }
            }
        }
    }
}

function uiShowQuestInformation(event) {
    var curQuest = getQuestFromId(event.data.id);

    if (currentUISelectedQuest != -1) {
        $("#questInfoRow" + currentUISelectedQuest).removeClass("active");
    }

    currentUISelectedQuest = curQuest.id;

    $("#questInfoRow" + curQuest.id).addClass("active");

    $("#singleQuestInfoContainer").show();
    $("#singleQuestInfoTitle").text(curQuest.name);
    $("#singleQuestInfoDescription").text(curQuest.activatedDescription);
    $("#singleQuestInfoCompletedDescription").text(curQuest.compleDescription);

    var allRequirements = curQuest.getAllRequirements();

    for (var i = 0; i < 4; i++) {
        if (i < allRequirements.length) {
            $("#singleQuestInfoRow" + i).show();

            $("#singleQuestInfoRowName" + i).text(allRequirements[i].getDataName());
            $("#singleQuestInfoRowTotal" + i).text(nFormatter(allRequirements[i].amount));
        }
        else {
            $("#singleQuestInfoRow" + i).hide();
        }
    }

    uiQuestDrawCurrentQuest();
}

function uiQuestDrawCurrentQuest() {
    if (currentUISelectedQuest == -1)
        return;

    var curQuest = getQuestFromId(currentUISelectedQuest);
    var allRequirements = curQuest.getAllRequirements();

    for (var i = 0; i < 4; i++) {
        if (i < allRequirements.length) {
            if (curQuest.isCompleted || curQuest.isResourceReserved) {
                $("#singleQuestInfoRowValue" + i).text(nFormatter(allRequirements[i].amount));
            }
            else {
                $("#singleQuestInfoRowValue" + i).text(nFormatter(allRequirements[i].getCurrentValue()));
            }
        }
    }

    if (curQuest.needToReserve()) {
        $("#singleQuestInfoStatus2").show();
    }
    else {
        $("#singleQuestInfoStatus2").hide();
    }

    if (curQuest.needToGoToLocation) {
        $("#singleQuestInfoStatus3").show();

        $("#singleQuestInfoFoundLocation").text(curQuest.foundDistance);

        if (curQuest.foundMapId != -1) {
            $("#singleQuestInfoFoundArea").text(getMapAdventureFromId(curQuest.foundMapId).name);
        }
    }
    else {
        $("#singleQuestInfoStatus3").hide();
    }

    if (!curQuest.needToReserve() && !curQuest.needToGoToLocation) {
        $("#singleQuestInfoStatus1").show();
    }
    else {
        $("#singleQuestInfoStatus1").hide();
    }

    if (curQuest.isCompleted) {
        $("#singleQuestInfoButtonNoResource").hide();
        $("#singleQuestInfoButtonReserveResource").hide();
        $("#singleQuestInfoButtonTeleport").hide();

        $("#singleQuestInfoCompleted").show();
        $("#singleQuestInfoStatus0").show();

        $("#singleQuestInfoStatus1").hide();
        $("#singleQuestInfoStatus2").hide();
        $("#singleQuestInfoStatus3").hide();
    }
    else {
        $("#singleQuestInfoCompleted").hide();
        $("#singleQuestInfoStatus0").hide();

        if (!curQuest.isResourceReserved) {
            if (curQuest.needToReserve()) {
                if (curQuest.canReserveResource()) {
                    $("#singleQuestInfoButtonReserveResource").show();
                    $("#singleQuestInfoButtonNoResource").hide();
                }
                else {
                    $("#singleQuestInfoButtonReserveResource").hide();
                    $("#singleQuestInfoButtonNoResource").show();
                }
            }
            else {
                $("#singleQuestInfoButtonReserveResource").hide();
                $("#singleQuestInfoButtonNoResource").hide();
            }
        }
        else {
            $("#singleQuestInfoButtonReserveResource").hide();
            $("#singleQuestInfoButtonNoResource").hide();
        }

        if (curQuest.isResourceReserved && !curQuest.wentToLocation) {
            $("#singleQuestInfoButtonTeleport").show();
        }
        else {
            $("#singleQuestInfoButtonTeleport").hide();
        }
    }
}

function uiQuestReserveResource() {
    var curQuest = getQuestFromId(currentUISelectedQuest);

    if (curQuest != null) {
        curQuest.reserveResource();
    }
}

function uiQuestTeleportToCheckpoint() {
    var curQuest = getQuestFromId(currentUISelectedQuest);

    if (curQuest != null) {
        currentMapAdventure.changeMap(curQuest.foundMapId, Math.floor(curQuest.foundDistance / 1000) * 1000);
    }
}