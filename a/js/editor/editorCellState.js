function loadCellStateList() {
	uiPopulateList('cellState', cellStateData);
}

function getCellStateFromId(id) {
	for (var t = 0; t < cellStateData.length; t++) {
		if (cellStateData[t].id == id)
			return cellStateData[t];
	}

	return null;
}

function getCellStateMaxId() {
	var id = -1;

	for (var t = 0; t < cellStateData.length; t++) {
		if (id < cellStateData[t].id)
			id = cellStateData[t].id;
	}

	return id;
}

function loadSelectedCellState() {
	var item = getCellStateFromId(selectedId);

	if (item == null)
		return;

	loadCellStateDropDown("cellState_clickStateChange");
	loadCellStateDropDown("cellState_timerStateChange");
	loadCellStateDropDown("cellState_questStateChange");
	loadActionDropDown("cellState_clickAction");
	loadQuestDropDown("cellState_quest");
	loadBuildingDropDown("cellState_initialBuilding");

	$("#cellState_name").val(item.n);
	$("#cellState_editorName").val(item.en);
	$("#cellState_description").val(item.d);
	$("#cellState_type").val(item.ty);
	$("#cellState_floorImage").val(item.fi);
	$("#cellState_objectImage").val(item.oi);
	$("#cellState_editorImage").val(item.ei);
	$('#cellState_isEnemyPath').prop('checked', item.ep);
	$('#cellState_isEnemyPathEnd').prop('checked', item.epe);
	$("#cellState_clickAction").val(item.ca);
	$("#cellState_quest").val(item.qu);
	$("#cellState_initialBuilding").val(item.ib);
	$("#cellState_actionTimerFrom").val(item.atf);
	$("#cellState_actionTimerTo").val(item.att);
	$("#cellState_clickStateChange").val(item.csc);
	$("#cellState_timerStateChange").val(item.tsc);
	$("#cellState_questStateChange").val(item.qsc);
	$('#cellState_effectCloud').prop('checked', item.ec);

	$("#cellState_floorImage_graph").html(getImageDivFromName(item.fi));
	$("#cellState_objectImage_graph").html(getImageDivFromName(item.oi));
	$("#cellState_editorImage_graph").html(getImageDivFromName(item.ei));

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedCellState() {
	var item = getCellStateFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#cellState_name").val();
	item.en = $("#cellState_editorName").val();
	item.d = $("#cellState_description").val();
	item.ty = parseInt($("#cellState_type").val());
	item.fi = $("#cellState_floorImage").val();
	item.oi = $("#cellState_objectImage").val();
	item.ei = $("#cellState_editorImage").val();
	item.ep = $('#cellState_isEnemyPath').prop('checked');
	item.epe = $('#cellState_isEnemyPathEnd').prop('checked');
	item.ca = parseInt($("#cellState_clickAction").val());
	item.qu = parseInt($("#cellState_quest").val());
	item.ib = parseInt($("#cellState_initialBuilding").val());
	item.atf = parseInt($("#cellState_actionTimerFrom").val());
	item.att = parseInt($("#cellState_actionTimerTo").val());
	item.csc = parseInt($("#cellState_clickStateChange").val());
	item.tsc = parseInt($("#cellState_timerStateChange").val());
	item.qsc = parseInt($("#cellState_questStateChange").val());
	item.ec = $('#cellState_effectCloud').prop('checked');
}

function createNewCellState() {
	var item = new Object();

	item.id = getCellStateMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.ty = 0;
	item.fi = "";
	item.oi = "";
	item.ei = "";
	item.ep = false;
	item.epe = false;
	item.ca = -1;
	item.qu = -1;
	item.ib = -1;
	item.atf = 0;
	item.att = 0;
	item.csc = -1;
	item.tsc = -1;
	item.qsc = -1;
	item.ec = false;

	cellStateData.push(item);

	return item;
}

function deleteSelectedCellState() {
	for (var t = 0; t < cellStateData.length; t++) {
		if (cellStateData[t].id == selectedId) {
			cellStateData.splice(t, 1);
			return;
		}
	}
}

function loadCellStateDropDown(elementId) {
	uiLoadDropDown(elementId, cellStateData);
}