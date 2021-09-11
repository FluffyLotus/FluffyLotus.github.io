var MAP_WIDTH = 12;
var MAP_HEIGHT = 12;

var maps = [];

function MapInfo() {
	this.id = 0;
	this.cells = [];
	this.spawnInfo = [];

	this.isSpawning = false;
	this.life = 10;
	this.spawnCount = 0;
	this.maxSpawnCount = 0;

	this.active = false;

	this.enemies = [];

	this.imageRef = null;
}

function MapSpawnInfo() {
	this.delay = 1000;
	this.enemyId = 0;
	this.level = 0;
	this.count = 0;
}

MapInfo.prototype.startSpawn = function () {
	this.isSpawning = true;
	this.life = 10;
	this.spawnCount = 0;
}

MapInfo.prototype.findSpawnLevel = function (spawnCount) {
	var level = 0;

	for (var t = 0; t < this.spawnInfo.length; t++) {
		spawnCount -= this.spawnInfo[t].count;

		if (spawnCount < 0)
			break;

		level++;
	}

	if (level >= this.spawnInfo.length)
		level = this.spawnInfo.length - 1;
	if (level < 0)
		level = 0;

	return level;
}

MapInfo.prototype.spawnNewEnemy = function (x, y) {

	if (this.isSpawning) {
		var ei;

		var level = this.findSpawnLevel(this.spawnCount);
		var spawn = this.spawnInfo[level];

		ei = createEnemyInstance(x, y, spawn.enemyId, spawn.level);

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
				var building = curCell.buildingInstance.buildingRef;
				var enemyToHit = [];

				if (building.canSpawn) {
					this.spawnNewEnemy(x, y);
					curCell.resetBuildingTimer();
				}
				else if (curCell.buildingInstance.buildingId == BUILDING_TOWER1) {
					enemyToHit = this.getFarthestEnemy(x, y);
				}
				else if (curCell.buildingInstance.buildingId == BUILDING_TOWER2) {
					enemyToHit = this.getAllSuroundEnemy(x, y);
				}

				if (enemyToHit.length > 0) {
					curCell.buildingInstance.buildingRef.process(curCell.buildingInstance.level);
					curCell.resetBuildingTimer();

					for (var i = 0; i < enemyToHit.length; i++) {
						var hit = building.getReward(curCell.buildingInstance.level);

						enemyToHit[i].life -= hit[0].amount;

						if (enemyToHit[i].life <= 0) {
							enemyToHit[i].enemyRef.totalKill++;
						}
					}
				}
			}
		}
	}

	this.moveEnemies();

	if (this.life <= 0)
		this.resetMap();
}

MapInfo.prototype.getFarthestEnemy = function (x, y) {

	var ret = [];
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
			ret[0] = enemyRange[index];
		}
	}

	return ret;
}

MapInfo.prototype.getAllSuroundEnemy = function (x, y) {

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

	return enemyRange;
}

MapInfo.prototype.moveEnemies = function () {
	for (var t = this.enemies.length - 1; t >= 0; t--) {
		if (this.enemies[t].life > 0) {
			var curCell = this.cells[this.enemies[t].x + (this.enemies[t].y * MAP_WIDTH)];
			var curState = curCell.getStateRef();

			if (curState.enemyPathEnd) {
				this.enemies.splice(t, 1);
				this.life -= 1;
				break;
			}
		}

		if (this.enemies[t].life > 0) {
			this.enemies[t].process(this);
		}

		if (this.enemies[t].life <= 0) {
			this.enemies.splice(t, 1);
		}
	}
}

MapInfo.prototype.processClick = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	curCell.processClick();
}

MapInfo.prototype.destroyBuilding = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	if (curCell.buildingInstance != null) {
		var curBuilding = curCell.buildingInstance.buildingRef;

		if (curBuilding.isUserOwned) {
			if (!this.isSpawning) {
				while (curCell.buildingInstance.level > 1)
					this.levelDownBuilding(x, y);

				var cost = curBuilding.getBuildCost();

				addDataLinks(cost);
			}

			curCell.destroyBuilding();

			this.calculateConnections();
		}
	}
}

MapInfo.prototype.buyBuilding = function (x, y, buildingId) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];
	var building = getBuildingFromId(buildingId);

	if (building.canBuy() && curCell.canPutBuilding(building)) {
		building.buy();
		curCell.putBuilding(buildingId);

		this.calculateConnections();
	}
}

MapInfo.prototype.levelBuilding = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	if (curCell.buildingInstance != null) {
		var curBuilding = curCell.buildingInstance.buildingRef;

		if (curBuilding.canUpgrade) {
			var cost = curBuilding.getUpgradeCost(curCell.buildingInstance.level);

			if (hasDataLinks(cost)) {
				removeDataLinks(cost);
				curCell.buildingInstance.level++;
			}
		}
	}
}

MapInfo.prototype.levelDownBuilding = function (x, y) {
	var curCell = this.cells[x + (y * MAP_WIDTH)];

	if (curCell.buildingInstance != null) {
		var curBuilding = curCell.buildingInstance.buildingRef;

		if (curBuilding.canUpgrade) {
			if (curCell.buildingInstance.level > 1) {
				if (!this.isSpawning) {
					var cost = curBuilding.getUpgradeCost(curCell.buildingInstance.level - 1);

					addDataLinks(cost);
				}

				curCell.buildingInstance.level--;
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

	this.isSpawning = false;
	this.life = 10;
	this.spawnCount = 0;
}

MapInfo.prototype.findEnemyPathAround = function (x, y) {
	var d = { x: 0, y: 0 };

	for (var i = 0; i < coordPlus.length; i++) {
		var curCell = this.cells[x + coordPlus[i].x + ((y + coordPlus[i].y) * MAP_WIDTH)];
		var curState = curCell.getStateRef();

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
	var curState = curCell.getStateRef();

	if (!curState.enemyPath) {
		nx = x + dy;
		ny = y + dx;

		curCell = this.cells[nx + (ny * MAP_WIDTH)];
		curState = curCell.getStateRef();

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
				var building = curCell.buildingInstance.buildingRef;

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
					var building = curCell.buildingInstance.buildingRef;

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

function getActiveMapCount() {
	var cnt = 0;

	for (var i = 0; i < maps.length; i++) {
		if (maps[i].active)
			cnt++;
	}

	return cnt;
}

function getMapFromId(id) {
	for (var i = 0; i < maps.length; i++) {
		if (maps[i].id == id)
			return maps[i];
	}

	return null;
}

function initMap() {
	for (var t = 0; t < mapData.length; t++) {
		var item = new MapInfo();

		item.id = mapData[t].id;
		item.name = mapData[t].n;
		item.spawnInfo = [];

		for (var i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
			item.cells[i] = new CellInfo();

			if (i < mapData[t].c.length)
				item.cells[i] = loadCellInfo2(mapData[t].c[i]);
		}

		for (var i = 0; i < mapData[t].sp.length; i++) {
			var spawn = new MapSpawnInfo();

			spawn.delay = mapData[t].sp[i].d;
			spawn.enemyId = mapData[t].sp[i].e;
			spawn.level = mapData[t].sp[i].l;
			spawn.count = mapData[t].sp[i].c;

			item.spawnInfo.push(spawn);
		}

		maps.push(item);
	}

}

function finishInitMap() {
	for (var t = 0; t < maps.length; t++) {
		maps[t].imageRef = getImageFromName("map_map_" + maps[t].id);
	}
}