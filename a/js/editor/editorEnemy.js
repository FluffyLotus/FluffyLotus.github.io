function loadEnemyList() {
	uiPopulateList('enemy', enemyData);
}

function getEnemyStateFromId(id) {
	for (var t = 0; t < enemyData.length; t++) {
		if (enemyData[t].id == id)
			return enemyData[t];
	}

	return null;
}

function getEnemyMaxId() {
	var id = -1;

	for (var t = 0; t < enemyData.length; t++) {
		if (id < enemyData[t].id)
			id = enemyData[t].id;
	}

	return id;
}

function loadSelectedEnemy() {
	var item = getEnemyStateFromId(selectedId);

	if (item == null)
		return;

	$("#enemy_name").val(item.n);
	$("#enemy_editorName").val(item.en);
	$("#enemy_description").val(item.d);
	$("#enemy_image").val(item.im);
	$("#enemy_baseLife").val(item.bl);
	$("#enemy_movementSpeed").val(item.ms);

	$("#enemy_image_graph").html(getImageDivFromName(item.im));

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedEnemy() {
	var item = getEnemyStateFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#enemy_name").val();
	item.en = $("#enemy_editorName").val();
	item.d = $("#enemy_description").val();
	item.im = $("#enemy_image").val();
	item.bl = parseInt($("#enemy_baseLife").val());
	item.ms = parseInt($("#enemy_movementSpeed").val());
}

function createNewEnemy() {
	var item = new Object();

	item.id = getEnemyMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.im = "";
	item.bl = 5;
	item.ms = 1000;

	enemyData.push(item);

	return item;
}

function deleteSelectedEnemy() {
	for (var t = 0; t < enemyData.length; t++) {
		if (enemyData[t].id == selectedId) {
			enemyData.splice(t, 1);
			return;
		}
	}
}

function loadEnemyDropDown(elementId) {
	uiLoadDropDown(elementId, enemyData);
}