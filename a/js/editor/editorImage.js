function loadImageList() {
	uiPopulateList('image', spritesheetData);
}

function getImageFromId(id) {
	for (var t = 0; t < spritesheetData.length; t++) {
		if (spritesheetData[t].id == id)
			return spritesheetData[t];
	}

	return null;
}

function getImageFromName(imageName) {
	for (var t = 0; t < spritesheetData.length; t++) {
		if (spritesheetData[t].n == imageName) {
			return spritesheetData[t];
		}
	}

	return null;
}

function loadSelectedImage() {
	var item = getImageFromId(selectedId);

	$("#item_header").text(item.id + "- " + item.n);
	$("#image_name").val(item.n);

	$("#image_info").empty();

	var html = "";

	for (var t = 0; t < spritesheetData.length; t++) {
		if (spritesheetData[t].n == item.n) {
			html += "<tr>";
			html += "<td>" + spritesheetData[t].i + "</td>";
			html += "<td>" + spritesheetData[t].x + "</td>";
			html += "<td>" + spritesheetData[t].y + "</td>";
			html += "<td>" + spritesheetData[t].w + "</td>";
			html += "<td>" + spritesheetData[t].h + "</td>";
			html += "<td>" + getImageDiv(spritesheetData[t]) + "</td>";			
			html += "</tr>";
		}
	}

	$("#image_info").html(html);
}

function saveSelectedImage() {
	var item = getImageFromId(selectedId);
}