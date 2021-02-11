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
    2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 24, 2,
    0, 0, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0,
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
    37, 37, 51, 10, 10, 35, 10, 35, 10, 10, 40, 35,
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
    13, 14, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13, 14, 13, 13, 62, 13, 13,
    13, 13, 62, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 14, 13, 13, 13, 13, 13, 13, 13, 13,
    63, 63, 63, 63, 15, 13, 13, 13, 13, 13, 14, 13,
    13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
    13, 13, 13, 13, 13, 13, 62, 13, 13, 13, 13, 13,
    13, 14, 13, 13, 13, 13, 13, 13, 13, 61, 13, 13,
    13, 13, 13, 13, 13, 13, 13, 13, 61, 3, 61, 13,
    13, 13, 62, 13, 13, 13, 13, 13, 13, 61, 13, 13,
    13, 13, 13, 13, 13, 13, 14, 13, 13, 13, 13, 13
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
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    19, 19, 19, 19, 19, 68, 68, 68, 19, 19, 19, 19,
    19, 19, 68, 68, 68, 68, 19, 68, 68, 68, 19, 19,
    64, 64, 64, 64, 64, 64, 65, 64, 64, 64, 64, 64,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
    68, 68, 68, 68, 19, 19, 19, 68, 68, 68, 68, 68,
    19, 19, 19, 68, 19, 19, 19, 68, 19, 19, 19, 19,
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
    21, 21, 21, 21, 21, 22, 0, 0, 0, 0, 0, 60,
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

            if (curGrid.buildingId >= 0) {
                if (curGrid.isConnectedToStorage || !getBuildingFromId(curGrid.buildingId).needStorage) {
                    var curBuilding = getBuildingFromId(curGrid.buildingId);

                    if (curBuilding.hasTickRequirements(curGrid.buildingLevel, curGrid.buildingGradeLevel)) {
                        curBuilding.processTickRequirements(curGrid.buildingLevel, curGrid.buildingGradeLevel);
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
            var cell = getCellFromId(sourceGrid.cellId);
            var building = getBuildingFromId(sourceGrid.buildingId);

            if (sourceGrid.processBuildingTick) {
                var particleId = -1;

                if (building.generateParticleId >= 0)
                    particleId = building.generateParticleId;
                else if (building.extractCellParticle && cell.innerParticleId >= 0)
                    particleId = cell.innerParticleId;

                if (particleId >= 0) {
                    var buildingGrade = sourceGrid.buildingGradeLevel;

                    for (var i = 0; i < side8rotPossibilities[buildingGrade].length; i++) {
                        var pos = side8rotPossibilities[buildingGrade][i] + sourceGrid.buildingRotation;

                        while (pos >= 8) {
                            pos -= 8;
                        }

                        var tx = x + side8rot[pos].x;
                        var ty = y + side8rot[pos].y;

                        if (tx >= 0 && tx < this.mapWidth && ty >= 0 && ty < this.mapHeight) {
                            var targetGrid = this.grid[tx + (ty * this.mapWidth)];

                            targetGrid.addParticle(particleId, sourceGrid.buildingLevel);
                        }
                    }
                }
            }
        }
    }

    // Give resource
    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            var curGrid = this.grid[x + (y * this.mapWidth)];

            if (curGrid.buildingId >= 0 && curGrid.isConnectedToStorage && curGrid.processBuildingTick) {
                var curBuilding = getBuildingFromId(curGrid.buildingId);

                curBuilding.processTickRewards(curGrid.buildingLevel, curGrid.buildingGradeLevel);
                curBuilding.processParticleOutput(curGrid.getOutputParticleId(), Math.min(curGrid.getOutputParticleLevel(), curGrid.buildingLevel));
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

            if (curGrid.buildingId == BUILDING_STORAGE) {
                curGrid.isConnectedToStorage = true;
                //curGrid.isConnectedToWater = false;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else if (curGrid.buildingId == BUILDING_WATERPUMP || curGrid.buildingId == BUILDING_WATERGEN) {
                curGrid.isConnectedToStorage = false;
                //curGrid.isConnectedToWater = true;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else {
                curGrid.isConnectedToStorage = false;
                //curGrid.isConnectedToWater = false;
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

                if (!curGrid.isConnectedToStorage && curGrid.buildingId >= 0 && orgGrid.isConnectedToStorage == true) {
                    curGrid.isConnectedToStorage = true;

                    if (curGrid.buildingId == BUILDING_STORAGEPIPE || curGrid.buildingId == BUILDING_UNDERGROUNDPIPE) {
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

//mapBuilding.prototype.getSideWaterConnectionStr = function (x, y) {
//    var s = ["0", "0", "0", "0"];

//    for (var i = 0; i < sideCross.length; i++) {
//        var tx = x + sideCross[i].x;
//        var ty = y + sideCross[i].y;

//        if (tx >= 0 && ty >= 0 && tx < this.mapWidth && ty < this.mapHeight) {
//            var curGrid = this.grid[tx + (ty * this.mapWidth)];

//            if (curGrid.isConnectedToWater) {
//                s[i] = "1";
//            }
//        }
//    }

//    return s[0] + s[1] + s[2] + s[3];
//}

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
    mapBuildings[0] = new mapBuilding();
    mapBuildings[0].id = 0;
    mapBuildings[0].name = "Town of Naposhore";
    mapBuildings[0].generateGrid(mapsData[0]);

    mapBuildings[1] = new mapBuilding();
    mapBuildings[1].id = 1;
    mapBuildings[1].name = "Town of Barock";
    mapBuildings[1].generateGrid(mapsData[1]);

    mapBuildings[2] = new mapBuilding();
    mapBuildings[2].id = 2;
    mapBuildings[2].name = "Swamp";
    mapBuildings[2].generateGrid(mapsData[2]);

    mapBuildings[3] = new mapBuilding();
    mapBuildings[3].id = 3;
    mapBuildings[3].name = "Desert";
    mapBuildings[3].generateGrid(mapsData[3]);

    mapBuildings[4] = new mapBuilding();
    mapBuildings[4].id = 4;
    mapBuildings[4].name = "Lava";
    mapBuildings[4].generateGrid(mapsData[4]);

    mapBuildings[5] = new mapBuilding();
    mapBuildings[5].id = 5;
    mapBuildings[5].name = "Canyon";
    mapBuildings[5].generateGrid(mapsData[5]);

    mapBuildings[6] = new mapBuilding();
    mapBuildings[6].id = 6;
    mapBuildings[6].name = "Old City";
    mapBuildings[6].generateGrid(mapsData[6]);
}