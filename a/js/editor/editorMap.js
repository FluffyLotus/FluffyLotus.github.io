var MAP_WIDTH = 12;
var MAP_HEIGHT = 12;

var GRID_WIDTH = 32;
var GRID_HEIGHT = 32;

var selectedCellX = 0;
var selectedCellY = 0;

function loadMapList() {
	uiPopulateList('map', mapData);
}

function getMapFromId(id) {
	for (var t = 0; t < mapData.length; t++) {
		if (mapData[t].id == id)
			return mapData[t];
	}

	return null;
}

function getMapMaxId() {
	var id = -1;

	for (var t = 0; t < mapData.length; t++) {
		if (id < mapData[t].id)
			id = mapData[t].id;
	}

	return id;
}

function loadSelectedMap() {
	var item = getMapFromId(selectedId);

	if (item == null)
		return;

	loadCellStateDropDown("map_selectedCell");
	loadCellStateDropDown("map_globalCell");

	$("#map_name").val(item.n);
	$("#map_editorName").val(item.en);
	$("#map_description").val(item.d);

	$("#item_header").text(item.id + "- " + item.n);

	selectMapCell(0, 0);
	drawMapCanvas(true);
}

function saveSelectedMap() {
	var item = getMapFromId(selectedId);

	if (item == null)
		return;

	item.n = $("#map_name").val();
	item.en = $("#map_editorName").val();
	item.d = $("#map_description").val();
}

function createNewMap() {
	var item = new Object();

	item.id = getMapMaxId() + 1;
	item.n = "New Item";
	item.en = "";
	item.d = "";
	item.c = [];

	for (var t = 0; t < MAP_WIDTH * MAP_HEIGHT; t++) {
		item.c[t] = 0;
	}

	mapData.push(item);

	return item;
}

// map_canvas
// map_selectedPosition
// map_selectedCell
// map_globalCell

function deleteSelectedMap() {
	for (var t = 0; t < mapData.length; t++) {
		if (mapData[t].id == selectedId) {
			mapData.splice(t, 1);
			break;
		}
	}

	for(var t=0;t<worldData[0].c.length;t++){
		if (worldData[0].c[t].m == selectedId) {
			worldData[0].c.splice(t, 1);
			break;
		}
	}
}

function loadMapDropDown(elementId) {
	uiLoadDropDown(elementId, mapData);
}

function drawMapCanvas(showSelectedCell) {
	var item = getMapFromId(selectedId);

	var c = document.getElementById("map_canvas");
	var ctx = c.getContext("2d");
	var spriteSheetImage = document.getElementById("spritesheet");

	ctx.clearRect(0, 0, c.width, c.height);

	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var img;
			var state = getCellStateFromId(item.c[x + (y * MAP_WIDTH)]);

			if (state != null) {
				img = getImageFromName(state.fi);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x * GRID_WIDTH, y * GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);

				img = getImageFromName(state.oi);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x * GRID_WIDTH, y * GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);

				img = getImageFromName(state.ei);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x * GRID_WIDTH, y * GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
			}

			if (showSelectedCell) {
				if (x == selectedCellX && y == selectedCellY) {
					img = getImageFromName("_select");
					ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, x * GRID_WIDTH, y * GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
				}
			}
		}
	}
}

function selectMapCell(x, y) {
	var item = getMapFromId(selectedId);

	selectedCellX = x;
	selectedCellY = y;

	$("#map_selectedPosition").text(selectedCellX + ", " + selectedCellY);
	$("#map_selectedCell").val(item.c[selectedCellX + (selectedCellY * MAP_WIDTH)]);
}

function uiClearMap() {
	var item = getMapFromId(selectedId);
	var cellStateId = parseInt($("#map_globalCell").val());

	for (var t = 0; t < MAP_WIDTH * MAP_HEIGHT; t++) {
		item.c[t] = cellStateId;
	}

	drawMapCanvas(true);
	selectMapCell(selectedCellX, selectedCellY);
}

function canvasClick(e, evt) {
	var item = getMapFromId(selectedId);
	var pos = getMousePos(e, evt);

	selectedCellX = parseInt(pos.x / GRID_WIDTH);
	selectedCellY = parseInt(pos.y / GRID_HEIGHT);

	if (parseInt($("#map_globalCell").val()) >= 0)
		item.c[selectedCellX + (selectedCellY * MAP_WIDTH)] = parseInt($("#map_globalCell").val());

	selectMapCell(selectedCellX, selectedCellY);
	drawMapCanvas(true);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}