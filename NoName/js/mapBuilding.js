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

mapsData[0] = [
    7, 7, 7, 7, 7, 7, 7, 3, 3, 2, 2, 2,
    7, 7, 7, 7, 7, 7, 3, 3, 3, 0, 0, 0,
    7, 7, 7, 7, 3, 3, 3, 1, 3, 3, 0, 0,
    7, 7, 7, 3, 3, 3, 1, 1, 1, 3, 0, 0,
    7, 7, 3, 3, 1, 0, 0, 3, 3, 0, 0, 0,
    7, 7, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0,
    7, 7, 7, 3, 3, 0, 0, 0, 5, 6, 6, 6,
    7, 7, 7, 3, 3, 1, 0, 0, 0, 0, 0, 0,
    7, 7, 7, 3, 3, 3, 3, 0, 0, 0, 0, 0,
    7, 7, 7, 7, 3, 3, 3, 3, 1, 1, 1, 1,
    7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 1, 1,
    7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 1
];

mapsData[1] = [
    2, 2, 2, 2, 3, 7, 7, 3, 3, 2, 2, 2,
    2, 2, 2, 3, 3, 7, 3, 3, 2, 2, 2, 2,
    0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0,
    1, 0, 3, 3, 3, 3, 0, 0, 1, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0,
    6, 6, 6, 8, 6, 6, 5, 6, 6, 6, 6, 6,
    0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0,
    0, 3, 3, 7, 3, 3, 0, 0, 0, 0, 1, 0,
    3, 3, 7, 7, 7, 3, 3, 3, 3, 0, 0, 0 
];

var MAP_BUILDING_START = 0;
var MAP_BUILDING_SECOND = 1;

function mapBuilding() {
    this.id = 0;
    this.name = "";
    this.mapWidth = 12;
    this.mapHeight = 12;
    this.grid = [];
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
                if (curGrid.isConnectedToStorage || !buildings[curGrid.buildingId].needStorage) {
                    var curBuilding = buildings[curGrid.buildingId];

                    if (curBuilding.hasTickRequirements(curGrid.buildingLevel)) {
                        curBuilding.processTickRequirements(curGrid.buildingLevel);
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
            var cell = cells[sourceGrid.cellId];
            var building = buildings[sourceGrid.buildingId];

            if (sourceGrid.processBuildingTick) {
                var particleId = -1;

                if (building.generateParticleId >= 0)
                    particleId = building.generateParticleId;
                else if (building.extractCellParticle && cell.innerParticleId >= 0)
                    particleId = cell.innerParticleId;

                if (particleId >= 0) {
                    var buildingGrade = building.gradeLevel;

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
                var curBuilding = buildings[curGrid.buildingId];

                curBuilding.processTickRewards(curGrid.buildingLevel);
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

mapBuilding.prototype.addBuilding = function (x, y, buildingId) {
    if (buildingId < 0)
        return;

    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.processAddBuilding(buildingId))
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
                curGrid.isConnectedToWater = false;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else if (curGrid.buildingId == BUILDING_WATERPUMP || curGrid.buildingId == BUILDING_WATERGEN) {
                curGrid.isConnectedToStorage = false;
                curGrid.isConnectedToWater = true;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else {
                curGrid.isConnectedToStorage = false;
                curGrid.isConnectedToWater = false;
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

                if (!curGrid.isConnectedToStorage && curGrid.buildingId >= 0 && curGrid.buildingId != BUILDING_WATERPIPE && orgGrid.isConnectedToStorage == true) {
                    curGrid.isConnectedToStorage = true;

                    if (curGrid.buildingId == BUILDING_STORAGEPIPE) {
                        var newP = new Object();
                        newP.x = tx;
                        newP.y = ty;
                        points.push(newP);
                    }
                }

                if (!curGrid.isConnectedToWater && curGrid.buildingId >= 0 && curGrid.buildingId != BUILDING_STORAGEPIPE && orgGrid.isConnectedToWater == true) {
                    curGrid.isConnectedToWater = true;

                    if (curGrid.buildingId == BUILDING_WATERPIPE) {
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

mapBuilding.prototype.getSideWaterConnectionStr = function (x, y) {
    var s = ["0", "0", "0", "0"];

    for (var i = 0; i < sideCross.length; i++) {
        var tx = x + sideCross[i].x;
        var ty = y + sideCross[i].y;

        if (tx >= 0 && ty >= 0 && tx < this.mapWidth && ty < this.mapHeight) {
            var curGrid = this.grid[tx + (ty * this.mapWidth)];

            if (curGrid.isConnectedToWater) {
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

function loadMapBuilding() {
    mapBuildings[0] = new mapBuilding();
    mapBuildings[0].id = 0;
    mapBuildings[0].name = "Naposhore";
    mapBuildings[0].generateGrid(mapsData[0]);

    mapBuildings[1] = new mapBuilding();
    mapBuildings[1].id = 1;
    mapBuildings[1].name = "Barock";
    mapBuildings[1].generateGrid(mapsData[1]);
}