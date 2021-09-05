function uiShowTooltipQuestInformation() {
    var questId = currentHardToolTipInfo;

    var curQuest = getQuestFromId(questId);

    $("#questInfoModal-title").html(curQuest.title);
    $("#questInfoModal-desc").html(curQuest.description.replaceAll("\n", "<br />"));

    if (curQuest.completed)
        $("#questInfoModal-completeDesc").html(curQuest.completeDescription.replaceAll("\n", "<br />"));
    else
        $("#questInfoModal-completeDesc").html("");

    $("#questInfoModal-req").html(dataLinksToStringRequirementVertical(curQuest.requirements));

    $('#questInfoModal').modal('show');
}