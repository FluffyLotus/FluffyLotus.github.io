﻿function mapEventInformation() {
    this.distance = 0;
    this.questId = -1;

    this.questRef = null;
}

function createQuestMapEvent(distance, questId) {
    var ret = new mapEventInformation();

    ret.distance = distance;
    ret.questId = questId;

    return ret;
}

function enemyRangeInformation() {
    this.enemyId = 0;
    this.minDistance = 0;
    this.maxDistance = 9999999999;
    this.modulo = 10;
    this.weight = 0;

    this.enemyRef = null;
}

function createEnemyRangeInformation(enemyId, min, max, modulo, weight) {
    var ret = new enemyRangeInformation();

    ret.enemyId = enemyId;
    ret.minDistance = min;
    ret.maxDistance = max;
    ret.modulo = modulo;
    ret.weight = weight;

    return ret;
}

function mapAdventureInformation() {
    this.id = 0;
    this.name = "";
    this.currentDistance = 0;
    this.maxDistance = 0;
    this.endOfMapDistance = 9999999999;
    this.enemies = [];
    this.events = [];
    this.isActive = false;
    this.farTiles = [];
    this.nearTiles = [];

    this.farTilesRef = [];
    this.nearTilesRef = [];
}

mapAdventureInformation.prototype.getEnemyLevelFromDistance = function () {
    return parseInt(this.currentDistance / 1000) + 1;
}

mapAdventureInformation.prototype.getCurrentCheckpoint = function () {
    if (this.currentDistance < 1000)
        return 0;

    return Math.floor(this.currentDistance / 1000) * 1000;
}

mapAdventureInformation.prototype.getPossibleEnemy2 = function (d) {
    var possibleEnemies = [];

    if (d <= 0)
        return null;

    for (var t = 0; t < this.enemies.length; t++) {
        if (d >= this.enemies[t].minDistance && d < this.enemies[t].maxDistance) {
            if ((d % this.enemies[t].modulo) == 0) {
                possibleEnemies.push(this.enemies[t]);
            }
        }
    }

    if (possibleEnemies.length > 0) {
        var enemyId = -1;

        if (possibleEnemies.length == 1) {
            enemyId = possibleEnemies[0].enemyId;
        }
        else {
            var totalWeight = 0;

            for (var t = 0; t < possibleEnemies.length; t++) {
                totalWeight += possibleEnemies[t].weight;
            }

            var weightLocation = getRandInteger(0, totalWeight);

            for (var t = 0; t < possibleEnemies.length; t++) {
                if (weightLocation < possibleEnemies[t].weight) {
                    enemyId = possibleEnemies[t].enemyId;
                    break;
                }
                else {
                    weightLocation -= possibleEnemies[t].weight;
                }
            }

            if (enemyId == -1) { // Should not happen
                enemyId = possibleEnemies[possibleEnemies.length - 1].enemyId;
            }
        }

        return createEnemyInstance(enemyId, this.getEnemyLevelFromDistance());
    }

    return null;
}

mapAdventureInformation.prototype.getPossibleEnemy = function () {
    return this.getPossibleEnemy2(this.currentDistance);
}

mapAdventureInformation.prototype.setDistance = function (newDistance) {
    this.currentDistance = newDistance;
}

mapAdventureInformation.prototype.increaseDistance = function () {
    this.currentDistance += 1;

    if (this.currentDistance > this.maxDistance)
        this.maxDistance = this.currentDistance;

    this.processEvents();
}

mapAdventureInformation.prototype.processEndOfMap = function () {
    if (this.currentDistance >= this.endOfMapDistance) {
        this.currentDistance = 0;
        return true;
    }

    return false;
}

mapAdventureInformation.prototype.processEvents = function () {
    for (var t = 0; t < quests.length; t++) {
        if (quests[t].foundMapId == this.id && quests[t].foundDistance == this.currentDistance) {
            if (quests[t].canInteract())
                quests[t].interact();
        }
    }
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
    newItem.name = "Forest"; // To Swamp
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_BUNNY, 0, 3000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_BEAR, 0, 3000, 10, 1));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_BIRD, 500, 3000, 10, 100));
    //newItem.enemies.push(createEnemyRangeInformation(ENEMY_SCORPION, 2000, 99999999, 10, 100));
    newItem.events.push(createQuestMapEvent(65, 4));
    newItem.events.push(createQuestMapEvent(650, 5));
    newItem.events.push(createQuestMapEvent(2200, 7));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 1;
    newItem.name = "Canyon"; // To Desert
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10, 100));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 2;
    newItem.name = "Road";
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10, 100));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 3;
    newItem.name = "Mountain"; // To volcano
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10, 100));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 4;
    newItem.name = "Train";
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10, 100));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 5;
    newItem.name = "New City";
    newItem.farTiles = [0, 1, 2, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_DOG, 0, 1000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_PIG, 1000, 2000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_WOLF, 2000, 99999999, 10, 100));
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 6;
    newItem.name = "Cemetary";
    newItem.farTiles = [0, 5, 3, 4];
    newItem.nearTiles = [0, 3, 4];
    newItem.endOfMapDistance = 3000;
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_RAT, 0, 3000, 10, 100));
    newItem.enemies.push(createEnemyRangeInformation(ENEMY_SKELETON, 1100, 3000, 10, 100));
    newItem.events.push(createQuestMapEvent(1100, 10));
    mapAdventures.push(newItem);
}

function setRefAdventure() {
    for (var t = 0; t < mapAdventures.length; t++) {
        for (var i = 0; i < mapAdventures[t].farTiles.length; i++) {
            mapAdventures[t].farTilesRef[i] = getTileTemplateFromId(mapAdventures[t].farTiles[i]);
        }
        for (var i = 0; i < mapAdventures[t].nearTiles.length; i++) {
            mapAdventures[t].nearTilesRef[i] = getTileTemplateFromId(mapAdventures[t].nearTiles[i]);
        }

        for (var i = 0; i < mapAdventures[t].events.length; i++) {
            mapAdventures[t].events[i].questRef = getQuestFromId(mapAdventures[t].events[i].questId);
        }
        for (var i = 0; i < mapAdventures[t].enemies.length; i++) {
            mapAdventures[t].enemies[i].enemyRef = getEnemyFromId(mapAdventures[t].enemies[i].enemyId);
        }
    }
}

var _canChangeMapVal = false;

function canChangeMap() {
    var count = 0;

    if (_canChangeMapVal)
        return true;

    for (var t = 0; t < mapAdventures.length; t++) {
        if (mapAdventures[t].isActive) {
            if (count == 1) {
                _canChangeMapVal = true;
                return true;
            }
            if (mapAdventures[t].maxDistance >= 1000) {
                _canChangeMapVal = true;
                return true;
            }
            count++;
        }
    }

    return false;
}