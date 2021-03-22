/*
var mapData1 = [
    0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
    3, 3, 0, 0, 0, 2, 2, 2, 0, 0, 4, 4,
    3, 3, 0, 0, 2, 2, 2, 2, 0, 4, 4, 4];

var mapData2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 6, 6,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1];
    */

var mapsData = [];

// 1
mapsData[0] = [
    7, 3, 3, 3, 7, 7, 7, 3, 3, 2, 2, 2,
    7, 3, 1, 3, 7, 7, 3, 3, 3, 0, 0, 2,
    7, 3, 0, 3, 3, 3, 3, 1, 3, 3, 0, 0,
    7, 3, 0, 3, 3, 3, 1, 1, 1, 3, 0, 0,
    7, 3, 3, 3, 1, 1, 0, 3, 3, 0, 0, 0,
    7, 7, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0,
    7, 7, 7, 3, 3, 0, 0, 0, 5, 6, 6, 6,
    7, 7, 7, 3, 3, 1, 0, 0, 0, 0, 0, 69,
    7, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0,
    3, 3, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1,
    3, 1, 0, 0, 3, 7, 7, 3, 3, 3, 1, 1,
    3, 3, 3, 3, 3, 7, 7, 7, 3, 3, 3, 1
];

// 2
mapsData[1] = [
    2, 2, 2, 2, 3, 7, 7, 3, 3, 2, 23, 2,
    2, 0, 2, 3, 3, 3, 3, 3, 2, 2, 24, 2,
    2, 0, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0,
    1, 0, 3, 3, 0, 3, 0, 0, 1, 0, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0,
    0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0,
    6, 6, 6, 8, 6, 6, 5, 6, 6, 6, 6, 6,
    0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0,
    0, 3, 0, 3, 3, 3, 3, 0, 0, 0, 1, 0,
    3, 3, 3, 3, 7, 7, 3, 3, 3, 0, 0, 0
];

// Swamp
mapsData[2] = [
    51, 35, 35, 10, 10, 35, 10, 35, 10, 10, 40, 35,
    37, 35, 35, 10, 10, 11, 10, 10, 10, 45, 43, 10,
    10, 45, 41, 41, 46, 38, 45, 41, 46, 40, 10, 10,
    11, 40, 10, 38, 48, 41, 43, 11, 48, 43, 10, 11,
    10, 40, 11, 10, 40, 10, 38, 10, 40, 10, 38, 10,
    39, 42, 39, 39, 42, 39, 12, 39, 42, 39, 39, 39,
    10, 40, 10, 10, 40, 10, 38, 10, 40, 10, 38, 10,
    10, 40, 38, 11, 40, 10, 11, 10, 48, 41, 46, 11,
    11, 40, 38, 45, 47, 46, 11, 45, 43, 10, 44, 41,
    10, 48, 41, 43, 10, 44, 41, 43, 10, 10, 10, 10,
    41, 50, 10, 10, 10, 10, 10, 10, 11, 10, 35, 35,
    10, 40, 10, 11, 10, 38, 38, 38, 10, 35, 35, 35
];

// Desert
mapsData[3] = [
    13, 14, 13, 13, 13, 13, 13, 13, 13, 62, 62, 62,
    13, 13, 13, 13, 13, 13, 14, 13, 13, 62, 62, 62,
    13, 13, 62, 13, 13, 13, 13, 13, 13, 13, 62, 62,
    13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 14, 13, 13, 13, 13, 13, 14, 13, 13,
    63, 63, 63, 63, 15, 63, 63, 63, 63, 63, 63, 63,
    13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13, 62, 13, 61, 13, 13, 13,
    13, 14, 13, 13, 13, 13, 13, 13, 3, 3, 13, 13,
    13, 13, 13, 13, 13, 13, 13, 61, 3, 70, 13, 13,
    62, 62, 62, 13, 13, 13, 13, 13, 61, 13, 13, 13,
    62, 62, 62, 62, 13, 13, 14, 13, 13, 13, 13, 13
];

// Lava
mapsData[4] = [
    32, 32, 32, 4, 4, 4, 4, 4, 4, 32, 32, 32,
    16, 16, 28, 26, 4, 4, 4, 4, 30, 16, 4, 16,
    16, 28, 26, 16, 16, 4, 4, 16, 27, 31, 4, 16,
    16, 4, 16, 16, 28, 26, 27, 29, 16, 16, 16, 16,
    16, 27, 31, 16, 27, 29, 16, 27, 29, 16, 16, 16,
    25, 25, 25, 25, 25, 18, 25, 17, 18, 25, 25, 25,
    16, 16, 16, 16, 28, 26, 16, 16, 30, 16, 16, 16,
    16, 16, 33, 16, 30, 16, 16, 16, 4, 4, 4, 16,
    16, 33, 16, 16, 27, 4, 16, 16, 30, 4, 4, 34,
    16, 16, 4, 31, 31, 26, 16, 16, 27, 29, 16, 16,
    16, 16, 30, 16, 16, 16, 32, 32, 16, 4, 16, 16,
    16, 16, 30, 16, 32, 32, 32, 32, 16, 30, 16, 16
];

// Canyon
mapsData[5] = [
    19, 19, 19, 19, 19, 19, 19, 19, 19, 66, 66, 66,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 66, 67, 66,
    19, 19, 20, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    0, 19, 19, 71, 68, 68, 68, 68, 72, 19, 19, 19,
    0, 0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    0, 0, 71, 68, 68, 72, 19, 71, 68, 72, 19, 19,
    6, 6, 64, 64, 64, 64, 65, 64, 64, 64, 64, 64,
    0, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    71, 68, 68, 72, 19, 71, 68, 72, 19, 71, 68, 68,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19
];

// Old city
mapsData[6] = [
    0, 0, 0, 54, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 54, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 58, 55, 56, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 54, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 54, 0, 0, 0, 60, 60, 60,
    0, 0, 0, 0, 0, 54, 0, 0, 0, 0, 60, 60,
    21, 21, 21, 21, 21, 22, 21, 21, 21, 21, 21, 60,
    0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 60, 60,
    0, 0, 0, 0, 0, 52, 0, 0, 0, 60, 60, 60,
    0, 0, 0, 0, 0, 53, 0, 0, 0, 0, 0, 60,
    0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0,
    0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 0, 0
];

var MAP_BUILDING_START = 0;
var MAP_BUILDING_SECOND = 1;

function mapBuilding() {
    this.id = 0;
    this.name = "";
    this.mapWidth = 12;
    this.mapHeight = 12;
    this.grid = [];
    this.isActive = false;
}

mapBuilding.prototype.generateGrid = function (mapData) {
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var c = new mapGridInformation();

            c.cellId = mapData[x + (y * this.mapWidth)];
            c.cellRef = getCellFromId(c.cellId);

            this.grid[x + (y * this.mapWidth)] = c;
        }
    }
}

mapBuilding.prototype.prepareTick = function () {
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];

            curGrid.prepareTick();
        }
    }
}

mapBuilding.prototype.processTick = function () {
    // Process cost
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];

            if (curGrid.buildingInst != null) {
                //if (curGrid.isConnectedToStorage || !getBuildingFromId(curGrid.buildingInst.buildingId).needStorage) {
                if (curGrid.isConnectedToStorage || !curGrid.buildingInst.buildingRef.needStorage) {
                    //var curBuilding = getBuildingFromId(curGrid.buildingInst.buildingId);
                    var curBuilding = curGrid.buildingInst.buildingRef;

                    if (curBuilding.hasTickRequirements(curGrid.buildingInst.buildingLevel, curGrid.buildingInst.buildingGradeLevel)) {
                        curBuilding.processTickRequirements(curGrid.buildingInst.buildingLevel, curGrid.buildingInst.buildingGradeLevel);
                        curGrid.processBuildingTick = true;
                    }
                }
            }
        }
    }

    // Add particle
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var sourceGrid = this.grid[x + (y * this.mapWidth)];
            //var cell = getCellFromId(sourceGrid.cellId);
            var cell = sourceGrid.cellRef;

            if (sourceGrid.buildingInst != null) {
                //var building = getBuildingFromId(sourceGrid.buildingInst.buildingId);
                var building = sourceGrid.buildingInst.buildingRef;

                if (sourceGrid.processBuildingTick) {
                    var particleId = -1;

                    if (building.generateParticleId >= 0)
                        particleId = building.generateParticleId;
                    else if (building.extractCellParticle && cell.innerParticleId >= 0)
                        particleId = cell.innerParticleId;

                    if (particleId >= 0) {
                        var buildingGrade = sourceGrid.buildingInst.buildingGradeLevel;

                        for (var i = 0; i < side8rotPossibilities[buildingGrade].length; i++) {
                            var pos = side8rotPossibilities[buildingGrade][i] + sourceGrid.buildingInst.buildingRotation;

                            while (pos >= 8) {
                                pos -= 8;
                            }

                            var tx = x + side8rot[pos].x;
                            var ty = y + side8rot[pos].y;

                            if (tx >= 0 && tx < this.mapWidth && ty >= 0 && ty < this.mapHeight) {
                                var targetGrid = this.grid[tx + (ty * this.mapWidth)];

                                if (targetGrid.buildingInst != null && targetGrid.buildingInst.buildingId == BUILDING_FAN) {
                                    if (targetGrid.processBuildingTick && targetGrid.isConnectedToStorage) {
                                        tx = tx + (sideCrossRot[targetGrid.buildingInst.buildingRotation % 4].x * targetGrid.buildingInst.buildingLevel);
                                        ty = ty + (sideCrossRot[targetGrid.buildingInst.buildingRotation % 4].y * targetGrid.buildingInst.buildingLevel);

                                        if (tx >= 0 && tx < this.mapWidth && ty >= 0 && ty < this.mapHeight) {
                                            targetGrid = this.grid[tx + (ty * this.mapWidth)];

                                            var pl = sourceGrid.buildingInst.buildingLevel;

                                            pl = Math.ceil(pl / 2);

                                            targetGrid.addParticle(particleId, pl);
                                        }
                                    }
                                    else {
                                        targetGrid.addParticle(particleId, sourceGrid.buildingInst.buildingLevel);
                                    }
                                }
                                else {
                                    targetGrid.addParticle(particleId, sourceGrid.buildingInst.buildingLevel);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Look at cells particle
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];
            //var curCell = getCellFromId(curGrid.cellId);
            var curCell = curGrid.cellRef;

            if (curGrid.particles.length == 1) {
                if (curGrid.particles[0].particleId == curCell.importParticleId) {
                    curCell.importParticleCount += curGrid.particles[0].particleLevel;
                }
            }
        }
    }

    // Give resource
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];

            if (curGrid.buildingInst != null && (curGrid.isConnectedToStorage && curGrid.processBuildingTick)) {
                //var curBuilding = getBuildingFromId(curGrid.buildingInst.buildingId);
                var curBuilding = curGrid.buildingInst.buildingRef;

                curBuilding.processTickRewards(curGrid.buildingInst.buildingLevel, curGrid.buildingInst.buildingGradeLevel);

                var op = curGrid.getOutputParticle();

                if (op != null)
                    curBuilding.processParticleOutput(op.particleId, Math.min(op.particleLevel, curGrid.buildingInst.buildingLevel));
            }
        }
    }
}

mapBuilding.prototype.processGridClick = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    curGrid.processClick();
}

mapBuilding.prototype.upgradeGrid = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    curGrid.processUpgrade();
}

mapBuilding.prototype.downgradeGrid = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    curGrid.processDowngrade();
}

mapBuilding.prototype.addBuilding = function (x, y, buildingId, processAddBuilding) {
    if (buildingId < 0)
        return;

    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.processAddBuilding(buildingId, processAddBuilding))
        this.calculateGridConnection();
}

mapBuilding.prototype.sellBuilding = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.processSellBuilding())
        this.calculateGridConnection();
}

mapBuilding.prototype.calculateGridConnection = function () {
    var points = [];

    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];

            if (curGrid.buildingInst != null && curGrid.buildingInst.buildingId == BUILDING_STORAGE) {
                curGrid.isConnectedToStorage = true;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else {
                curGrid.isConnectedToStorage = false;
            }
        }
    }

    while (points.length > 0) {
        var p = points.pop();

        for (t = 0; t < sideCross.length; t++) {
            var tx = p.x + sideCross[t].x;
            var ty = p.y + sideCross[t].y;

            var orgGrid = this.grid[p.x + (p.y * this.mapWidth)];

            if (tx >= 0 && ty >= 0 && tx < this.mapWidth && ty < this.mapHeight) {
                var curGrid = this.grid[tx + (ty * this.mapWidth)];

                if (!curGrid.isConnectedToStorage && curGrid.buildingInst != null && orgGrid.isConnectedToStorage == true) {
                    curGrid.isConnectedToStorage = true;

                    if (curGrid.buildingInst.buildingId == BUILDING_STORAGEPIPE || curGrid.buildingInst.buildingId == BUILDING_UNDERGROUNDPIPE) {
                        var newP = new Object();
                        newP.x = tx;
                        newP.y = ty;
                        points.push(newP);
                    }
                }
            }
        }
    }
}

/*
     0
    1 2
     3

        0000
        0001
        0010
        0011
        0100
        0101
        0110
        0111
        1000
        1001
        1010
        1011
        1100
        1101
        1110
        1111
*/

mapBuilding.prototype.getSideStorageConnectionStr = function (x, y) {
    var s = ["0", "0", "0", "0"];

    for (var i = 0; i < sideCross.length; i++) {
        var tx = x + sideCross[i].x;
        var ty = y + sideCross[i].y;

        if (tx >= 0 && ty >= 0 && tx < this.mapWidth && ty < this.mapHeight) {
            var curGrid = this.grid[tx + (ty * this.mapWidth)];

            if (curGrid.isConnectedToStorage) {
                s[i] = "1";
            }
        }
    }

    return s[0] + s[1] + s[2] + s[3];
}

function prepareMapBuildingTick() {
    for (var i = 0; i < mapBuildings.length; i++) {
        mapBuildings[i].prepareTick();
    }
}

function processMapBuildingTick() {
    for (var i = 0; i < mapBuildings.length; i++) {
        mapBuildings[i].processTick();
    }
}

function getMapBuildingFromId(id) {
    for (var t = 0; t < mapBuildings.length; t++) {
        if (mapBuildings[t].id == id)
            return mapBuildings[t];
    }

    return null;
}

function loadMapBuilding() {
    var newItem;

    newItem = new mapBuilding();
    newItem.id = 0;
    newItem.name = "Town of Naposhore";
    newItem.generateGrid(mapsData[0]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 1;
    newItem.name = "Town of Barock";
    newItem.generateGrid(mapsData[1]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 2;
    newItem.name = "Swamp";
    newItem.generateGrid(mapsData[2]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 3;
    newItem.name = "Desert";
    newItem.generateGrid(mapsData[3]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 4;
    newItem.name = "Lava";
    newItem.generateGrid(mapsData[4]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 5;
    newItem.name = "Canyon";
    newItem.generateGrid(mapsData[5]);
    mapBuildings.push(newItem);

    newItem = new mapBuilding();
    newItem.id = 6;
    newItem.name = "Old City";
    newItem.generateGrid(mapsData[6]);
    mapBuildings.push(newItem);
}

function setRefMapBuilding() {
}