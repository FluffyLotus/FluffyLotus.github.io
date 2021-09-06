function loadBuildingList() {
	uiPopulateList('building', buildingData);
}

function getBuildingFromId(id) {
	for (var t = 0; t < buildingData.length; t++) {
		if (buildingData[t].id == id)
			return buildingData[t];
	}

	return null;
}

function getBuildingMaxId() {
	var id = -1;

	for (var t = 0; t < buildingData.length; t++) {
		if (id < buildingData[t].id)
			id = buildingData[t].id;
	}

	return id;
}

function loadSelectedBuilding() {
	var item = getBuildingFromId(selectedId);

	if (item == null)
		return;

	$("#building_name").val(item.n);
	$("#building_editorName").val(item.en);
	$("#building_description").val(item.d);
	$("#building_timerType").val(item.tt);
	$("#building_actionTime").val(item.at);
	$("#building_processOnCell").val(item.pc);
	$("#building_image").val(item.im);
	$('#building_isUserOwned').prop('checked', item.uo);
	$('#building_canUpgrade').prop('checked', item.cu);
	$('#building_needConnection').prop('checked', item.nc);
	$('#building_isStorage').prop('checked', item.is);
	$('#building_isConnection').prop('checked', item.ic);
	$('#building_canSpawn').prop('checked', item.cs);
	$('#building_keepActionReady').prop('checked', item.ka);

	loadDataLinkTable("building_cost", item.co);
	loadDataLinkTable("building_requirement", item.rq);
	loadDataLinkTable("building_reward", item.rw);

	$("#building_image_graph").html(getImageDivFromName(item.im));
	
	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedBuilding() {
	var item = getBuildingFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#building_name").val();
	item.en = $("#building_editorName").val();
	item.d = $("#building_description").val();
	item.tt = parseInt($("#building_timerType").val());
	item.at = parseInt($("#building_actionTime").val());
	item.pc = parseInt($("#building_processOnCell").val());
	item.im = $("#building_image").val();
	item.uo = $("#building_isUserOwned").prop('checked');
	item.cu = $("#building_canUpgrade").prop('checked');
	item.nc = $("#building_needConnection").prop('checked');
	item.is = $("#building_isStorage").prop('checked');
	item.ic = $("#building_isConnection").prop('checked');
	item.cs = $("#building_canSpawn").prop('checked');
	item.ka = $("#building_keepActionReady").prop('checked');

	item.co = saveDataLinkTable("building_cost");
	item.rq = saveDataLinkTable("building_requirement");
	item.rw = saveDataLinkTable("building_reward");
}

function createNewBuilding() {
	var item = new Object();

	item.id = getBuildingMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.tt = 0;
	item.at = 1000;
	item.pc = 0;
	item.im = "";
	item.uo = false;
	item.cu = false;
	item.nc = false;
	item.is = false;
	item.ic = false;
	item.cs = false;
	item.ka = false;
	item.co = [];
	item.rq = [];
	item.rw = [];

	buildingData.push(item);

	return item;
}

function deleteSelectedBuilding() {
	for (var t = 0; t < buildingData.length; t++) {
		if (buildingData[t].id == selectedId) {
			buildingData.splice(t, 1);
			return;
		}
	}
}

function loadBuildingDropDown(elementId) {
	uiLoadDropDown(elementId, buildingData);
}