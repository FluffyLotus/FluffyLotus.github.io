var currentUISelectedQuestId = -1;
var currentUISelectedQuestRef = null;

function uiDrawQuest() {
    var showCompletedQuest = $("#showCompletedQuest").is(":checked");

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

            if (curQuest.id == currentUISelectedQuestId) {
                var allRequirements = curQuest.getAllRequirements();

                // This is being executed every tick and re-executed in uiQuestDrawCurrentQuest
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

                if (currentUISelectedQuestId >= 0) {
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

    uiQuestDrawCurrentQuest();
}

function uiShowQuestInformation(event) {
    var curQuest = getQuestFromId(event.data.id);

    if (currentUISelectedQuestId != -1) {
        $("#questInfoRow" + currentUISelectedQuestId).removeClass("active");
    }

    currentUISelectedQuestId = curQuest.id;
    currentUISelectedQuestRef = getQuestFromId(curQuest.id);

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
    if (currentUISelectedQuestId == -1)
        return;

    var curQuest = currentUISelectedQuestRef;
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
            var ma = getMapAdventureFromId(curQuest.foundMapId);

            if (ma != null) // Was a bug in the save state, should not be needed in the futur
                $("#singleQuestInfoFoundArea").text(ma.name);
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
    //var curQuest = getQuestFromId(currentUISelectedQuestId);
    var curQuest = currentUISelectedQuestRef;

    if (curQuest != null) {
        curQuest.reserveResource();
    }
}

function uiQuestTeleportToCheckpoint() {
    var canTeleport = true;
    //var curQuest = getQuestFromId(currentUISelectedQuestId);
    var curQuest = currentUISelectedQuestRef;

    if (curQuest != null) {
        if (currentMapAdventure.currentMapAdventureId == curQuest.foundMapId) {
            var map = getMapAdventureFromId(currentMapAdventure.currentMapAdventureId);

            if (map.currentDistance >= Math.floor(curQuest.foundDistance / 1000) * 1000 && map.currentDistance <= curQuest.foundDistance)
                canTeleport = false;
        }

        if (canTeleport)
            currentMapAdventure.changeMap(curQuest.foundMapId, Math.floor(curQuest.foundDistance / 1000) * 1000);
    }
}

function uiFillQuestStory() {
    //var curQuest = getQuestFromId(currentUISelectedQuestId);
    var curQuest = currentUISelectedQuestRef;
    var s1, s2;

    s1 = curQuest.activatedStory.replace("\n", "<br />");
    s2 = curQuest.compleStory.replace("\n", "<br />");

    if (s1 == "")
        s1 = curQuest.activatedDescription;
    if (s2 == "")
        s2 = curQuest.compleDescription;

    $("#questStoryModalTitle").text(curQuest.name);
    $("#questStoryModalActivated").html(s1);
    $("#questStoryModalComplete").html(s2);
}