function uiDrawResources() {
    for (var t = 0; t < resources.length; t++) {
        var curResource = resources[t];

        if (!curResource.isVisible() && $("#resourceInfoRow" + curResource.id).length > 0) {
            $("#resourceInfoRow" + curResource.id).remove();
        }

        if (curResource.isVisible()) {
            if ($("#resourceInfoRow" + curResource.id).length == 0) {
                var newElement = $("#resourceInfoRow").clone();

                $(newElement).show();

                $(newElement).attr("id", "resourceInfoRow" + curResource.id);
                $(newElement).find("#resourceInfoName").attr("id", "resourceInfoName" + curResource.id);
                $(newElement).find("#resourceInfoAmount").attr("id", "resourceInfoAmount" + curResource.id);
                $(newElement).find("#resourceInfoTickDelta").attr("id", "resourceInfoTickDelta" + curResource.id);

                $("#resourceInfoContainer").append(newElement);

                $("#resourceInfoName" + curResource.id).text(curResource.name);

                $(newElement).click({ id: curResource.id }, uiShowResourceTooltipClick);
                $(newElement).mouseover({ id: curResource.id }, uiShowResourceTooltipHover);
                $(newElement).mouseout(uiClearSoftTooltip);
            }

            //if (curResource.getAmountLimit() > 0 && !curResource.isSpecial) {
            //    $("#resourceInfoAmount" + curResource.id).text(nFormatter(curResource.amount) + " / " + nFormatter(curResource.getAmountLimit()));
            //}
            //else {
                $("#resourceInfoAmount" + curResource.id).text(nFormatter(curResource.amount));
            //}

            if (curResource.deltaAmount > 0) {
                $("#resourceInfoTickDelta" + curResource.id).text("+" + nFormatter(curResource.deltaAmount));
                $("#resourceInfoTickDelta" + curResource.id).css("color", "green");
            }
            else if (curResource.tickDelta < 0) {
                $("#resourceInfoTickDelta" + curResource.id).text(nFormatter(curResource.deltaAmount));
                $("#resourceInfoTickDelta" + curResource.id).css("color", "red");
            }
            else {
                $("#resourceInfoTickDelta" + curResource.id).text("");
                $("#resourceInfoTickDelta" + curResource.id).css("color", "black");
            }
        }
    }
}

function uiShowResourceTooltipClick(event) {
    uiSetHardTooltip(TOOLTIP_TYPE_RESOURCE, event.data.id);
    
}

function uiShowResourceTooltipHover(event) {
    uiSetSoftTooltip(TOOLTIP_TYPE_RESOURCE, event.data.id);
}