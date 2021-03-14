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

function getImageFromName(imageName) {
    for (var t = 0; t < buildingImageInfo.length; t++) {
        if (buildingImageInfo[t].N == imageName) {
            return buildingImageInfo[t];
        }
    }
    for (var t = 0; t < cellImageInfo.length; t++) {
        if (cellImageInfo[t].N == imageName) {
            return cellImageInfo[t];
        }
    }
    for (var t = 0; t < iconImageInfo.length; t++) {
        if (iconImageInfo[t].N == imageName) {
            return iconImageInfo[t];
        }
    }
    for (var t = 0; t < particleImageInfo.length; t++) {
        if (particleImageInfo[t].N == imageName) {
            return particleImageInfo[t];
        }
    }
    for (var t = 0; t < characterImageInfo.length; t++) {
        if (characterImageInfo[t].N == imageName) {
            return characterImageInfo[t];
        }
    }

    return null;
}

function getImagePositionX(sheetName, imageName) {
    var img = getImageFromName(imageName);

    if (img != null)
        return img.X;
    return 0;
}

function getImagePositionY(sheetName, imageName) {
    var img = getImageFromName(imageName);

    if (img != null)
        return img.Y;
    return 0;
}