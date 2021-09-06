function loadQuestList() {
	uiPopulateList('quest', questData);
}

function getQuestFromId(id) {
	for (var t = 0; t < questData.length; t++) {
		if (questData[t].id == id)
			return questData[t];
	}

	return null;
}

function getQuestMaxId() {
	var id = -1;

	for (var t = 0; t < questData.length; t++) {
		if (id < questData[t].id)
			id = questData[t].id;
	}

	return id;
}

function loadSelectedQuest() {
	var item = getQuestFromId(selectedId);

	if (item == null)
		return;

	$("#quest_name").val(item.n);
	$("#quest_editorName").val(item.en);
	$("#quest_description").val(item.d);
	$("#quest_startStory").val(item.ss);
	$("#quest_startSummary").val(item.su);
	$("#quest_endStory").val(item.es);
	$("#quest_endSummary").val(item.eu);

	loadDataLinkTable("quest_requirement", item.rq);
	loadDataLinkTable("quest_reward", item.rw);

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedQuest() {
	var item = getQuestFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#quest_name").val();
	item.en = $("#quest_editorName").val();
	item.d = $("#quest_description").val();
	item.ss = $("#quest_startStory").val();
	item.su = $("#quest_startSummary").val();
	item.es = $("#quest_endStory").val();
	item.eu = $("#quest_endSummary").val();

	item.rq = saveDataLinkTable("quest_requirement");
	item.rw = saveDataLinkTable("quest_reward");
}

function createNewQuest() {
	var item = new Object();

	item.id = getQuestMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.rq = [];
	item.rw = [];

	questData.push(item);

	return item;
}

function deleteSelectedQuest() {
	for (var t = 0; t < questData.length; t++) {
		if (questData[t].id == selectedId) {
			questData.splice(t, 1);
			return;
		}
	}
}

function loadQuestDropDown(elementId) {
	uiLoadDropDown(elementId, questData);
}