function getImageListFromName(name) {
    var imageList = buildingImageInfo;

    if (name == "building")
        imageList = buildingImageInfo;
    if (name == "cell")
        imageList = cellImageInfo;
    if (name == "icon")
        imageList = iconImageInfo;
    if (name == "particle")
        imageList = particleImageInfo;

    return imageList;
}

function getImagePositionX(name, id, subId = 0) {
    var imageList = getImageListFromName(name);

    for (var t = 0; t < imageList.length; t++) {
        if (imageList[t].ID == id && imageList[t].SID == subId) {
            return imageList[t].X;
        }
    }
}

function getImagePositionY(name, id, subId = 0) {
    var imageList = getImageListFromName(name);

    for (var t = 0; t < imageList.length; t++) {
        if (imageList[t].ID == id && imageList[t].SID == subId) {
            return imageList[t].Y;
        }
    }
}