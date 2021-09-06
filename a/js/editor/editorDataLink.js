var uniqueDataLinkId = 0;

function uiDataLinkRemove(btnElem) {
    $(btnElem).closest('tr').remove();
}

function uiDataLinkAdd(bodyElemId) {
    var curId = uniqueDataLinkId++;
    var newRow = $("#datalink_row").clone();

    newRow.attr("id", "datalink_row_" + curId);

    newRow.find("#datalink_type").change(function () {
        setDataLinkSubTypeDropDown(curId);
    });

    newRow.find("#datalink_type").attr("id", "datalink_type_" + curId);
    newRow.find("#datalink_subtype").attr("id", "datalink_subtype_" + curId);
    newRow.find("#datalink_object").attr("id", "datalink_object_" + curId);
    newRow.find("#datalink_amount").attr("id", "datalink_amount_" + curId);

    $("#" + bodyElemId).append(newRow);

    setDataLinkSubTypeDropDown(curId);

    return curId;
}

function setDataLinkSubTypeDropDown(id) {
    var list = null;
    var type = parseInt($("#datalink_type_" + id).val());

    if (type == 0) // RESOURCE
        list = resourceData;
    else if (type == 1) // MAP
        list = mapData;
    else if (type == 2) // BUILDING
        list = buildingData;
    else if (type == 3) // ENEMY
        list = enemyData;

    $("#datalink_object_" + id).empty();

    if (list != null) {
        for (var t = 0; t < list.length; t++) {
            var name = list[t].n;

            if (list[t].en != undefined && list[t].en != "")
                name += " (" + list[t].en + ")";

            $("#datalink_object_" + id).append('<option value="' + list[t].id + '">' + name + '</option>');
        }
    }
}

function loadDataLinkTable(bodyElemId, dataLinks) {
    $("#" + bodyElemId).empty();

    for (var t = 0; t < dataLinks.length; t++) {
        var dl = dataLinks[t];

        var rowId = uiDataLinkAdd(bodyElemId);

        $("#datalink_type_" + rowId).val(dl.t);
        $("#datalink_subtype_" + rowId).val(dl.st);
        $("#datalink_amount_" + rowId).val(dl.a);

        setDataLinkSubTypeDropDown(rowId);

        $("#datalink_object_" + rowId).val(dl.o);
    }
}

function saveDataLinkTable(bodyElemId) {
    var dataLinks = [];
    var trs;

    trs = $("#" + bodyElemId).find("tr");

    for (var t = 0; t < trs.length; t++) {
        var newItem = new Object();

        newItem.t = parseInt($(trs[t]).find("[name='datalink_type']").val());
        newItem.st = parseInt($(trs[t]).find("[name='datalink_subtype']").val());
        newItem.o = parseInt($(trs[t]).find("[name='datalink_object']").val());
        newItem.a = parseInt($(trs[t]).find("[name='datalink_amount']").val());

        dataLinks.push(newItem);
    }

    return dataLinks;
}

// datalink_row
// datalink_type
// datalink_subtype
// datalink_object
// datalink_amount