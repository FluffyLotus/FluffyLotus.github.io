var currentUISelectedQuest = -1;

function uiDrawQuest() {
    for (var t = 0; t < quests.length; t++) {
        var curQuest = quests[t];

        if (!curQuest.isVisible() && $("#questInfoRow" + curQuest.id).length > 0) {
            $("#questInfoRow" + curQuest.id).remove();
        }

        if (curQuest.isVisible()) {
            if ($("#questInfoRow" + curQuest.id).length == 0) {
                var newElement = $("#questInfoRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "questInfoRow" + curQuest.id);

                $("#questInfoContainer").append(newElement);

                $("#questInfoRow" + curQuest.id).text(curQuest.name);

                $(newElement).click({ id: curQuest.id }, uiShowQuestInformation);
            }

            if (curQuest.id == currentUISelectedQuest) {
                for (var i = 0; i < 4; i++) {
                    if (i < curQuest.passiveRequirements.length) {
                        if (curQuest.isCompleted) {
                            $("#singleQuestInfoRowValue" + i).text(curQuest.passiveRequirements[i].amount);
                        }
                        else {
                            $("#singleQuestInfoRowValue" + i).text(curQuest.passiveRequirements[i].getCurrentValue());
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

    /*
    if (quests[0].isCompleted) {
        document.getElementById("quest0Test").innerText = "600";
        document.getElementById("quest0Test2").style.display = "block";
    }
    else {
        document.getElementById("quest0Test").innerText = mapAdventures[currentMapAdventure.currentMapAdventureId].maxDistance;
    }
    */
}

function uiShowQuestInformation(event) {
    var curQuest = quests[event.data.id];

    if (currentUISelectedQuest != -1) {
        $("#questInfoRow" + currentUISelectedQuest).removeClass("active");
    }

    currentUISelectedQuest = curQuest.id;

    $("#questInfoRow" + curQuest.id).addClass("active");

    $("#singleQuestInfoContainer").show();
    $("#singleQuestInfoTitle").text(curQuest.name);
    $("#singleQuestInfoDescription").text(curQuest.smallDescription);
    $("#singleQuestInfoCompletedDescription").text(curQuest.compleDescription);

    for (var i = 0; i < 4; i++) {
        if (i < curQuest.passiveRequirements.length) {
            $("#singleQuestInfoRow" + i).show();

            $("#singleQuestInfoRowName" + i).text(curQuest.passiveRequirements[i].getDataName());
            $("#singleQuestInfoRowTotal" + i).text(curQuest.passiveRequirements[i].amount);
        }
        else {
            $("#singleQuestInfoRow" + i).hide();
        }
    }

    ////

    for (var i = 0; i < 4; i++) {
        if (i < curQuest.passiveRequirements.length) {
            if (curQuest.isCompleted) {
                $("#singleQuestInfoRowValue" + i).text(curQuest.passiveRequirements[i].amount);
            }
            else {
                $("#singleQuestInfoRowValue" + i).text(curQuest.passiveRequirements[i].getCurrentValue());
            }
        }
    }

    if (curQuest.isCompleted) {
        $("#singleQuestInfoCompleted").show();
    }
    else {
        $("#singleQuestInfoCompleted").hide();
    }
}