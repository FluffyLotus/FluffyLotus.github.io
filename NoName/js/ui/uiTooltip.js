function uiSetTooltip(leftText, rightText) {
    $("#tooltipSectionLeft").html(leftText);
    $("#tooltipSectionRight").html(rightText);
}

function uiClearTooltip() {
    uiSetTooltip("", "");
}
