function mapAdventureInformation() {
    this.id = 0;
    this.currentDistance = 0;
    this.maxDistance = 0;
}

mapAdventureInformation.prototype.getEnemyInstanceFromDistance = function () {
    if (this.currentDistance < 1000)
        return createEnemyInstance(ENEMY_BUNNY, parseInt(this.currentDistance / 1000) + 1);
    else if (this.currentDistance < 2000)
        return createEnemyInstance(ENEMY_RAT, parseInt(this.currentDistance / 1000) + 1);
    return createEnemyInstance(ENEMY_DEVIL, parseInt(this.currentDistance / 1000) + 1);
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

function loadAdventure() {
    mapAdventures[0] = new mapAdventureInformation();
    mapAdventures[0].id = 0;
}