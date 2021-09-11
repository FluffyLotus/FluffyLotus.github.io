var images = [];

var spriteSheetImage;

var IMAGE_WIDTH = 32;
var IMAGE_HEIGHT = 32;

var IMAGE_CURSOR = "_cursor";
var IMAGE_UPGRADE = "_upgrade";
var IMAGE_DOWNGRADE = "_downgrade";
var IMAGE_TRASHCAN = "_trashcan";
var IMAGE_SELECT = "_select";
var IMAGE_CLOUD = "large_cloud";
var IMAGE_NOCONNECTION = "_no_connection";
var IMAGE_CLOUD2 = "_cloud2";
var IMAGE_EXCLAMATION = "_exclamation";
var IMAGE_SMALLUPGRADE = "_small_upgrade";
var IMAGE_REDMIST = "large_redmist";
var IMAGE_BLACKER = "_blacker";

//
//         0001:1
//
// 0010:2          0100:4
//
//         1000:8
//

function ImageGroupInfo() {
    this.name = "";
    this.info = [];
}

ImageGroupInfo.prototype.hasCorners = function () {
    return this.info.length > 1;
}

function ImageInfo() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
}

function getImageFromName(name) {
    for (var i = 0; i < images.length; i++)
        if (images[i].name == name)
            return images[i];

    for (var i = 0; i < images.length; i++)
        if (images[i].name == "_" + name)
            return images[i];

    return null;
}

function initImages() {
    spriteSheetImage = document.getElementById("spritesheet");

    for (var t = 0; t < spritesheetData.length; t++) {
        var group = getImageFromName(spritesheetData[t].n);

        if (group == null) {
            group = new ImageGroupInfo();
            group.name = spritesheetData[t].n;

            images.push(group);
        }

        var info = new ImageInfo();

        info.x = spritesheetData[t].x;
        info.y = spritesheetData[t].y;
        info.w = spritesheetData[t].w;
        info.h = spritesheetData[t].h;

        group.info[spritesheetData[t].i] = info;
    }
}

function finishInitImages() {
}