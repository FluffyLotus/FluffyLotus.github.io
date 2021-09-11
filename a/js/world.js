var mainWorld = null;

function WorldInfo() {
    this.mapInfo = [];

    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.mapRefs = [];
}

WorldInfo.prototype.getMinLoc = function () {
    var ret = { x: this.mapInfo[0].x, y: this.mapInfo[0].y };

    for (var t = 0; t < this.mapInfo.length; t++) {
        if (this.mapInfo[t].x < ret.x)
            ret.x = this.mapInfo[t].x;
        if (this.mapInfo[t].y < ret.y)
            ret.y = this.mapInfo[t].y;
    }

    return ret;
}

WorldInfo.prototype.getMaxLoc = function () {
    var ret = { x: this.mapInfo[0].x, y: this.mapInfo[0].y };

    for (var t = 0; t < this.mapInfo.length; t++) {
        if (this.mapInfo[t].x > ret.x)
            ret.x = this.mapInfo[t].x;
        if (this.mapInfo[t].y > ret.y)
            ret.y = this.mapInfo[t].y;
    }

    return ret;
}

WorldInfo.prototype.getPosibleMovement = function (middleMapId) {
    var pm = 0;
    var mx, my;
    var found = false;

    for (var t = 0; t < this.mapInfo.length; t++) {
        if (this.mapInfo[t].mapId == middleMapId) {
            mx = this.mapInfo[t].x;
            my = this.mapInfo[t].y;
            found = true;
        }
    }

    if (found) {
        var bit = [1, 2, 4, 8];

        mx -= this.offsetX;
        my -= this.offsetY;

        for (var t = 0; t < coordPlus.length; t++) {
            var cx = mx + coordPlus[t].x;
            var cy = my + coordPlus[t].y;

            if (cx >= 0 && cx < this.width && cy >= 0 && cy < this.height) {
                if (this.mapRefs[cx + (cy * this.width)] != null && this.mapRefs[cx + (cy * this.width)].active)
                    pm += bit[t];
            }
        }
    }

    return pm;
}

function WorldMapInfo() {
    this.x = 0;
    this.y = 0;
    this.mapId = 0;

    this.mapRef = null;
}

function initWorld() {
    mainWorld = new WorldInfo();

    for (var t = 0; t < worldData[0].c.length; t++) {
        var item = new WorldMapInfo();

        item.x = worldData[0].c[t].x;
        item.y = worldData[0].c[t].y;
        item.mapId = worldData[0].c[t].m;

        mainWorld.mapInfo.push(item);
    }
}

function finishInitWorld() {
    for (var t = 0; t < mainWorld.mapInfo.length; t++) {
        mainWorld.mapInfo[t].mapRef = getMapFromId(mainWorld.mapInfo[t].mapId);
    }

    var minLoc = mainWorld.getMinLoc();
    var maxLoc = mainWorld.getMaxLoc();

    mainWorld.offsetX = minLoc.x;
    mainWorld.offsetY = minLoc.y;
    mainWorld.width = maxLoc.x - minLoc.x + 1;
    mainWorld.height = maxLoc.y - minLoc.y + 1;
    mainWorld.mapRefs = [];

    for (var y = 0; y < mainWorld.height; y++) {
        for (var x = 0; x < mainWorld.width; x++) {
            mainWorld.mapRefs[x + (y * mainWorld.width)] = null;

            for (var t = 0; t < mainWorld.mapInfo.length; t++) {
                if (mainWorld.mapInfo[t].x == x + mainWorld.offsetX && mainWorld.mapInfo[t].y == y + mainWorld.offsetY)
                    mainWorld.mapRefs[x + (y * mainWorld.width)] = mainWorld.mapInfo[t].mapRef;
            }
        }
    }
}