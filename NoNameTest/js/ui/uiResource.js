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

                $(newElement).click({ id: curResource.id }, uiShowResourceTooltip);
                $(newElement).mouseover({ id: curResource.id }, uiShowResourceTooltip);
                $(newElement).mouseout(uiClearTooltip);
            }

            $("#resourceInfoAmount" + curResource.id).text(nFormatter(curResource.amount));

            if (curResource.tickDelta > 0) {
                $("#resourceInfoTickDelta" + curResource.id).text("+" + nFormatter(curResource.tickDelta));
                $("#resourceInfoTickDelta" + curResource.id).css("color", "green");
            }
            else if (curResource.tickDelta < 0) {
                $("#resourceInfoTickDelta" + curResource.id).text(nFormatter(curResource.tickDelta));
                $("#resourceInfoTickDelta" + curResource.id).css("color", "red");
            }
            else {
                //$("#resourceInfoTickDelta" + curResource.id).text(nFormatter(curResource.tickDelta));
                $("#resourceInfoTickDelta" + curResource.id).text("");
                $("#resourceInfoTickDelta" + curResource.id).css("color", "black");
            }
        }
    }
}

function uiShowResourceTooltip(event) {
    var curResource = resources[event.data.id];

    var left = "<b>" + curResource.name + "</b><br />Amount: " + nFormatter(curResource.amount);

    uiSetTooltip(left, "");
}