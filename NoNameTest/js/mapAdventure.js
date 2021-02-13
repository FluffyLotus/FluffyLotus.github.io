function mapAdventureInformation() {
    this.id = 0;
    this.name = "";
    this.currentDistance = 0;
    this.maxDistance = 0;
    this.isActive = false;
}

mapAdventureInformation.prototype.getEnemyInstanceFromDistance = function () {
    if (this.id == 0) {
        if (this.currentDistance < 1000)
            return createEnemyInstance(ENEMY_BUNNY, parseInt(this.currentDistance / 1000) + 1);
        else if (this.currentDistance < 2000)
            return createEnemyInstance(ENEMY_RAT, parseInt(this.currentDistance / 1000) + 1);
        return createEnemyInstance(ENEMY_DEVIL, parseInt(this.currentDistance / 1000) + 1);
    }

    if (this.currentDistance < 1000)
        return createEnemyInstance(ENEMY_DOG, parseInt(this.currentDistance / 1000) + 1);
    else if (this.currentDistance < 2000)
        return createEnemyInstance(ENEMY_PIG, parseInt(this.currentDistance / 1000) + 1);
    return createEnemyInstance(ENEMY_WOLF, parseInt(this.currentDistance / 1000) + 1);
}

mapAdventureInformation.prototype.setDistance = function (newDistance) {
    this.currentDistance = newDistance;
}

mapAdventureInformation.prototype.increaseDistance = function () {
    this.currentDistance += 1;

    if (this.currentDistance > this.maxDistance)
        this.maxDistance = this.currentDistance;
}

mapAdventureInformation.prototype.getPossibleEnemy = function () {
    if ((this.currentDistance % 10) == 0) {
        return this.getEnemyInstanceFromDistance();
    }

    return null;
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
    mapAdventures.push(newItem);

    newItem = new mapAdventureInformation();
    newItem.id = 1;
    newItem.name = "Desert";
    mapAdventures.push(newItem);
}