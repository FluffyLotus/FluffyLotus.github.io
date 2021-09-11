function uiShowModalQuestInformation() {
    var questId = currentHardToolTipInfo;

    var curQuest = getQuestFromId(questId);

    $("#questInfoModal-title").html(curQuest.title);
    $("#questInfoModal-desc").html(curQuest.startStory.replaceAll("\n", "<br />"));

    if (curQuest.completed)
        $("#questInfoModal-completeDesc").html(curQuest.endStory.replaceAll("\n", "<br />"));
    else
        $("#questInfoModal-completeDesc").html("");

    $("#questInfoModal-req").html(dataLinksToStringRequirementVertical(curQuest.requirements));

    $('#questInfoModal').modal('show');
}