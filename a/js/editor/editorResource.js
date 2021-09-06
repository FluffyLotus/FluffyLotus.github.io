function loadResourceList() {
	uiPopulateList('resource', resourceData);
}

function getResourceFromId(id) {
	for (var t = 0; t < resourceData.length; t++) {
		if (resourceData[t].id == id)
			return resourceData[t];
	}

	return null;
}

function getResourceMaxId() {
	var id = -1;

	for (var t = 0; t < resourceData.length; t++) {
		if (id < resourceData[t].id)
			id = resourceData[t].id;
	}

	return id;
}

function loadSelectedResource() {
	var item = getResourceFromId(selectedId);

	if (item == null)
		return;

	$("#resource_name").val(item.n);
	$("#resource_editorName").val(item.en);
	$("#resource_description").val(item.d);
	$('#resource_alwaysHidden').prop('checked', item.ah);

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedResource() {
	var item = getResourceFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#resource_name").val();
	item.en = $("#resource_editorName").val();
	item.d = $("#resource_description").val();
	item.ah = $("#resource_alwaysHidden").prop('checked');
}

function createNewResource() {
	var item = new Object();

	item.id = getResourceMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.ah = false;

	resourceData.push(item);

	return item;
}

function deleteSelectedResource() {
	for (var t = 0; t < resourceData.length; t++) {
		if (resourceData[t].id == selectedId) {
			resourceData.splice(t, 1);
			return;
		}
	}
}

function loadResourceDropDown(elementId) {
	uiLoadDropDown(elementId, mapDresourceDataata);
}