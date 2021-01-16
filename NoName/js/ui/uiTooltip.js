function uiSetTooltip(leftText, rightText) {
    $("#cellHover").html(leftText);
    $("#cellHoverUpgrade").html(rightText);
}

function uiClearTooltip() {
    uiSetTooltip("", "");
}
