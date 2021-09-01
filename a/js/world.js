var mainWorld = null;

function WorldInfo() {
    this.mapInfo = [];
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
        for (var t = 0; t < this.mapInfo.length; t++) {
            var m = getMapFromId(this.mapInfo[t].mapId);

            if (m.active) {
                if (this.mapInfo[t].x == mx && this.mapInfo[t].y == my - 1)
                    pm += 1;
                if (this.mapInfo[t].x == mx - 1 && this.mapInfo[t].y == my)
                    pm += 2;
                if (this.mapInfo[t].x == mx + 1 && this.mapInfo[t].y == my)
                    pm += 4;
                if (this.mapInfo[t].x == mx && this.mapInfo[t].y == my + 1)
                    pm += 8;
            }
        }
    }

    return pm;
}

function WorldMapInfo() {
    this.x = 0;
    this.y = 0;
    this.mapId = 0;
}

function initWorld() {
    var item;

    mainWorld = new WorldInfo();

    item = new WorldMapInfo();
    item.x = 0;
    item.y = 0;
    item.mapId = 0;
    mainWorld.mapInfo.push(item);

    item = new WorldMapInfo();
    item.x = 0;
    item.y = -1;
    item.mapId = 1;
    mainWorld.mapInfo.push(item);

    item = new WorldMapInfo();
    item.x = 1;
    item.y = -1;
    item.mapId = 2;
    mainWorld.mapInfo.push(item);

    item = new WorldMapInfo();
    item.x = 0;
    item.y = -2;
    item.mapId = 3;
    mainWorld.mapInfo.push(item);

    item = new WorldMapInfo();
    item.x = -1;
    item.y = -1;
    item.mapId = 4;
    mainWorld.mapInfo.push(item);
}