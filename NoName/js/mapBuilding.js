var mapData1 = [
    0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
    3, 3, 0, 0, 0, 2, 2, 2, 0, 0, 4, 4,
    3, 3, 0, 0, 2, 2, 2, 2, 0, 4, 4, 4];

function mapBuilding() {
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
                if (curGrid.isConnectedToStorage || curGrid.buildingId == BUILDING_ESSENCEPULL) {
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
                    for (var i = 0; i < side8.length; i++) {
                        var tx = x + side8[i].x;
                        var ty = y + side8[i].y;

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
    var curCell = cells[curGrid.cellId];

    addResourceLink(curCell.clickReward, 1);
}

mapBuilding.prototype.upgradeGrid = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.buildingId >= 0) {
        var building = buildings[curGrid.buildingId];

        if (building.upgradeRequirements.length > 0) {
            if (building.hasUpgradeRequirements(curGrid.buildingLevel)) {
                building.processUpgradeRequirements(curGrid.buildingLevel);

                curGrid.buildingLevel += 1;
            }
        }
    }
}

mapBuilding.prototype.downgradeGrid = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.buildingId >= 0) {
        var building = buildings[curGrid.buildingId];

        if (building.upgradeRequirements.length > 0) {
            if (curGrid.buildingLevel > 1)
                curGrid.buildingLevel -= 1;
        }
    }
}

mapBuilding.prototype.addBuilding = function (x, y, buildingId) {
    if (buildingId == -1)
        return;

    var curGrid = this.grid[x + (y * this.mapWidth)];
    var curBuilding = buildings[buildingId];

    if (curBuilding.hasCost()) {
        if (curGrid.buildingId == -1 && curBuilding.canBuildHere(curGrid)) {
            curBuilding.processCost();

            curBuilding.addBuildingAmount(1);
            curGrid.buildingId = curBuilding.id;
            curGrid.buildingLevel = 1;

            this.calculateGridConnection();
        }
    }
}

mapBuilding.prototype.sellBuilding = function (x, y) {
    var curGrid = this.grid[x + (y * this.mapWidth)];

    if (curGrid.buildingId >= 0) {
        var curBuilding = buildings[curGrid.buildingId];

        curBuilding.buildAmount -= 1;
        curGrid.buildingId = -1;

        //var cost = curBuilding.getInitialCost();

        //addResourceLink(cost);

        this.calculateGridConnection();
    }
}

mapBuilding.prototype.calculateGridConnection = function () {
    var points = [];

    for (var y = 0; y < this.mapHeight; y++) {
        for (var x = 0; x < this.mapWidth; x++) {
            if (this.grid[x + (y * this.mapWidth)].buildingId == BUILDING_STORAGE) {
                this.grid[x + (y * this.mapWidth)].isConnectedToStorage = true;
                this.grid[x + (y * this.mapWidth)].isConnectedToWater = false;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else if (this.grid[x + (y * this.mapWidth)].buildingId == BUILDING_WATERPUMP || this.grid[x + (y * this.mapWidth)].buildingId == BUILDING_WATERGEN) {
                this.grid[x + (y * this.mapWidth)].isConnectedToStorage = false;
                this.grid[x + (y * this.mapWidth)].isConnectedToWater = true;

                var newP = new Object();
                newP.x = x;
                newP.y = y;
                points.push(newP);
            }
            else {
                this.grid[x + (y * this.mapWidth)].isConnectedToStorage = false;
                this.grid[x + (y * this.mapWidth)].isConnectedToWater = false;
            }
        }
    }

    while (points.length > 0) {
        var p = points.pop();

        for (t = 0; t < 4; t++) {
            var tx = p.x;
            var ty = p.y;

            var orgGrid = this.grid[p.x + (p.y * this.mapWidth)];

            if (t == 0) ty -= 1;
            if (t == 1) tx -= 1;
            if (t == 2) tx += 1;
            if (t == 3) ty += 1;

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

function loadMapBuilding() {
    mapBuilding = new mapBuilding();
    mapBuilding.generateGrid(mapData1);
}