var MAP_WIDTH = 12;
var MAP_HEIGHT = 12;

var maps = [];

function MapInfo() {
	this.id = 0;
	this.cells = [];
	this.enemies = [];

	this.canSpawn = false;
	this.life = 10;
	this.spawnCount = 0;
	this.maxSpawnCount = 0;

	this.active = false;
}

MapInfo.prototype.startSpawn = function () {
	this.canSpawn = true;
	this.life = 10;
	this.spawnCount = 0;
}

MapInfo.prototype.spawnNewEnemy = function (x, y) {
	if (this.canSpawn) {
		var ei;

		if (this.id == 4) {
			ei = createEnemyInstance(x, y, ENEMY_HARD, parseInt(this.spawnCount / 10) + 1);
		}
		else {
			if ((this.spawnCount % 10) == 9)
				ei = createEnemyInstance(x, y, ENEMY_FIRST2, parseInt(this.spawnCount / 10) + 1);
			else
				ei = createEnemyInstance(x, y, ENEMY_FIRST, parseInt(this.spawnCount / 10) + 1);
		}

		this.spawnCount++;

		if (this.spawnCount > this.maxSpawnCount)
			this.maxSpawnCount = this.spawnCount;

		this.enemies.push(ei);
	}
}

MapInfo.prototype.process = function () {
	if (!this.active)
		return;

	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var curCell = this.cells[x + (y * MAP_WIDTH)];

			curCell.process();

			if (curCell.buildingInstance != null && curCell.buildingInstance.actionReady) {
				var building = getBuildingFromId(curCell.buildingInstance.buildingId);

				if (building.canSpawn) {
					this.spawnNewEnemy(x, y);
					curCell.resetBuildingTimer();
				}
				else if (curCell.buildingInstance.buildingId == BUILDING_TOWER1) {
					var enemyRange = [];

					for (var i = 0; i < coordPlus.length; i++) {
						var mx = x + coordPlus[i].x;
						var my = y + coordPlus[i].y;

						if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
							for (var t = 0; t < this.enemies.length; t++) {
								if (this.enemies[t].x == mx && this.enemies[t].y == my) {
									enemyRange.push(this.enemies[t]);
								}
							}
						}
					}

					if (enemyRange.length > 0) {
						var max = 0;
						var index = -1;

						for (var i = 0; i < enemyRange.length; i++) {
							if (enemyRange[i].distance > max) { // will not capture enemy with distance of 0
								max = enemyRange[i].distance;
								index = i;
							}
						}

						if (index != -1) {
							getBuildingFromId(curCell.buildingInstance.buildingId).process(curCell.buildingInstance.level);
							curCell.resetBuildingTimer();

							enemyRange[index].life -= curCell.buildingInstance.level; // * this.level;

							if (enemyRange[index].life <= 0) {
								resources[RESOURCE_KILL].addAmount(1);
								getEnemyFromId(enemyRange[index].enemyId).totalKill++;
							}
						}
					}
				}
				else if (curCell.buildingInstance.buildingId == BUILDING_TOWER2) {
					var enemyRange = [];

					for (var i = 0; i < coordPlus.length; i++) {
						var mx = x + coordPlus[i].x;
						var my = y + coordPlus[i].y;

						if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
							for (var t = 0; t < this.enemies.length; t++) {
								if (this.enemies[t].x == mx && this.enemies[t].y == my) {
									enemyRange.push(this.enemies[t]);
								}
							}
						}
					}

					if (index != -1) {
						if (enemyRange.length > 0) {
							getBuildingFromId(curCell.buildingInstance.buildingId).process(curCell.buildingInstance.level);
							curCell.resetBuildingTimer();

							for (var i = 0; i < enemyRange.length; i++) {
								enemyRange[i].life -= curCell.buildingInstance.level; // * this.level;

								if (enemyRange[i].life <= 0) {
									resources[RESOURCE_KILL].addAmount(1);
									getEnemyFromId(enemyRange[index].enemyId).totalKill++;
								}
							}
						}
					}

					curCell.towerShoot = 0;
				}
			}
		}
	}

	this.moveEnemies();

	if (this.life <= 0)
		this.resetMap();
}

MapInfo.prototype.moveEnemies = function () {
	for (var t = this.enemies.length - 1; t >= 0; t--) {
		this.enemies[t].process(this);

		if (this.enemies[t].life <= 0) {
			this.enemies.splice(t, 1);
			getResourceFromId(RESOURCE_KILL).addAmount(1);
		}
		else {
			for (var i = 0; i < coordPlus.length; i++) {
				var nx = this.enemies[t].x + coordPlus[i].x;
				var ny = this.enemies[t].y + coordPlus[i].y;

				if (nx >= 0 && nx < MAP_WIDTH && ny >= 0 && ny < MAP_HEIGHT) {
					var curCell = this.cells[nx + (ny * MAP_WIDTH)];

					if (curCell.buildingInstance != null && curCell.buildingInstance.buildingId == BUILDING_SPAWNEND) {
						this.enemies.splice(t, 1);
						getResourceFromId(RESOURCE_DEATH).addAmount(1);
						this.life -= 1;
						break;
					}
				}
			}
		}
	}
}

MapInfo.prototype.processClick = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	curCell.processClick();
}

MapInfo.prototype.destroyBuilding = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	curCell.destroyBuilding();

	this.calculateConnections();
}

MapInfo.prototype.buyBuilding = function (x, y, buildingId) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];
	var building = getBuildingFromId(buildingId);

	if (building.canBuy() && curCell.canPutBuilding(buildingId)) {
		building.buy();
		curCell.putBuilding(buildingId);

		this.calculateConnections();
	}
}

MapInfo.prototype.levelBuilding = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	if (curCell.buildingInstance != null) {
		var curBuilding = getBuildingFromId(curCell.buildingInstance.buildingId);

		if (curBuilding.canUpgrade) {
			var cost = curBuilding.getUpgradeCost(curCell.buildingInstance.level);

			if (hasDataLinks(cost)) {
				removeDataLinks(cost);
				curCell.buildingInstance.level++;
			}
		}
	}
}

MapInfo.prototype.completeQuest = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	curCell.completeQuest();
}

MapInfo.prototype.resetMap = function () {
	this.enemies = [];

	for (var t = 0; t < MAP_WIDTH * MAP_HEIGHT; t++) {
		this.cells[t].resetCell();
	}

	this.calculateConnections();

	this.canSpawn = false;
	this.life = 10;
	this.spawnCount = 0;
}

MapInfo.prototype.findEnemyPathAround = function (x, y) {
	var d = { x: 0, y: 0 };

	for (var i = 0; i < coordPlus.length; i++) {
		var curCell = this.cells[x + coordPlus[i].x + ((y + coordPlus[i].y) * MAP_WIDTH)];
		var curState = getCellStateFromId(curCell.getStateId());

		if (curState.enemyPath) {
			d.x = coordPlus[i].x;
			d.y = coordPlus[i].y;
			break;
		}
	}

	return d;
}

MapInfo.prototype.getEnemyMovement = function (x, y, dx, dy) {
	var nx = x + dx;
	var ny = y + dy;

	var curCell = this.cells[nx + (ny * MAP_WIDTH)];
	var curState = getCellStateFromId(curCell.getStateId());

	if (!curState.enemyPath) {
		nx = x + dy;
		ny = y + dx;

		curCell = this.cells[nx + (ny * MAP_WIDTH)];
		curState = getCellStateFromId(curCell.getStateId());

		if (curState.enemyPath) {
			var tmp = dx;

			dx = dy;
			dy = tmp;
		}
		else {
			var tmp = -dx;

			dx = -dy;
			dy = tmp;
		}
	}

	return { x: dx, y: dy };
}

MapInfo.prototype.calculateConnections = function () {
	var toProcess = [];
	var doneProcess = [];

	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var curCell = this.cells[x + (y * MAP_WIDTH)];

			curCell.isConnection = false;

			if (curCell.buildingInstance != null) {
				var building = getBuildingFromId(curCell.buildingInstance.buildingId);

				if (building.storage) {
					toProcess.push({ x: x, y: y });
					curCell.isConnection = true;
				}
			}
		}
	}

	while (toProcess.length > 0) {
		var loc = toProcess[0];

		toProcess.splice(0, 1);
		doneProcess.push(loc);

		for (var t = 0; t < coordPlus.length; t++) {
			var newX = loc.x + coordPlus[t].x;
			var newY = loc.y + coordPlus[t].y;

			if (newX >= 0 && newX < MAP_WIDTH && newY >= 0 && newY < MAP_HEIGHT) {
				var curCell = this.cells[newX + (newY * MAP_WIDTH)];

				if (curCell.buildingInstance != null) {
					var building = getBuildingFromId(curCell.buildingInstance.buildingId);

					if (building.connection) {
						var found = false;

						for (var tt = 0; tt < doneProcess.length; tt++) {
							if (doneProcess[tt].x == newX && doneProcess[tt].y == newY)
								found = true;
						}

						if (!found)
							toProcess.push({ x: newX, y: newY });
					}

					curCell.isConnection = true;
				}
			}
		}
	}
}

MapInfo.prototype.getConnectionNumber = function (x, y) {
	var ret = 0;

	if (y > 0) {
		var curCell = this.cells[x + ((y - 1) * MAP_WIDTH)];

		if (curCell.isConnection || curCell.buildingInstance != null)
			ret += 1;
	}

	if (x > 0) {
		var curCell = this.cells[x - 1 + ((y) * MAP_WIDTH)];

		if (curCell.isConnection || curCell.buildingInstance != null)
			ret += 2;
	}

	if (x < MAP_WIDTH - 1) {
		var curCell = this.cells[x + 1 + ((y) * MAP_WIDTH)];

		if (curCell.isConnection || curCell.buildingInstance != null)
			ret += 4;
	}

	if (y < MAP_HEIGHT - 1) {
		var curCell = this.cells[x + ((y + 1) * MAP_WIDTH)];

		if (curCell.isConnection || curCell.buildingInstance != null)
			ret += 8;
	}

	return ret;
}

function getMapFromId(id) {
	for (var i = 0; i < maps.length; i++) {
		if (maps[i].id == id)
			return maps[i];
	}

	return null;
}

function createNewMap() {
	var item = new MapInfo();

	for (var i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++)
		item.cells[i] = new CellInfo();

	return item;
}

function getSaveMapInfo(item) {
	var data = new Object();

	data.id = item.id;
	data.c = [];

	for (var i = 0; i < item.cells.length; i++)
		data.c[i] = getSaveCellInfo(item.cells[i]);

	return data;
}

function loadMapInfo(data) {
	var item = new MapInfo();

	item.id = data.id;

	for (var i = 0; i < data.c.length; i++) {
		item.cells[i] = loadCellInfo(data.c[i]);
	}

	return item;
}