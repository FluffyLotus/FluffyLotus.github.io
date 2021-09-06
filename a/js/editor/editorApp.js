var selectedSection = "";
var selectedId = null;

function loadApp() {
	uiSelectSection("enemy");
}

function uiSelectSection(section) {
	uiSaveSelectedItem();

	$("#menu_enemy").removeClass("active");
	$("#menu_resource").removeClass("active");
	$("#menu_cellState").removeClass("active");
	$("#menu_image").removeClass("active");
	$("#menu_map").removeClass("active");
	$("#menu_world").removeClass("active");
	$("#menu_action").removeClass("active");
	$("#menu_building").removeClass("active");
	$("#menu_quest").removeClass("active");

	$("#section_enemy").hide();
	$("#section_resource").hide();
	$("#section_cellState").hide();
	$("#section_image").hide();
	$("#section_map").hide();
	$("#section_world").hide();
	$("#section_action").hide();
	$("#section_building").hide();
	$("#section_quest").hide();

	if(section == "world")
		$("#itemListSection").hide();
	else
		$("#itemListSection").show();

	$("#menu_" + section).addClass("active");
	$("#section_" + section).show();

	if (selectedSection != section) {
		if (section == "world") {
			selectedId = 0;
			$("#itemDataSection").show();
		}
		else {
			selectedId = null;
			$("#itemDataSection").hide();
		}
	}

	selectedSection = section;

	uiRefreshItemList();
}

function uiRefreshItemList() {
	if (selectedSection == "enemy")
		loadEnemyList();
	else if (selectedSection == "resource")
		loadResourceList();
	else if (selectedSection == "cellState")
		loadCellStateList();
	else if (selectedSection == "image")
		loadImageList();
	else if (selectedSection == "map")
		loadMapList();
	else if (selectedSection == "world")
		loadWorldList();
	else if (selectedSection == "action")
		loadActionList();
	else if (selectedSection == "building")
		loadBuildingList();
	else if (selectedSection == "quest")
		loadQuestList();
}

function uiLoadItem(section, id) {
	uiSaveSelectedItem();

	$("#itemDataSection").show();
	
	if (section != selectedSection)
		uiSelectSection(section);
	else
		$("#item_" + selectedId).removeClass("active");

	selectedId = id;

	$("#item_" + selectedId).addClass("active");

	if (selectedSection == "enemy")
		loadSelectedEnemy();
	else if (selectedSection == "resource")
		loadSelectedResource();
	else if (selectedSection == "cellState")
		loadSelectedCellState();
	else if (selectedSection == "image")
		loadSelectedImage();
	else if (selectedSection == "map")
		loadSelectedMap();
	else if (selectedSection == "world")
		loadSelectedWorld();
	else if (selectedSection == "action")
		loadSelectedAction();
	else if (selectedSection == "building")
		loadSelectedBuilding();
	else if (selectedSection == "quest")
		loadSelectedQuest();
}

function uiCreateNewItem() {
	var newItem = null;

	if (selectedSection == "enemy")
		newItem = createNewEnemy();
	else if (selectedSection == "resource")
		newItem = createNewResource();
	else if (selectedSection == "cellState")
		newItem = createNewCellState();
	//else if (selectedSection == "image")
	//	createNewImage();
	else if (selectedSection == "map")
		newItem = createNewMap();
	//else if (selectedSection == "world")
	//	loadSelectedWorld();
	else if (selectedSection == "action")
		newItem = createNewAction();
	else if (selectedSection == "building")
		newItem = createNewBuilding();
	else if (selectedSection == "quest")
		newItem = createNewQuest();

	if (newItem != null) {
		uiRefreshItemList();
		uiLoadItem(selectedSection, newItem.id);
	}
}

function uiDeleteItem() {
	if (selectedSection == "image" || selectedSection == "world")
		return;

	if (selectedSection == "enemy")
		deleteSelectedEnemy();
	else if (selectedSection == "resource")
		deleteSelectedResource();
	else if (selectedSection == "cellState")
		deleteSelectedCellState();
	//else if (selectedSection == "image")
	//	deleteSelectedImage();
	else if (selectedSection == "map")
		deleteSelectedMap();
	//else if (selectedSection == "world")
	//	deleteSelectedWorld();
	else if (selectedSection == "action")
		deleteSelectedAction();
	else if (selectedSection == "building")
		deleteSelectedBuilding();
	else if (selectedSection == "quest")
		deleteSelectedQuest();

	selectedId = null;
	uiRefreshItemList();
	$("#itemDataSection").hide();
}

function uiPopulateList(section, items) {
	var uniqueTrack = [];

	$("#itemList").empty();

	for(var t=0;t<items.length;t++){
		var id = items[t].id;
		var name = items[t].n;

		if (items[t].en != undefined && items[t].en != "")
			name += " (" + items[t].en + ")";

		if (!uniqueTrack.includes(id)) {
			uniqueTrack.push(id);

			var html = '<a id="item_' + id + '" href="javascript: uiLoadItem(\'' + section + '\', ' + id + ');" class="list-group-item list-group-item-action">' + name + '</a>';

			$("#itemList").append(html);
		}

	}	
}

function uiSaveSelectedItem() {
	if (selectedId == null)
		return;

	if (selectedSection == "enemy")
		saveSelectedEnemy();
	else if (selectedSection == "resource")
		saveSelectedResource();
	else if (selectedSection == "cellState")
		saveSelectedCellState();
	else if (selectedSection == "image")
		saveSelectedImage();
	else if (selectedSection == "map")
		saveSelectedMap();
	else if (selectedSection == "world")
		saveSelectedWorld();
	else if (selectedSection == "action")
		saveSelectedAction();
	else if (selectedSection == "building")
		saveSelectedBuilding();
	else if (selectedSection == "quest")
		saveSelectedQuest();

	uiRefreshItemList();
}

function uiLoadDropDown(elementId, items) {
	$("#" + elementId).empty();
	$("#" + elementId).append('<option value="-1">None</option>');

	for (var t = 0; t < items.length; t++) {
		var name = items[t].n;

		if (items[t].en != undefined && items[t].en != "")
			name += " (" + items.en + ")";

		$("#" + elementId).append('<option value="' + items[t].id + '">' + name + '</option>');
	}
}

function uiSave() {
	uiSaveSelectedItem();

	var jsonData = "";

	jsonData += "var enemyData = " + JSON.stringify(enemyData) + ";\n";
	jsonData += "var resourceData = " + JSON.stringify(resourceData) + ";\n";
	jsonData += "var cellStateData = " + JSON.stringify(cellStateData) + ";\n";
	jsonData += "var mapData = " + JSON.stringify(mapData) + ";\n";
	jsonData += "var actionData = " + JSON.stringify(actionData) + ";\n";
	jsonData += "var buildingData = " + JSON.stringify(buildingData) + ";\n";
	jsonData += "var questData = " + JSON.stringify(questData) + ";\n";
	jsonData += "var worldData = " + JSON.stringify(worldData) + ";\n";

	download_csv_using_blob("allData.js", jsonData);
}

function uiDownloadImage() {
	drawMapCanvas(false);

	var img = document.getElementById("map_canvas").toDataURL("image/png");
	download_img_using_blob("map_" + selectedId + ".png", "data:" + img);

	drawMapCanvas(true);
}

function goToItem(section, idElem) {
	var itemId = parseInt($("#" + idElem).val());

	if (!isNaN(itemId)) {
		uiLoadItem(section, itemId);
		uiLoadItem(section, itemId);
	}
}