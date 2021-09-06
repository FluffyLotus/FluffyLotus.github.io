var worldSelectedX = null;
var worldSelectedY = null;

var FULLMAP_CELL_W = 16;
var FULLMAP_CELL_H = 16;

function loadWorldList() {
	uiPopulateList('world', worldData);

	drawFullMap();
}

function getWorldFromId(id) {
	return worldData;
}

function loadSelectedWorld() {
	var item = getWorldFromId(selectedId);

	$("#item_header").text(item.id + "- " + item.n);
}

function saveSelectedWorld() {
	var item = getWorldFromId(selectedId);
}

function addNewMapToWorld() {
	var mapId = parseInt($("#worldNewMapId").val());
	var mapX = parseInt($("#worldNewMapX").val());
	var mapY = parseInt($("#worldNewMapY").val());

	var newItem = new Object();

	newItem.x = mapX;
	newItem.y = mapY;
	newItem.m = mapId;

	worldData[0].c.push(newItem);

	drawFullMap();
}

function drawFullMap() {
	var c = document.getElementById("world_fullMap");
	var ctx = c.getContext("2d");
	var spriteSheetImage = document.getElementById("spritesheet");

	var mapSize = getWorldSize();

	c.width = (mapSize.maxX - mapSize.minX + 1) * MAP_WIDTH * FULLMAP_CELL_W;
	c.height = (mapSize.maxY - mapSize.minY + 1) * MAP_HEIGHT * FULLMAP_CELL_H;

	c.style.width = c.width + "px";
	c.style.height = c.height + "px";

	ctx.clearRect(0, 0, c.width, c.height);

	for(var t=0;t<worldData[0].c.length;t++){
		var curMap = getMapFromId(worldData[0].c[t].m);

		//if(curMap == null)
		//	continue;

		var ox = (worldData[0].c[t].x - mapSize.minX) * MAP_WIDTH * FULLMAP_CELL_W;
		var oy = (worldData[0].c[t].y - mapSize.minY) * MAP_HEIGHT * FULLMAP_CELL_H;

	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var img;
			var state = getCellStateFromId(curMap.c[x + (y * MAP_WIDTH)]);

			if (state != null) {
				img = getImageFromName(state.fi);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, ox + x * FULLMAP_CELL_W, oy + y * FULLMAP_CELL_H, FULLMAP_CELL_W, FULLMAP_CELL_H);

				img = getImageFromName(state.oi);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, ox + x * FULLMAP_CELL_W, oy + y * FULLMAP_CELL_H, FULLMAP_CELL_W, FULLMAP_CELL_H);

				img = getImageFromName(state.ei);
				if (img != null) ctx.drawImage(spriteSheetImage, img.x, img.y, img.w, img.h, ox + x * FULLMAP_CELL_W, oy + y * FULLMAP_CELL_H, FULLMAP_CELL_W, FULLMAP_CELL_H);
			}
		}
	}
	}

	if(worldSelectedX != null && worldSelectedY != null){
		var ox = (worldSelectedX - mapSize.minX) * MAP_WIDTH * FULLMAP_CELL_W;
		var oy = (worldSelectedY - mapSize.minY) * MAP_HEIGHT * FULLMAP_CELL_H;

ctx.beginPath();
ctx.lineWidth = "2";
ctx.strokeStyle = "red";
ctx.rect(worldSelectedX * MAP_WIDTH * FULLMAP_CELL_W, worldSelectedY * MAP_HEIGHT * FULLMAP_CELL_H, MAP_WIDTH * FULLMAP_CELL_W, MAP_HEIGHT * FULLMAP_CELL_H);
ctx.stroke();
	}

}

function getWorldSize() {
	var ms = new Object();

	ms.minX = 0;
	ms.minY = 0;
	ms.maxX = 0;
	ms.maxY = 0;

	for(var t=0;t<worldData[0].c.length;t++){
		if(worldData[0].c[t].x < ms.minX) ms.minX = worldData[0].c[t].x;
		if(worldData[0].c[t].y < ms.minY) ms.minY = worldData[0].c[t].y;
		if(worldData[0].c[t].x > ms.maxX) ms.maxX = worldData[0].c[t].x;
		if(worldData[0].c[t].y > ms.maxY) ms.maxY = worldData[0].c[t].y;
	}

	return ms;
}

function fullWorldCanvasClick(e, evt) {
	var px, py;
	var pos = getMousePos(e, evt);

	px = Math.floor(pos.x / MAP_WIDTH / FULLMAP_CELL_W);
	py = Math.floor(pos.y / MAP_HEIGHT / FULLMAP_CELL_H);

	var mapSize = getWorldSize();

	px += mapSize.minX;
	py += mapSize.minY;

	for(var t=0;t<worldData[0].c.length;t++){
		if(worldData[0].c[t].x == px && worldData[0].c[t].y == py){
			uiLoadItem("map", worldData[0].c[t].m);
			uiLoadItem("map", worldData[0].c[t].m);
			return;
		}
	}
}

function fullWorldCanvasOver(e, evt) {
	var px, py;
	var pos = getMousePos(e, evt);

	px = Math.floor(pos.x / MAP_WIDTH / FULLMAP_CELL_W);
	py = Math.floor(pos.y / MAP_HEIGHT / FULLMAP_CELL_H);

	if(px != worldSelectedX || py != worldSelectedY){
		worldSelectedX = px;
		worldSelectedY = py;

	var mapSize = getWorldSize();

	px += mapSize.minX;
	py += mapSize.minY;

	$("#fullWorldSelectedMap").text("");

	for(var t=0;t<worldData[0].c.length;t++){
		if(worldData[0].c[t].x == px && worldData[0].c[t].y == py){
			$("#fullWorldSelectedMap").text(worldData[0].c[t].m);
	$("#fullWorldSelectedMapName").text(getMapFromId(worldData[0].c[t].m).n);
		}
	}

	$("#fullWorldSelectedX").text(px);
	$("#fullWorldSelectedY").text(py);

		drawFullMap();
	}
}

function fullWorldCanvasOut(e, evt) {
	var pos = getMousePos(e, evt);

	worldSelectedX = null;
	worldSelectedY = null;

	$("#fullWorldSelectedMap").text("");
	$("#fullWorldSelectedX").text("");
	$("#fullWorldSelectedY").text("");
	$("#fullWorldSelectedMapName").text("");

	drawFullMap();
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}