function loadActionList() {
	uiPopulateList('action', actionData);
}

function getActionFromId(id) {
	for (var t = 0; t < actionData.length; t++) {
		if (actionData[t].id == id)
			return actionData[t];
	}

	return null;
}

function getActionMaxId() {
	var id = -1;

	for (var t = 0; t < actionData.length; t++) {
		if (id < actionData[t].id)
			id = actionData[t].id;
	}

	return id;
}

function loadSelectedAction() {
	var item = getActionFromId(selectedId);

	if (item == null)
		return;

	$("#action_name").val(item.n);
	$("#action_editorName").val(item.en);
	$("#action_description").val(item.d);

	loadDataLinkTable("action_reward", item.rw);

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedAction() {
	var item = getActionFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#action_name").val();
	item.en = $("#action_editorName").val();
	item.d = $("#action_description").val();

	item.rw = saveDataLinkTable("action_reward");
}

function createNewAction() {
	var item = new Object();

	item.id = getActionMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.rw = [];

	actionData.push(item);

	return item;
}

function deleteSelectedAction() {
	for (var t = 0; t < actionData.length; t++) {
		if (actionData[t].id == selectedId) {
			actionData.splice(t, 1);
			return;
		}
	}
}

function loadActionDropDown(elementId) {
	uiLoadDropDown(elementId, actionData);
}