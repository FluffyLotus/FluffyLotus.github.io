function enemyRangeInformation() {
    this.enemyId = 0;
    this.minDistance = 0;
    this.maxDistance = 9999999999;
    this.modulo = 10;
}

function createEnemyRangeInformation(enemyId, min, max, modulo) {
    var ret = new enemyRangeInformation();

    ret.enemyId = enemyId;
    ret.minDistance = min;
    ret.maxDistance = max;
    ret.modulo = modulo;

    return ret;
}

function mapAdventureInformation() {
    this.id = 0;
    this.name = "";
    this.currentDistance = 0;
    this.maxDistance = 0;
    this.enemies = [];
    this.isActive = false;
}

mapAdventureInformation.prototype.getEnemyLevelFromDistance = function () {
    return parseInt(this.currentDistance / 1000) + 1;
}

mapAdventureInformation.prototype.getCurrentCheckpoint = function () {
    if (this.currentDistance < 1000)
        return 0;

    return Math.floor(this.currentDistance / 1000) * 1000;
}

mapAdventureInformation.prototype.getPossibleEnemy = function () {
    var possibleEnemies = [];

    for (var t = 0; t < this.enemies.length; t++) {
        if (this.currentDistance >= this.enemies[t].minDistance && this.currentDistance < this.enemies[t].maxDistance) {
            if ((this.currentDistance % this.enemies[t].modulo) == 0) {
                possibleEnemies.push(this.enemies[t].enemyId);
            }
        }
    }

    if (possibleEnemies.length > 0) {
        var enemyId = -1;

        if (possibleEnemies.length == 1) {
            enemyId = possibleEnemies[0];
        }
        else {
            enemyId = possibleEnemies[getRandInteger(0, possibleEnemies.length)];
        }

        return createEnemyInstance(enemyId, this.getEnemyLevelFromDistance());
    }

    return null;
}

mapAdventureInformation.prototype.setDistance = function (newDistance) {
    this.currentDistance = newDistance;
}

mapAdventureInformation.prototype.increaseDistance = function () {
    this.currentDistance += 1;

    if (this.currentDistance > this.maxDistance)
        this.maxDistance = this.currentDistance;
}

function getMapAdventureFromId(id) {
    for (var t = 0; t < mapAdventures.length; t++) {
        if (mapAdventures[t].id == id)
            return mapAdventures[t];
    }

    return null;
}

function loadAdventure() {
    var newItem;

    newItem = new mapAdventureInformation();
    newItem.id = 0;
    newItem.name = "Forest";
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_BUNNY, 0, 1000, 10));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_RAT, 1000, 2000, 10));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DEVIL, 2000, 99999999, 10));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 1;
    newItem.name = "Desert";
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10));
    mapAdventures.push(newItem);
}

function canChangeMap() {
    var count = 0;

    for (var t = 0; t < mapAdventures.length; t++) {
        if (mapAdventures[t].isActive) {
            if (count == 1)
                return true;
            if (mapAdventures[t].maxDistance >= 1000)
                return true;
            count++;
        }
    }

    return false;
}